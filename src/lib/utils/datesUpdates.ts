import dateStore from '$lib/stores/dates.js'
import type { DateType, FullDate, InputError, MonthsWithDays, WeeksWithDays } from '$lib/types/types.js'
import { getDatesResults, getMaxDayOfMonth, getStore } from './dateGetter.js'

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
  const newDateResults = getDatesResults([day, month, year] as number[])

  dateStore.update(store => {
    return { ...store, datesResult: newDateResults }
  })
}

export function updateDateDetails (): void {
  const dataStoreValues = getStore()
  const includeCurrentDay = dataStoreValues.includeCurrentDay
  const { day: selectedDay, month: selectedMonth, year: selectedYear } = dataStoreValues.selectedDates
  const [currentDay, currentMonth, currentYear] = [
    new Date().getDate(),
    (new Date().getMonth()) + 1,
    new Date().getFullYear()
  ]

  const getDays = (): number => {
    if (selectedYear === null || selectedMonth === null || selectedDay === null) return 0

    let dayResult = 0
    if (includeCurrentDay) dayResult++

    dayResult -= selectedDay

    let tempMonth = selectedMonth
    let tempYear = selectedYear

    while (tempMonth <= currentMonth || tempYear <= currentYear) {
      dayResult += getMaxDayOfMonth(tempMonth, tempYear)

      if (tempMonth === currentMonth && tempYear === currentYear) break

      if (tempMonth === 12) {
        tempYear++
        tempMonth = 1
        continue
      }

      tempMonth++
    }

    return dayResult
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
      const dateStoreValues = getStore().datesResult
      return { months: dateStoreValues.month, days: dateStoreValues.day }
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
