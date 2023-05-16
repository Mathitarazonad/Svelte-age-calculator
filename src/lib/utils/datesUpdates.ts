import dateStore from '$lib/stores/dates.js'
import type { DateType, FullDate, InputError, MonthsWithDays, WeeksWithDays } from '$lib/types/types.js'
import { getMaxDayOfMonth, getStore } from './dateGetter.js'

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
  const dateStoreValues = getStore()
  const { day, month, year } = dateStoreValues.selectedDates
  const newDateResults = calculateDates([day, month, year] as number[])

  dateStore.update(store => {
    return { ...store, datesResult: newDateResults }
  })
}

export function updateDateDetails (): void {
  const dataStoreValues = getStore()
  const includeCurrentDay = dataStoreValues.includeCurrentDay
  const { day: selectedDay, month: selectedMonth, year: selectedYear } = dataStoreValues.selectedDates
  const [currentDay, currentMonth, currentYear] = [
    includeCurrentDay ? (new Date().getDate()) + 1 : new Date().getDate(),
    (new Date().getMonth()) + 1,
    new Date().getFullYear()
  ]

  const getDays = (): number => {
    const fromDateString = [dataStoreValues.selectedDates.year, dataStoreValues.selectedDates.month, dataStoreValues.selectedDates.day].join('-')
    const toDateString = [currentYear, currentMonth, currentDay].join('-')

    const fromDate = new Date(fromDateString).getTime()
    const toDate = new Date(toDateString).getTime()

    const timeDifference = Math.abs(toDate - fromDate)
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

    return dayDifference
  }

  const getWeeksAndDays = (): WeeksWithDays => {
    const weeks = Math.floor(getDays() / 7)
    const days = Math.floor(getDays()) % 7
    return { weeks, days }
  }

  const getMonthsAndDays = (): MonthsWithDays => {
    let months = 0
    let days = 0

    if (selectedDay === null || selectedMonth === null || selectedYear === null) {
      return { months, days }
    }

    let yearsDifference = currentYear - selectedYear

    if (currentMonth < selectedMonth || (selectedDay > currentDay && currentMonth === selectedMonth)) {
      yearsDifference -= 1
    }

    if (yearsDifference <= 1) {
      return { months, days }
    }

    months = yearsDifference * 12

    if (selectedMonth <= currentMonth) {
      months += currentMonth - selectedMonth
    } else {
      months += (12 - selectedMonth) + currentMonth
    }

    if (selectedDay > currentDay) {
      months -= 1
    }

    if (selectedDay <= currentDay) {
      days = currentDay - selectedDay
    } else {
      days = ((getMaxDayOfMonth(selectedMonth, selectedYear) - 1) - selectedDay) + currentDay
    }
    return { months, days }
  }

  const newDateDetails = {
    seconds: getDays() * 86400,
    minutes: getDays() * 1440,
    hours: getDays() * 24,
    days: getDays(),
    weeksWithDays: getWeeksAndDays(),
    monthsWithDays: getMonthsAndDays()
  }

  dateStore.update(store => ({ ...store, dateDetails: newDateDetails }))
}

function calculateDates (dates: number[]): FullDate {
  const includeCurrentDay = getStore().includeCurrentDay
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

    if (selectedDay > currentDay) results.month--
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
