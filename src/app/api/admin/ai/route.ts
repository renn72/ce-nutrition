import { env } from '@/env'
import { auth } from '@/server/auth'
import { db } from '@/server/db'
import { aiInsight, userToTrainer } from '@/server/db/schema'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const getInsightsQuerySchema = z.object({
	userId: z.string().min(1),
})

const deleteInsightQuerySchema = z.object({
	userId: z.string().min(1),
	insightId: z.coerce.number().int().positive(),
})

const generateInsightBodySchema = z.object({
	userId: z.string().min(1),
	rangeDays: z.union([z.literal(7), z.literal(30), z.literal(90)]),
	rangeLabel: z.string().min(1),
	rangeStart: z.string().min(1),
	rangeEnd: z.string().min(1),
	sourceLogCount: z.number().int().positive(),
	detailLevel: z.enum(['short', 'long']).default('long'),
	dailyLogsText: z.string().min(1),
})

const normalizeZenBaseUrl = (endpoint: string) =>
	endpoint
		.replace(/\/chat\/completions\/?$/, '')
		.replace(/\/completions\/?$/, '')

const extractChunkText = (payload: unknown) => {
	if (!payload || typeof payload !== 'object') return ''

	const choices = Reflect.get(payload, 'choices')
	if (!Array.isArray(choices) || choices.length === 0) return ''

	const firstChoice = choices[0]
	if (!firstChoice || typeof firstChoice !== 'object') return ''

	const delta = Reflect.get(firstChoice, 'delta')
	const message = Reflect.get(firstChoice, 'message')
	const container =
		delta && typeof delta === 'object'
			? delta
			: message && typeof message === 'object'
				? message
				: null

	if (!container) return ''

	const content = Reflect.get(container, 'content')

	if (typeof content === 'string') return content
	if (!Array.isArray(content)) return ''

	return content
		.map((part) => {
			if (typeof part === 'string') return part
			if (!part || typeof part !== 'object') return ''

			const text = Reflect.get(part, 'text')
			return typeof text === 'string' ? text : ''
		})
		.join('')
}

const requireTrainerSession = async () => {
	const session = await auth()
	if (!session?.user?.id || !session.user.isTrainer) return null
	return session
}

const canAccessClient = async ({
	trainerId,
	userId,
	isAdmin,
}: {
	trainerId: string
	userId: string
	isAdmin: boolean
}) => {
	if (isAdmin || trainerId === userId) return true

	const trainerLink = await db.query.userToTrainer.findFirst({
		where: and(
			eq(userToTrainer.userId, userId),
			eq(userToTrainer.trainerId, trainerId),
		),
		columns: {
			userId: true,
		},
	})

	return Boolean(trainerLink)
}

export async function GET(request: Request) {
	const session = await requireTrainerSession()
	if (!session) {
		return Response.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const parsedQuery = getInsightsQuerySchema.safeParse(
		Object.fromEntries(new URL(request.url).searchParams.entries()),
	)

	if (!parsedQuery.success) {
		return Response.json({ error: 'Missing userId' }, { status: 400 })
	}

	const hasAccess = await canAccessClient({
		trainerId: session.user.id,
		userId: parsedQuery.data.userId,
		isAdmin: session.user.isAdmin,
	})

	if (!hasAccess) {
		return Response.json({ error: 'Forbidden' }, { status: 403 })
	}

	const insights = await db.query.aiInsight.findMany({
		where: eq(aiInsight.userId, parsedQuery.data.userId),
		orderBy: (data, { desc }) => [desc(data.createdAt)],
	})

	return Response.json(
		{ insights },
		{
			headers: {
				'Cache-Control': 'no-store',
			},
		},
	)
}

export async function POST(request: Request) {
	const session = await requireTrainerSession()
	if (!session) {
		return Response.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const body = await request.json().catch(() => null)
	const parsedBody = generateInsightBodySchema.safeParse(body)

	if (!parsedBody.success) {
		return Response.json({ error: 'Invalid insight request' }, { status: 400 })
	}

	const hasAccess = await canAccessClient({
		trainerId: session.user.id,
		userId: parsedBody.data.userId,
		isAdmin: session.user.isAdmin,
	})

	if (!hasAccess) {
		return Response.json({ error: 'Forbidden' }, { status: 403 })
	}

	const responseFormatInstructions =
		parsedBody.data.detailLevel === 'short'
			? `Response format:
- Return only 4-6 short bullet points.
- Do not use subheadings.
- Keep every point tightly grounded in the logs.`
			: `Response format:
- Start with a 1-2 sentence summary.
- Then add 3-6 short bullet points.
- Keep the overall response concise and directly tied to the logs.`

	const prompt = `${parsedBody.data.dailyLogsText}

Task:
Give a summary of the information in these daily logs over this time frame and any insights you might have.
Keep the relevant, and specific to the provided information only.
Do not infer details that are not supported by the logs. If important information is missing, mention that briefly.

Field notes:
- The "weight" field represents minutes of weight training, not body weight.
- "high" days refer to high carb/calories.
- "low" days refer to low carb/calories.

Focus on trends, adherence, recovery, digestion, hydration, symptoms, and anything a coach should notice when clearly supported by the logs.
i prefer short headings with bullet points underneath
${responseFormatInstructions}`

	try {
		const upstreamResponse = await fetch(
			`${normalizeZenBaseUrl(env.ZEN_ENDPOINT)}/chat/completions`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${env.ZEN_API_KEY}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					model: env.ZEN_MODEL,
					stream: true,
					temperature: 0.3,
					messages: [
						{
							role: 'system',
							content:
								'You are an experienced nutrition and coaching assistant reviewing client daily logs for an admin dashboard. Keep responses concise, relevant, and grounded only in the provided logs.',
						},
						{
							role: 'user',
							content: prompt,
						},
					],
				}),
			},
		)

		if (!upstreamResponse.ok || !upstreamResponse.body) {
			const errorText = await upstreamResponse.text().catch(() => '')
			console.error('Zen AI request failed', errorText)
			return Response.json(
				{ error: 'Could not generate AI insight' },
				{ status: 502 },
			)
		}

		const reader = upstreamResponse.body.getReader()
		const decoder = new TextDecoder()
		const encoder = new TextEncoder()
		let buffer = ''
		let fullText = ''
		let isSaved = false

		const persistInsight = async () => {
			if (isSaved) return
			isSaved = true

			const content = fullText.trim()
			if (!content) return

			try {
				await db.insert(aiInsight).values({
					userId: parsedBody.data.userId,
					rangeDays: parsedBody.data.rangeDays,
					rangeLabel: parsedBody.data.rangeLabel,
					rangeStart: parsedBody.data.rangeStart,
					rangeEnd: parsedBody.data.rangeEnd,
					sourceLogCount: parsedBody.data.sourceLogCount,
					model: env.ZEN_MODEL,
					content,
				})
			} catch (error) {
				console.error('Failed to save AI insight', error)
			}
		}

		const processBuffer = (
			controller: ReadableStreamDefaultController<Uint8Array>,
		) => {
			const lines = buffer.split('\n')
			buffer = lines.pop() ?? ''

			for (const rawLine of lines) {
				const line = rawLine.trim()
				if (!line.startsWith('data:')) continue

				const data = line.slice(5).trim()
				if (!data || data === '[DONE]') continue

				try {
					const chunkText = extractChunkText(JSON.parse(data))
					if (!chunkText) continue

					fullText += chunkText
					controller.enqueue(encoder.encode(chunkText))
				} catch (error) {
					console.error('Failed to parse Zen AI chunk', error)
				}
			}
		}

		const stream = new ReadableStream<Uint8Array>({
			start(controller) {
				const pump = async () => {
					try {
						while (true) {
							const { done, value } = await reader.read()
							if (done) break

							buffer += decoder.decode(value, { stream: true })
							processBuffer(controller)
						}

						buffer += decoder.decode()
						processBuffer(controller)
						await persistInsight()
						controller.close()
					} catch (error) {
						console.error('Zen AI stream proxy failed', error)
						controller.error(error)
					}
				}

				void pump()
			},
		})

		return new Response(stream, {
			headers: {
				'Cache-Control': 'no-store',
				'Content-Type': 'text/plain; charset=utf-8',
			},
		})
	} catch (error) {
		console.error('AI insight generation failed', error)
		return Response.json(
			{ error: 'Could not generate AI insight' },
			{ status: 500 },
		)
	}
}

export async function DELETE(request: Request) {
	const session = await requireTrainerSession()
	if (!session) {
		return Response.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const parsedQuery = deleteInsightQuerySchema.safeParse(
		Object.fromEntries(new URL(request.url).searchParams.entries()),
	)

	if (!parsedQuery.success) {
		return Response.json({ error: 'Invalid delete request' }, { status: 400 })
	}

	const hasAccess = await canAccessClient({
		trainerId: session.user.id,
		userId: parsedQuery.data.userId,
		isAdmin: session.user.isAdmin,
	})

	if (!hasAccess) {
		return Response.json({ error: 'Forbidden' }, { status: 403 })
	}

	const existingInsight = await db.query.aiInsight.findFirst({
		where: and(
			eq(aiInsight.id, parsedQuery.data.insightId),
			eq(aiInsight.userId, parsedQuery.data.userId),
		),
		columns: {
			id: true,
		},
	})

	if (!existingInsight) {
		return Response.json({ error: 'Insight not found' }, { status: 404 })
	}

	await db
		.delete(aiInsight)
		.where(
			and(
				eq(aiInsight.id, parsedQuery.data.insightId),
				eq(aiInsight.userId, parsedQuery.data.userId),
			),
		)

	return Response.json({ success: true })
}
