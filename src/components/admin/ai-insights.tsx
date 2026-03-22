'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import {
	buildClipboardText,
	formatRangeLabel,
	getRangeDateInfo,
	getVisibleLogsForDays,
} from '@/lib/daily-log-export'
import { cn } from '@/lib/utils'
import { Trash2 } from 'lucide-react'
import type { Components } from 'react-markdown'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Spinner } from '@/components/spinner'

type SavedInsight = {
	id: number
	userId: string
	rangeDays: number
	rangeLabel: string
	rangeStart: string
	rangeEnd: string
	sourceLogCount: number
	model: string
	content: string
	createdAt: string
}

const RANGE_OPTIONS = [
	{ label: '1 Week', value: 7 },
	{ label: '1 Month', value: 30 },
	{ label: '3 Months', value: 90 },
] as const

const formatInsightTimestamp = (value: string) =>
	new Date(value).toLocaleString('en-AU', {
		dateStyle: 'medium',
		timeStyle: 'short',
	})

const markdownComponents: Components = {
	h1: ({ children }) => (
		<h1 className='mt-6 text-xl font-semibold first:mt-0'>{children}</h1>
	),
	h2: ({ children }) => (
		<h2 className='mt-6 text-lg font-semibold first:mt-0'>{children}</h2>
	),
	h3: ({ children }) => (
		<h3 className='mt-5 text-base font-semibold first:mt-0'>{children}</h3>
	),
	p: ({ children }) => <p className='mt-3 leading-7 first:mt-0'>{children}</p>,
	ul: ({ children }) => (
		<ul className='pl-6 mt-3 space-y-1 list-disc first:mt-0'>{children}</ul>
	),
	ol: ({ children }) => (
		<ol className='pl-6 mt-3 space-y-1 list-decimal first:mt-0'>{children}</ol>
	),
	li: ({ children }) => <li className='leading-7'>{children}</li>,
	blockquote: ({ children }) => (
		<blockquote className='pl-4 mt-4 italic border-l-2 first:mt-0 border-border text-muted-foreground'>
			{children}
		</blockquote>
	),
	hr: () => <hr className='my-5 border-border' />,
	a: ({ children, href, ...props }) => (
		<a
			{...props}
			href={href}
			target='_blank'
			rel='noreferrer'
			className='font-medium underline text-primary underline-offset-4'
		>
			{children}
		</a>
	),
	table: ({ children }) => (
		<div className='overflow-x-auto mt-4 first:mt-0'>
			<table className='w-full text-sm border-collapse'>{children}</table>
		</div>
	),
	th: ({ children }) => (
		<th className='py-2 px-3 font-medium text-left border border-border bg-muted'>
			{children}
		</th>
	),
	td: ({ children }) => (
		<td className='py-2 px-3 align-top border border-border'>{children}</td>
	),
	pre: ({ children }) => (
		<pre className='overflow-x-auto p-4 mt-4 text-xs leading-6 rounded-lg border first:mt-0 bg-muted/40'>
			{children}
		</pre>
	),
	code: ({ children, className, ...props }) => {
		const content = String(children).replace(/\n$/, '')
		const isInline = !className && !content.includes('\n')

		return (
			<code
				{...props}
				className={cn(
					'font-mono',
					isInline ? 'rounded bg-muted px-1.5 py-0.5 text-[0.85em]' : 'text-xs',
					className,
				)}
			>
				{content}
			</code>
		)
	},
}

const InsightMarkdown = ({
	content,
	className,
}: {
	content: string
	className?: string
}) => (
	<div className={cn('text-sm', className)}>
		<ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
			{content}
		</ReactMarkdown>
	</div>
)

const SavedInsight = ({ content }: { content: string }) => {
	const [isExpanded, setIsExpanded] = useState(false)
	return (
		<ScrollArea
			className={cn(
				'mt-3 rounded-md border bg-muted/20 transition-all duration-150',
				isExpanded ? 'h-full' : 'h-72',
			)}
		>
			<div className='relative p-4'>
				{isExpanded ? (
					<Button
						variant='outline'
						size='sm'
						className='absolute top-2 right-4'
						onMouseDown={() => setIsExpanded(false)}
					>
						Condense
					</Button>
				) : (
					<Button
						variant='outline'
						size='sm'
						className='absolute top-2 right-4'
						onMouseDown={() => setIsExpanded(true)}
					>
						Expand
					</Button>
				)}
				<InsightMarkdown content={content} />
			</div>
		</ScrollArea>
	)
}

const AiInsights = ({ userId }: { userId: string }) => {
	const [insights, setInsights] = useState<SavedInsight[]>([])
	const [isLoadingInsights, setIsLoadingInsights] = useState(true)
	const [isStreaming, setIsStreaming] = useState(false)
	const [deletingInsightId, setDeletingInsightId] = useState<number | null>(
		null,
	)
	const [activeRange, setActiveRange] = useState<number | null>(null)
	const [streamedInsight, setStreamedInsight] = useState('')

	const { data: selectedUser } = api.user.getName.useQuery(userId)
	const {
		data: dailyLogs = [],
		isLoading: isLoadingLogs,
		refetch: refetchDailyLogs,
	} = api.dailyLog.getAllUser.useQuery(userId)

	const loadInsights = async () => {
		setIsLoadingInsights(true)

		try {
			const response = await fetch(
				`/api/admin/ai?userId=${encodeURIComponent(userId)}`,
				{
					cache: 'no-store',
				},
			)

			if (!response.ok) {
				throw new Error('Could not load saved insights')
			}

			const data = (await response.json()) as { insights: SavedInsight[] }
			setInsights(data.insights)
		} catch (error) {
			console.error(error)
			toast.error('Could not load saved insights')
		} finally {
			setIsLoadingInsights(false)
		}
	}

	useEffect(() => {
		setActiveRange(null)
		setStreamedInsight('')
		void loadInsights()
	}, [userId])

	const handleDeleteInsight = async (insightId: number) => {
		if (!window.confirm('Delete this saved insight?')) return

		setDeletingInsightId(insightId)

		try {
			const response = await fetch(
				`/api/admin/ai?userId=${encodeURIComponent(userId)}&insightId=${insightId}`,
				{
					method: 'DELETE',
				},
			)

			if (!response.ok) {
				const errorData = (await response.json().catch(() => null)) as {
					error?: string
				} | null
				throw new Error(errorData?.error ?? 'Could not delete insight')
			}

			setInsights((currentInsights) =>
				currentInsights.filter((insight) => insight.id !== insightId),
			)
			toast.success('Insight deleted')
		} catch (error) {
			console.error(error)
			toast.error(
				error instanceof Error ? error.message : 'Could not delete insight',
			)
		} finally {
			setDeletingInsightId(null)
		}
	}

	const handleGenerateInsight = async (rangeDays: 7 | 30 | 90) => {
		const selectedLogs = getVisibleLogsForDays(dailyLogs, rangeDays)

		if (selectedLogs.length === 0) {
			toast.error(`No daily logs found for the last ${rangeDays} days`)
			return
		}

		const { startDate, endDate } = getRangeDateInfo(selectedLogs)

		setActiveRange(rangeDays)
		setIsStreaming(true)
		setStreamedInsight('')

		try {
			const response = await fetch('/api/admin/ai', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userId,
					rangeDays,
					rangeLabel: formatRangeLabel(String(rangeDays)),
					rangeStart: startDate,
					rangeEnd: endDate,
					sourceLogCount: selectedLogs.length,
					dailyLogsText: buildClipboardText({
						dailyLogs: selectedLogs,
						toggleValue: String(rangeDays),
					}),
				}),
			})

			if (!response.ok) {
				const errorData = (await response.json().catch(() => null)) as {
					error?: string
				} | null
				throw new Error(errorData?.error ?? 'Could not generate AI insight')
			}

			if (!response.body) {
				throw new Error('The AI provider did not return a stream')
			}

			const reader = response.body.getReader()
			const decoder = new TextDecoder()
			let nextInsight = ''

			while (true) {
				const { done, value } = await reader.read()
				if (done) break

				nextInsight += decoder.decode(value, { stream: true })
				setStreamedInsight(nextInsight)
			}

			nextInsight += decoder.decode()
			setStreamedInsight(nextInsight)

			await Promise.all([loadInsights(), refetchDailyLogs()])
			toast.success('AI insight saved')
		} catch (error) {
			console.error(error)
			toast.error(
				error instanceof Error
					? error.message
					: 'Could not generate AI insight',
			)
		} finally {
			setIsStreaming(false)
		}
	}

	const selectedUserName =
		selectedUser?.firstName?.trim() ||
		selectedUser?.name?.trim() ||
		'this client'

	return (
		<div className='flex flex-col gap-6 py-6 px-4 mx-auto w-full max-w-6xl md:px-6'>
			<div className='flex flex-col gap-1'>
				<h1 className='text-2xl font-semibold'>AI Insights</h1>
				<p className='text-sm text-muted-foreground'>
					Generate a streamed summary from {selectedUserName}&apos;s recent
					daily logs and keep the previous insights on file.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Generate insight</CardTitle>
					<CardDescription>
						The prompt uses the same daily-log export format as the admin logs
						copy action.
					</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col gap-4'>
					<div className='flex flex-wrap gap-3'>
						{RANGE_OPTIONS.map((option) => (
							<Button
								key={option.value}
								variant={activeRange === option.value ? 'default' : 'outline'}
								disabled={isStreaming || isLoadingLogs}
								onClick={() =>
									void handleGenerateInsight(option.value as 7 | 30 | 90)
								}
							>
								{option.label}
							</Button>
						))}
					</div>
					<p className='text-sm text-muted-foreground'>
						{isLoadingLogs
							? 'Loading daily logs...'
							: `${dailyLogs.length} daily logs available for review.`}
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Latest response</CardTitle>
					<CardDescription>
						{activeRange
							? `Streaming insight for the last ${formatRangeLabel(String(activeRange)).toLowerCase()}.`
							: 'Pick a timeframe to generate a new insight.'}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{isStreaming && streamedInsight === '' ? (
						<Spinner />
					) : (
						<>
							{streamedInsight ? (
								<div className='p-4'>
									<InsightMarkdown content={streamedInsight} />
								</div>
							) : (
								<div className='p-4 text-sm text-muted-foreground'>
									No insight generated yet.
								</div>
							)}
						</>
					)}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Saved insights</CardTitle>
					<CardDescription>
						Previous AI summaries for {selectedUserName}.
					</CardDescription>
				</CardHeader>
				<CardContent>
					{isLoadingInsights ? (
						<Spinner />
					) : insights.length === 0 ? (
						<div className='p-4 text-sm rounded-lg border border-dashed text-muted-foreground'>
							No saved insights yet.
						</div>
					) : (
						<div className='flex flex-col gap-4'>
							{insights.map((insight) => (
								<div
									key={insight.id}
									className='p-4 rounded-lg border bg-background'
								>
									<div className='flex gap-3 justify-between items-start'>
										<div className='flex flex-col gap-1'>
											<div className='text-sm font-medium'>
												{insight.rangeLabel} insight
											</div>
											<div className='text-xs text-muted-foreground'>
												{formatInsightTimestamp(insight.createdAt)} ·{' '}
												{insight.rangeStart} to {insight.rangeEnd} ·{' '}
												{insight.sourceLogCount} logs
											</div>
										</div>
										<Button
											type='button'
											variant='ghost'
											size='icon'
											aria-label='Delete insight'
											disabled={deletingInsightId === insight.id}
											onClick={() => void handleDeleteInsight(insight.id)}
										>
											<Trash2 className='w-4 h-4' />
										</Button>
									</div>
									<SavedInsight content={insight.content} />
								</div>
							))}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	)
}

export { AiInsights }
