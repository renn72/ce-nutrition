import { getFormattedDate, getRecipeDetailsFromDailyLog } from '@/lib/utils'
import type { GetAllDailyLogs } from '@/types'

const DAY_IN_MS = 86400000
const OMIT_EXPORT_KEYS = new Set(['id', 'createdAt', 'updatedAt'])

export type DailyLogRecord = NonNullable<GetAllDailyLogs>[number]

const isPresent = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined

export const getVisibleLogsForDays = (
  dailyLogs: DailyLogRecord[],
  days: number,
) => {
  const logsByDate = new Map(dailyLogs.map((log) => [log.date, log]))

  return Array.from({ length: days }, (_, index) => {
    const date = new Date(Date.now() - index * DAY_IN_MS)
    return logsByDate.get(date.toDateString())
  }).filter(isPresent)
}

export const getVisibleLogsForRange = (
  dailyLogs: DailyLogRecord[],
  from?: Date,
  to?: Date,
) => {
  return [...dailyLogs]
    .filter((log) => {
      const logDate = new Date(log.date)
      const isAfterFrom = !from || logDate >= from
      const isBeforeTo = !to || logDate <= to

      return isAfterFrom && isBeforeTo
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

const shouldOmitExportKey = (key: string) =>
  OMIT_EXPORT_KEYS.has(key) || key.endsWith('Id')

const sanitizeExportValue = (value: unknown): unknown => {
  if (value === null || value === undefined) return undefined
  if (Array.isArray(value)) {
    return value.map(sanitizeExportValue).filter(isPresent)
  }
  if (value instanceof Date) return value.toISOString()
  if (typeof value !== 'object') return value

  const entries = Object.entries(value).flatMap(([key, entryValue]) => {
    if (shouldOmitExportKey(key)) return []

    const sanitizedValue = sanitizeExportValue(entryValue)
    if (sanitizedValue === undefined) return []

    return [[key, sanitizedValue] as const]
  })

  if (entries.length === 0) return undefined

  return Object.fromEntries(entries)
}

export const buildClipboardDailyLogs = (dailyLogs: DailyLogRecord[]) => {
  return dailyLogs
    .map((dailyLog) =>
      sanitizeExportValue({
        ...dailyLog,
        dailyMeals: dailyLog.dailyMeals.map((meal) => {
          const { cals, protein, carbs, fat } = getRecipeDetailsFromDailyLog(
            dailyLog,
            meal.mealIndex ?? 0,
          )

          return {
            recipeName: meal.recipe?.[0]?.name ?? '',
            calories: Number(cals),
            carbs: Number(carbs),
            protein: Number(protein),
            fat: Number(fat),
          }
        }),
        supplements: dailyLog.supplements.map((supplementLog) => ({
          ...supplementLog,
          supplement: supplementLog.supplement
            ? {
                name: supplementLog.supplement.name,
                serveSize: supplementLog.supplement.serveSize,
                serveUnit: supplementLog.supplement.serveUnit,
              }
            : undefined,
        })),
      }),
    )
    .filter(isPresent)
}

export const formatRangeLabel = (toggleValue: string) => {
  switch (toggleValue) {
    case '7':
      return 'Week'
    case '30':
      return 'Month'
    case '90':
      return '3 Months'
    case '365':
      return 'Year'
    case 'range':
      return 'Custom Range'
    default:
      return toggleValue
  }
}

export const getRangeDateInfo = (
  dailyLogs: DailyLogRecord[],
  from?: Date,
  to?: Date,
) => {
  const fallbackFrom = dailyLogs.at(-1)?.date
  const fallbackTo = dailyLogs.at(0)?.date

  const startDate = from
    ? getFormattedDate(from)
    : fallbackFrom
      ? getFormattedDate(new Date(fallbackFrom))
      : 'Unknown'
  const endDate = to
    ? getFormattedDate(to)
    : fallbackTo
      ? getFormattedDate(new Date(fallbackTo))
      : 'Unknown'

  return {
    startDate,
    endDate,
    label: `${startDate} to ${endDate}`,
  }
}

export const buildClipboardText = ({
  dailyLogs,
  toggleValue,
  from,
  to,
}: {
  dailyLogs: DailyLogRecord[]
  toggleValue: string
  from?: Date
  to?: Date
}) => {
  const logsJson = JSON.stringify(buildClipboardDailyLogs(dailyLogs), null, 2)
  const rangeLabel = formatRangeLabel(toggleValue)
  const rangeDates = getRangeDateInfo(dailyLogs, from, to).label

  return `${logsJson}

Context:
- These are daily user health, nutrition, supplement, hydration, and symptom logs exported from the admin user logs page.
- Selected range: ${rangeLabel}.
- Covered dates: ${rangeDates}.
- Each object represents one day.
- dailyMeals only includes recipeName and calculated calories, carbs, protein, and fat for each meal.
- supplements keep only the nested supplement name, serveSize, and serveUnit.
- Null fields, ids, createdAt, updatedAt, and all *Id fields were removed from the export.`
}
