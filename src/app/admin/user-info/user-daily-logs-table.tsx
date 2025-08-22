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
            <TableHead>Date</TableHead>
            <TableHead>Weight</TableHead>
            {columnsToShow.waistMeasurement && <TableHead>Waist</TableHead>}
            <TableHead>Calories</TableHead>
            <TableHead>Protein</TableHead>
            {columnsToShow.sleep && <TableHead>Sleep</TableHead>}
            {columnsToShow.sleepQuality && <TableHead>Sleep Quality</TableHead>}
            {columnsToShow.nap && <TableHead>Nap</TableHead>}
            {columnsToShow.steps && <TableHead>Steps</TableHead>}
            {columnsToShow.cardio && <TableHead>Cardio</TableHead>}
            {columnsToShow.cardioType && <TableHead>Cardio Type</TableHead>}
            {columnsToShow.liss && <TableHead>LISS</TableHead>}
            {columnsToShow.hiit && <TableHead>HIIT</TableHead>}
            {columnsToShow.weightTraining && <TableHead>Weight Training</TableHead>}
            {columnsToShow.posing && <TableHead>Posing</TableHead>}
            {columnsToShow.sauna && <TableHead>Sauna</TableHead>}
            {columnsToShow.coldPlunge && <TableHead>Cold Plunge</TableHead>}
            {columnsToShow.fastedBloodGlucose && <TableHead>Fasted BG</TableHead>}
            {columnsToShow.notes && <TableHead>Notes</TableHead>}
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
                  <TableCell>
                    {new Date(log.date).toLocaleDateString('en-AU', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </TableCell>
                  <TableCell>{log.morningWeight}</TableCell>
                  {columnsToShow.waistMeasurement && (
                    <TableCell>{log.waistMeasurement}</TableCell>
                  )}
                  <TableCell>{mealsMacros?.cals.toFixed(0)}</TableCell>
                  <TableCell>{mealsMacros?.protein.toFixed(1)}</TableCell>
                  {columnsToShow.sleep && <TableCell>{log.sleep}</TableCell>}
                  {columnsToShow.sleepQuality && (
                    <TableCell>{log.sleepQuality}</TableCell>
                  )}
                  {columnsToShow.nap && (
                    <TableCell>{Number(log.nap).toFixed(1)}</TableCell>
                  )}
                  {columnsToShow.steps && <TableCell>{log.steps}</TableCell>}
                  {columnsToShow.cardio && <TableCell>{log.cardio}</TableCell>}
                  {columnsToShow.cardioType && (
                    <TableCell>{log.cardioType}</TableCell>
                  )}
                  {columnsToShow.liss && <TableCell>{log.liss}</TableCell>}
                  {columnsToShow.hiit && <TableCell>{log.hiit}</TableCell>}
                  {columnsToShow.weightTraining && (
                    <TableCell>{log.weight}</TableCell>
                  )}
                  {columnsToShow.posing && <TableCell>{log.posing}</TableCell>}
                  {columnsToShow.sauna && <TableCell>{log.sauna}</TableCell>}
                  {columnsToShow.coldPlunge && (
                    <TableCell>{log.coldPlunge}</TableCell>
                  )}
                  {columnsToShow.fastedBloodGlucose && (
                    <TableCell>{log.fastedBloodGlucose}</TableCell>
                  )}
                  {columnsToShow.notes && (
                    <TableCell className="max-w-[200px] truncate">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <span>{log.notes}</span>
                        </HoverCardTrigger>
                        <HoverCardContent className="text-wrap">
                          {log.notes}
                        </HoverCardContent>
                      </HoverCard>
                    </TableCell>
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
