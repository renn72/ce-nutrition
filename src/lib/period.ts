/**
 * Calculates the number of whole days between two Date objects.
 * This helper function ensures the core logic remains clean.
 * @param dateA The later Date object.
 * @param dateB The earlier Date object.
 * @returns The difference in days as an integer.
 */
const calculateDayDifference = (dateA: Date, dateB: Date): number => {
	// 1000ms * 60s * 60min * 24h = 86,400,000 milliseconds in a day
	const MS_PER_DAY = 86400000

	// getTime() returns the number of milliseconds since the epoch (UTC)
	// We use Math.floor to ensure we are only counting full 24-hour periods
	// between the two dates, which is a common way to calculate date differences.
	const utc1 = Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDate())
	const utc2 = Date.UTC(dateB.getFullYear(), dateB.getMonth(), dateB.getDate())

	return Math.floor((utc1 - utc2) / MS_PER_DAY)
}

/**
 * Determines if a given date falls within a predicted menstrual period cycle.
 * * @param checkDate The date to check.
 * @param lastPeriodStart The start date of the most recent known period.
 * @param cycleLengthDays The length of the cycle in days (e.g., 28).
 * @param periodDurationDays The length of the period in days (e.g., 5).
 * @returns True if checkDate is during a period, False otherwise.
 */
export const isDuringPeriod = (
	checkDate: Date,
	lastPeriodStart: Date,
	cycleLengthDays: number,
	periodDurationDays: number,
): boolean => {
	// **Guard against invalid inputs**
	if (cycleLengthDays <= 0 || periodDurationDays <= 0) {
		throw new Error(
			'Cycle length and period duration must be positive numbers.',
		)
	}

	// 1. Calculate the number of days that have passed since the last known start date.
	const daysSinceStart: number = calculateDayDifference(
		checkDate,
		lastPeriodStart,
	)

	// 2. If the check date is before the last period start, we check if it falls
	//    within the previous cycle's period.
	if (daysSinceStart < 0) {
		// Find the day difference relative to the *previous* cycle's start date.
		const daysSincePreviousStart: number = daysSinceStart + cycleLengthDays

		// This handles cases like a check date being 2 days *before* the lastPeriodStart.
		// E.g., if lastPeriodStart was 28 days after the *actual* start,
		// the difference would be 28 - 2 = 26.
		// But for a stable cycle, we assume the previous cycle started
		// `cycleLengthDays` before `lastPeriodStart`.

		// We can simplify this: if the date is negative, we need to bring it into
		// the cycle length range by adding cycleLengthDays repeatedly.
		// The modulo operation already does this for us, even for negative numbers
		// (though in TS/JS, the % operator can return negative, so we use a safe modulo).

		// **Safe Modulo for Negative Numbers**
		// (x % n + n) % n ensures the result is always positive [0, n-1]
		const daysIntoRelevantCycle =
			((daysSinceStart % cycleLengthDays) + cycleLengthDays) % cycleLengthDays

		// Check if the date falls in the period duration (0 to duration-1)
		return (
			daysIntoRelevantCycle >= 0 && daysIntoRelevantCycle < periodDurationDays
		)
	}

	// 3. Use the modulo operator to find where the check date falls in the current cycle.
	// The result is the day index, starting from 0 (day 0 is period start).
	const daysIntoCurrentCycle: number = daysSinceStart % cycleLengthDays

	// 4. A period is occurring if the day index is less than the period duration.
	// E.g., for a 5-day period: days 0, 1, 2, 3, 4 are 'in period'.
	return daysIntoCurrentCycle < periodDurationDays
}

/**
 * Calculates the number of whole days between two Date objects.
 * (Same helper function as before to ensure pure date calculation)
 * @param dateA The later Date object.
 * @param dateB The earlier Date object.
 * @returns The difference in days as an integer.
 */

/**
 * Calculates the status of the menstrual cycle relative to the period.
 * * Returns:
 * - A positive integer (1 to duration): Day *into* the active period.
 * - Zero (0): The period starts TODAY.
 * - A negative integer: Days *remaining* until the next period starts.
 *
 * @param checkDate The date to check.
 * @param lastPeriodStart The start date of the most recent known period.
 * @param cycleLengthDays The length of the cycle in days (e.g., 28).
 * @param periodDurationDays The length of the period in days (e.g., 5).
 * @returns An integer representing the cycle status.
 */
export const getPeriodStatusDays = (
	checkDate: Date,
	lastPeriodStart: Date,
	cycleLengthDays: number,
	periodDurationDays: number,
): number => {
	// 1. Calculate the day difference (can be positive or negative)
	const daysSinceStart: number = calculateDayDifference(
		checkDate,
		lastPeriodStart,
	)

	// 2. Use safe modulo to find the day index within the current cycle [0, cycleLengthDays - 1]
	// (x % n + n) % n handles both positive and negative results from daysSinceStart
	const daysIntoCurrentCycle: number =
		((daysSinceStart % cycleLengthDays) + cycleLengthDays) % cycleLengthDays

	// The current cycle day index is daysIntoCurrentCycle.
	// Day 0: Period Start
	// Day 1 to (periodDurationDays - 1): In Period
	// Day periodDurationDays to (cycleLengthDays - 1): Not Period / Waiting

	// 3. Check if the date is during the active period (Day 0 to Day Duration-1)
	if (daysIntoCurrentCycle < periodDurationDays) {
		// We are IN the period.
		// If daysIntoCurrentCycle is 0, it means period starts today.
		// We want a positive integer for active period days, so we add 1.
		return daysIntoCurrentCycle + 1
	} else {
		// We are NOT in the period (Follicular or Luteal phase).
		// The number of days remaining until the period starts is the cycle length
		// minus the current day into the cycle.
		const daysRemaining: number = cycleLengthDays - daysIntoCurrentCycle

		// We want this value to be negative.
		// Example:
		// - cycleLengthDays = 28
		// - daysIntoCurrentCycle = 27 (the day before period starts)
		// - daysRemaining = 28 - 27 = 1 day left
		// - Return value: -1 (1 day until period starts)

		return -daysRemaining
	}
}
