"use client"

import { useState } from "react"
import { addDays } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

export default function Component() {
  const today = new Date()
  const selectedDay = addDays(today, -28)
  const [month, setMonth] = useState(selectedDay)
  const [date, setDate] = useState<Date | undefined>(selectedDay)

  return (
    <div>
      <div className="rounded-md border p-2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          month={month}
          onMonthChange={setMonth}
        />
        <Button
          variant="outline"
          size="sm"
          className="mt-2 mb-1"
          onClick={() => {
            setDate(today)
            setMonth(today)
          }}
        >
          Today
        </Button>
      </div>
    </div>
  )
}
