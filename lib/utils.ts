import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertAmountFromMiliunits(amount: number) {
  return amount / 1000
}

export function convertAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000)
}

//Penjelasan ada di 7:27
export function formatCurrency(value: number) {
  return Intl.NumberFormat('id', {
    style: 'currency',
    currency: "IDR",
    minimumFractionDigits: 3,
  }).format(value)
}

export function calculatePrecentageChange(
  current: number,
  previus: number
) {
  if (previus === 0) {
    return previus === current ? 0 : 100
  }

  return ((current - previus) / previus) * 100
}

export function fillMissingDays(
  activeDays: {
    date: Date,
    income: number,
    expenses: number
  }[],
  startDate: Date,
  endDate: Date
) {
  if (activeDays.length === 0) {
    return []
  }

  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  })

  const transactionsByDay = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day))

    if (found) {
      return found
    } else {
      return {
        date: day,
        income: 0,
        expenses: 0
      }
    }
  })

  return transactionsByDay
}

type Period = {
  from: string | Date | undefined
  to: string | Date | undefined
}

export function formatDateRange(period?: Period) {
  const defaultTo = new Date()
  const defaultFrom = subDays(defaultTo, 30)

  if (!period?.from) {
    return `${format(defaultFrom, "LLL dd")} - ${format(defaultTo, "LLL dd, y")}`
  }

  if (period.to) {
    return `${format(period.from, "LLL dd")} - ${format(period.to, "LLL dd, y")}`
  }

  return format(period.from, "LLL dd, y")
}

export function formatPercentage(
  value: number,
  options: { addPrifix?: boolean } = {
    addPrifix: false
  },
) {
  const result = new Intl.NumberFormat("id-ID", {
    style: "percent"
  }).format(value / 100)

  if (options.addPrifix && value > 0) {
    return `+${result}`
  }

  return result
}