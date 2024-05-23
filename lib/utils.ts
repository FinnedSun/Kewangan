import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { eachDayOfInterval, isSameDay } from "date-fns"

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
  return Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: "IDR",
    minimumFractionDigits: 3,
  }).format(value)
}

export function calculcatePrecentageChange(
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