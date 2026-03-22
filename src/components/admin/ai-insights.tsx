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
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { toast } from 'sonner'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { Spinner } from '@/components/spinner'

type DetailLevel = 'short' | 'long'
type RangeValue = 7 | 30 | 90

type SavedInsight = {
	id: number
	userId: string
	rangeDays: number
	rangeLabel: string
	rangeStart: string
	rangeEnd: string
	sourceLogCount: number
	content: string
	createdAt: string | Date
}

const RANGE_OPTIONS: Array<{ label: string; value: RangeValue }> = [
	{ label: '1 Week', value: 7 },
	{ label: '1 Month', value: 30 },
	{ label: '3 Months', value: 90 },
]

const formatInsightTimestamp = (value: string | Date) =>
	new Date(value).toLocaleString('en-AU', {
		dateStyle: 'medium',
		timeStyle: 'short',
	})

const InsightMarkdown = ({
	content,
	className,
}: {
	content: string
	className?: string
}) => {
	return (
		<div
			className={cn(
				'text-sm leading-6',
				'[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4',
				'[&_blockquote]:mb-3 [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:italic',
				'[&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em]',
				'[&_h1]:mt-6 [&_h1]:text-base [&_h1]:font-semibold [&_h1:first-child]:mt-0',
				'[&_h2]:mt-6 [&_h2]:text-base [&_h2]:font-semibold [&_h2:first-child]:mt-0',
				'[&_h3]:mt-5 [&_h3]:font-semibold [&_h3:first-child]:mt-0',
				'[&_li]:leading-6',
				'[&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_ol:last-child]:mb-0',
				'[&_p]:mb-3 [&_p:last-child]:mb-0',
				'[&_pre]:mb-3 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-3 [&_pre]:text-sm [&_pre:last-child]:mb-0',
				'[&_pre_code]:bg-transparent [&_pre_code]:p-0',
				'[&_table]:mb-3 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm [&_table:last-child]:mb-0',
				'[&_td]:border [&_td]:px-2 [&_td]:py-1',
				'[&_th]:border [&_th]:bg-muted [&_th]:px-2 [&_th]:py-1 [&_th]:text-left',
				'[&_ul]:mb-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul:last-child]:mb-0',
				className,
			)}
		>
			<ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
		</div>
	)
}

const AiInsights = ({ userId }: { userId: string }) => {
	const [insights, setInsights] = useState<SavedInsight[]>([])
	const [isLoadingInsights, setIsLoadingInsights] = useState(true)
	const [isStreaming, setIsStreaming] = useState(false)
	const [streamedInsight, setStreamedInsight] = useState('')
	const [selectedRange, setSelectedRange] = useState<RangeValue>(7)
	const [detailLevel, setDetailLevel] = useState<DetailLevel>('long')
	const [lastReviewLabel, setLastReviewLabel] = useState<string | null>(null)
	const [insightPendingDelete, setInsightPendingDelete] =
		useState<SavedInsight | null>(null)
	const [isDeletingInsight, setIsDeletingInsight] = useState(false)

	const { data: selectedUser } = api.user.getName.useQuery(userId)
	const { data: dailyLogs = [], isLoading: isLoadingLogs } =
		api.dailyLog.getAllUser.useQuery(userId)

	const selectedLogs = getVisibleLogsForDays(dailyLogs, selectedRange)
	const selectedRangeLabel = formatRangeLabel(String(selectedRange))
	const selectedRangeInfo = getRangeDateInfo(selectedLogs)

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
		setInsights([])
		setIsLoadingInsights(true)
		setIsStreaming(false)
		setStreamedInsight('')
		setSelectedRange(7)
		setDetailLevel('long')
		setLastReviewLabel(null)
		setInsightPendingDelete(null)
		void loadInsights()
	}, [userId])

	const handleGenerateInsight = async () => {
		if (selectedLogs.length === 0) {
			toast.error(`No daily logs found for the last ${selectedRange} days`)
			return
		}

		setIsStreaming(true)
		setStreamedInsight('')
		setLastReviewLabel(
			`${selectedRangeLabel} review · ${
				detailLevel === 'long' ? 'long format' : 'short format'
			}`,
		)

		try {
			const response = await fetch('/api/admin/ai', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userId,
					rangeDays: selectedRange,
					rangeLabel: selectedRangeLabel,
					rangeStart: selectedRangeInfo.startDate,
					rangeEnd: selectedRangeInfo.endDate,
					sourceLogCount: selectedLogs.length,
					detailLevel,
					dailyLogsText: buildClipboardText({
						dailyLogs: selectedLogs,
						toggleValue: String(selectedRange),
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

			await loadInsights()
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

	const handleDeleteInsight = async () => {
		if (!insightPendingDelete) return

		setIsDeletingInsight(true)

		try {
			const params = new URLSearchParams({
				userId,
				insightId: String(insightPendingDelete.id),
			})

			const response = await fetch(`/api/admin/ai?${params.toString()}`, {
				method: 'DELETE',
			})

			if (!response.ok) {
				const errorData = (await response.json().catch(() => null)) as {
					error?: string
				} | null
				throw new Error(errorData?.error ?? 'Could not delete AI insight')
			}

			await loadInsights()
			setInsightPendingDelete(null)
			toast.success('AI insight deleted')
		} catch (error) {
			console.error(error)
			toast.error(
				error instanceof Error ? error.message : 'Could not delete AI insight',
			)
		} finally {
			setIsDeletingInsight(false)
		}
	}

	const selectedUserName =
		selectedUser?.firstName?.trim() ||
		selectedUser?.name?.trim() ||
		'this client'

	return (
		<>
			<div className='flex flex-col gap-6 py-6 px-4 mx-auto w-full max-w-6xl md:px-6'>
				<div className='flex flex-col gap-1'>
					<h1 className='text-2xl font-semibold'>AI Insights</h1>
					<p className='text-sm text-muted-foreground'>
						Review {selectedUserName}&apos;s recent daily logs, stream the
						response into the page, and keep past insights on file.
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Generate review</CardTitle>
						<CardDescription>
							The export uses the same daily-log payload as the admin logs copy
							action.
						</CardDescription>
					</CardHeader>
					<CardContent className='flex flex-col gap-5'>
						<div className='flex flex-col gap-3'>
							<div className='text-sm font-medium'>Time range</div>
							<div className='flex flex-wrap gap-3'>
								{RANGE_OPTIONS.map((option) => (
									<Button
										key={option.value}
										type='button'
										variant={
											selectedRange === option.value ? 'default' : 'outline'
										}
										disabled={isStreaming || isLoadingLogs}
										onClick={() => setSelectedRange(option.value)}
									>
										{option.label}
									</Button>
								))}
							</div>
						</div>

						<div className='flex flex-col gap-3'>
							<div className='text-sm font-medium'>Review length</div>
							<ToggleGroup
								type='single'
								variant='outline'
								value={detailLevel}
								onValueChange={(value) => {
									if (value === 'short' || value === 'long') {
										setDetailLevel(value)
									}
								}}
								className='justify-start'
							>
								<ToggleGroupItem value='long'>Long</ToggleGroupItem>
								<ToggleGroupItem value='short'>Short</ToggleGroupItem>
							</ToggleGroup>
						</div>

						<div className='flex flex-col gap-2 text-sm text-muted-foreground'>
							<p>
								{isLoadingLogs
									? 'Loading daily logs...'
									: selectedLogs.length === 0
										? 'No daily logs were found for the selected range.'
										: `${selectedLogs.length} logs selected from ${selectedRangeInfo.startDate} to ${selectedRangeInfo.endDate}.`}
							</p>
							<p>
								{detailLevel === 'long'
									? 'Long reviews keep a short summary plus supporting points.'
									: 'Short reviews return 4-6 relevant points without subheadings.'}
							</p>
						</div>

						<div>
							<Button
								type='button'
								disabled={
									isLoadingLogs || isStreaming || selectedLogs.length === 0
								}
								onClick={() => void handleGenerateInsight()}
							>
								{isStreaming ? 'Reviewing...' : 'Activate review'}
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Latest response</CardTitle>
						<CardDescription>
							{lastReviewLabel
								? `Streaming ${lastReviewLabel.toLowerCase()}.`
								: 'Choose a range and length, then activate a review.'}
						</CardDescription>
					</CardHeader>
					<CardContent>
						{isStreaming && streamedInsight === '' ? (
							<Spinner />
						) : (
							<>
								<div className='p-4'>
									{streamedInsight ? (
										<InsightMarkdown content={streamedInsight} />
									) : (
										<div className='text-sm text-muted-foreground'>
											No review has been generated yet.
										</div>
									)}
								</div>
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
									<Card key={insight.id} className='gap-4 py-5'>
										<CardHeader className='pb-0'>
											<div className='flex gap-4 justify-between items-start'>
												<div className='flex flex-col gap-1'>
													<CardTitle className='text-base'>
														{insight.rangeLabel} insight
													</CardTitle>
													<CardDescription>
														{formatInsightTimestamp(insight.createdAt)} ·{' '}
														{insight.rangeStart} to {insight.rangeEnd} ·{' '}
														{insight.sourceLogCount} logs
													</CardDescription>
												</div>
												<Button
													type='button'
													size='icon'
													variant='ghost'
													onClick={() => setInsightPendingDelete(insight)}
													aria-label={`Delete ${insight.rangeLabel} insight`}
												>
													<Trash2 className='w-4 h-4' />
												</Button>
											</div>
										</CardHeader>
										<CardContent>
											<ScrollArea className='h-56 rounded-lg border bg-muted/20'>
												<div className='p-4'>
													<InsightMarkdown content={insight.content} />
												</div>
											</ScrollArea>
										</CardContent>
									</Card>
								))}
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			<AlertDialog
				open={Boolean(insightPendingDelete)}
				onOpenChange={(open) => {
					if (!open && !isDeletingInsight) {
						setInsightPendingDelete(null)
					}
				}}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete saved insight?</AlertDialogTitle>
						<AlertDialogDescription>
							This removes the selected AI insight from {selectedUserName}
							&apos;s history and cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isDeletingInsight}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
							onClick={(event) => {
								event.preventDefault()
								void handleDeleteInsight()
							}}
							disabled={isDeletingInsight}
						>
							{isDeletingInsight ? 'Deleting...' : 'Delete insight'}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

export { AiInsights }
