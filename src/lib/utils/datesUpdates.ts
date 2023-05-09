import dateStore from '$lib/stores/dates.js'
import type { DateType, FullDate, InputError, SingleDate } from '$lib/types/types.js'
import { get } from 'svelte/store'
import { getMaxDayOfMonth } from './dateGetter.js'

export function updateDates (dateToUpate: SingleDate, dateType: DateType): void {
  const dateStoreValues = get(dateStore)
  const newDates = { ...dateStoreValues.selectedDates }
  newDates[dateType] = dateToUpate

  dateStore.update(store => {
    return { ...store, selectedDates: newDates }
  })
}

export function updateFullDate (dates: FullDate): void {
  dateStore.update(store => {
    return { ...store, selectedDates: dates }
  })
}

export function updateDatesErrors (errorType: InputError, dateType: DateType): void {
  dateStore.update(dates => {
    const newDatesErrors = { ...dates.datesErrors }
    newDatesErrors[dateType] = errorType
    return { ...dates, datesErrors: newDatesErrors }
  })
}

export function updateDateResults (): void {
  const dateStoreValues = get(dateStore)
  const { day, month, year } = dateStoreValues.selectedDates
  const newDateResults = calculateDates([day, month, year] as number[])

  dateStore.update(store => {
    return { ...store, datesResult: newDateResults }
  })
}

function calculateDates (dates: number[]): FullDate {
  const includeCurrentDay = get(dateStore).includeCurrentDay
  const [selectedDay, selectedMonth, selectedYear] = dates
  const [currentDay, currentMonth, currentYear] = [
    includeCurrentDay ? (new Date().getDate()) + 1 : new Date().getDate(),
    (new Date().getMonth()) + 1,
    new Date().getFullYear()
  ]
  const results: FullDate = { day: 0, month: 0, year: 0 }

  if (selectedMonth > currentMonth || (selectedMonth === currentMonth && selectedDay > currentDay)) {
    results.year = (currentYear - selectedYear) - 1
  } else {
    results.year = currentYear - selectedYear
  }

  if (selectedMonth > currentMonth) {
    results.month = (12 - selectedMonth) + currentMonth

    if (selectedDay > currentDay) {
      results.month--
    }
  } else if (selectedMonth === currentMonth && selectedDay > currentDay) {
    results.month = 11
  } else {
    results.month = currentMonth - selectedMonth
    if (selectedDay > currentDay) results.month--
  }

  if (selectedDay <= currentDay) {
    results.day = currentDay - selectedDay
  } else {
    results.day = ((getMaxDayOfMonth(selectedMonth, selectedYear) - 1) - selectedDay) + currentDay
  }

  return results
}
