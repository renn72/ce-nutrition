'use client'

import { api } from '@/trpc/react'

import type { GetAllDailyLogs } from '@/types'
import NumberFlow from '@number-flow/react'
// @ts-ignore
import confetti from 'canvas-confetti'
import { Toilet, Pill,
	ListCollapse,
} from 'lucide-react'
import { toast } from 'sonner'

const SuppLog  = ({
	userId,
	dailyLogs,
}: {
	userId: string
	dailyLogs: GetAllDailyLogs | null | undefined
}) => {
	const today = new Date()

	const ctx = api.useUtils()

	const todaysDailyLog = dailyLogs?.find(
		(dailyLog) => dailyLog.date === today.toDateString(),
	)

	return (
		<div className='flex flex-col gap-0 w-full items-center'>
			<div className='w-full text-center font-bold text-lg h-7'>
			</div>
			<div className='grid grid-cols-1 place-items-center gap-2 h-12'>
				<div className='rounded-full border-[3px] border-primary/80 w-11 h-11 flex items-center justify-center active:scale-90 transition-transform cursor-pointer shadow-sm'>
					<Pill
						className='ml-[1px]'
						size={28}
					/>
				</div>
				<div />
			</div>
				<ListCollapse size={20} className='text-muted-foreground' />
		</div>
	)
}

export { SuppLog  }
