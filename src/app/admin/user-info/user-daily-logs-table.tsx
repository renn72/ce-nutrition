'use client'

import { cn } from '@/lib/utils'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getRecipeDetailsFromDailyLog } from '@/lib/utils'
import type { GetAllDailyLogs } from '@/types'

const TableHeadWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <TableHead
      className='text-xs tracking-normal lg:tracking-tighter xl:text-sm xl:tracking-normal'
    >
      {children}
    </TableHead>
  )
}

const TableCellWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <TableCell className={cn(className, 'text-xs tracking-normal lg:tracking-tighter xl:text-sm xl:tracking-normal')}>
      {children}
    </TableCell>
  )
}

const UserDailyLogsTable = ({ dailyLogs, className }: { dailyLogs: GetAllDailyLogs, className?: string }) => {
  const recentLogs = dailyLogs.slice(0, 30)

  const columnsToShow = {
    waistMeasurement: recentLogs.some((log) => log.waistMeasurement),
    sleep: recentLogs.some((log) => log.sleep),
    sleepQuality: recentLogs.some((log) => log.sleepQuality),
    nap: recentLogs.some((log) => log.nap),
    steps: recentLogs.some((log) => log.steps),
    cardio: recentLogs.some((log) => log.cardio),
    cardioType: recentLogs.some((log) => log.cardioType),
    liss: recentLogs.some((log) => log.liss),
    mobility: recentLogs.some((log) => log.mobility),
    hiit: recentLogs.some((log) => log.hiit),
    weightTraining: recentLogs.some((log) => log.weight),
    posing: recentLogs.some((log) => log.posing),
    sauna: recentLogs.some((log) => log.sauna),
    coldPlunge: recentLogs.some((log) => log.coldPlunge),
    fastedBloodGlucose: recentLogs.some((log) => log.fastedBloodGlucose),
    notes: recentLogs.some((log) => log.notes),
  }

  return (
    <div className={cn('border rounded-lg overflow-y-scroll', className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeadWrapper>
              Date
            </TableHeadWrapper>
            <TableHeadWrapper>
              Weight
            </TableHeadWrapper>
            {columnsToShow.waistMeasurement && <TableHeadWrapper>
              Waist
            </TableHeadWrapper>}
            <TableHeadWrapper>
              Calories
            </TableHeadWrapper>
            <TableHeadWrapper>
              Protein
            </TableHeadWrapper>
            {columnsToShow.sleep && <TableHeadWrapper>
              Sleep</TableHeadWrapper>}
            {columnsToShow.sleepQuality && <TableHeadWrapper>
              Sleep Quality</TableHeadWrapper>}
            {columnsToShow.nap && <TableHeadWrapper>
              Nap</TableHeadWrapper>}
            {columnsToShow.steps && <TableHeadWrapper>
              Steps</TableHeadWrapper>}
            {columnsToShow.cardio && <TableHeadWrapper>
              Cardio</TableHeadWrapper>}
            {columnsToShow.cardioType && <TableHeadWrapper>
              Cardio Type</TableHeadWrapper>}
            {columnsToShow.liss && <TableHeadWrapper>
              LISS</TableHeadWrapper>}
            {columnsToShow.mobility && <TableHeadWrapper>
              Mobility</TableHeadWrapper>}
            {columnsToShow.hiit && <TableHeadWrapper>
              HIIT</TableHeadWrapper>}
            {columnsToShow.weightTraining && <TableHeadWrapper>
              Weight Training</TableHeadWrapper>}
            {columnsToShow.posing && <TableHeadWrapper>
              Posing</TableHeadWrapper>}
            {columnsToShow.sauna && <TableHeadWrapper>
              Sauna</TableHeadWrapper>}
            {columnsToShow.coldPlunge && <TableHeadWrapper>
              Cold Plunge</TableHeadWrapper>}
            {columnsToShow.fastedBloodGlucose && <TableHeadWrapper>
              Fasted BG</TableHeadWrapper>}
            {columnsToShow.notes && <TableHeadWrapper>
              Notes</TableHeadWrapper>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dailyLogs
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((log) => {
              const mealsMacros = log?.dailyMeals
              .map((meal) => {
                const { cals, protein, carbs, fat } =
                getRecipeDetailsFromDailyLog(log, meal.mealIndex ?? 0)
                return {
                  cals: Number(cals),
                  protein: Number(protein),
                  carbs: Number(carbs),
                  fat: Number(fat),
                }
              })
              .reduce(
                (acc, curr) => {
                  return {
                    cals: acc.cals + curr.cals,
                    protein: acc.protein + curr.protein,
                    carbs: acc.carbs + curr.carbs,
                    fat: acc.fat + curr.fat,
                  }
                },
                {
                  cals: 0,
                  protein: 0,
                  carbs: 0,
                  fat: 0,
                },
              )
              return (
                <TableRow key={log.id}>
                  <TableCellWrapper>
                    {new Date(log.date).toLocaleDateString('en-AU', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </TableCellWrapper>
                  <TableCellWrapper>{log.morningWeight}</TableCellWrapper>
                  {columnsToShow.waistMeasurement && (
                    <TableCellWrapper>{log.waistMeasurement}</TableCellWrapper>
                  )}
                  <TableCellWrapper>{mealsMacros?.cals.toFixed(0)}</TableCellWrapper>
                  <TableCellWrapper>{mealsMacros?.protein.toFixed(1)}</TableCellWrapper>
                  {columnsToShow.sleep && <TableCellWrapper>{log.sleep}</TableCellWrapper>}
                  {columnsToShow.sleepQuality && (
                    <TableCellWrapper>{log.sleepQuality}</TableCellWrapper>
                  )}
                  {columnsToShow.nap && (
                    <TableCellWrapper>{Number(log.nap).toFixed(1)}</TableCellWrapper>
                  )}
                  {columnsToShow.steps && <TableCellWrapper>{log.steps}</TableCellWrapper>}
                  {columnsToShow.cardio && <TableCellWrapper>{log.cardio}</TableCellWrapper>}
                  {columnsToShow.cardioType && (
                    <TableCellWrapper>{log.cardioType}</TableCellWrapper>
                  )}
                  {columnsToShow.liss && <TableCellWrapper>{log.liss}</TableCellWrapper>}
                  {columnsToShow.mobility && <TableCellWrapper>{log.mobility}</TableCellWrapper>}
                  {columnsToShow.hiit && <TableCellWrapper>{log.hiit}</TableCellWrapper>}
                  {columnsToShow.weightTraining && (
                    <TableCellWrapper>{log.weight}</TableCellWrapper>
                  )}
                  {columnsToShow.posing && <TableCellWrapper>{log.posing}</TableCellWrapper>}
                  {columnsToShow.sauna && <TableCell>{log.sauna}</TableCell>}
                  {columnsToShow.coldPlunge && (
                    <TableCellWrapper>{log.coldPlunge}</TableCellWrapper>
                  )}
                  {columnsToShow.fastedBloodGlucose && (
                    <TableCellWrapper>{log.fastedBloodGlucose}</TableCellWrapper>
                  )}
                  {columnsToShow.notes && (
                    <TableCellWrapper className="max-w-[200px] truncate">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <span>{log.notes}</span>
                        </HoverCardTrigger>
                        <HoverCardContent className="text-wrap">
                          {log.notes}
                        </HoverCardContent>
                      </HoverCard>
                    </TableCellWrapper>
                  )}
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </div>
  )
}

export { UserDailyLogsTable }
