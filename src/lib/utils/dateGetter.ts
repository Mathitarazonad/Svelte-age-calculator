import dateStore, { type DateStore } from '$lib/stores/dates.js'
import { get } from 'svelte/store'
import type { InputError } from '$lib/types/types.js'

type TypeOfDate = 'to' | 'from'

export function getStore (): DateStore {
  return get(dateStore)
}

export function getMaxDayOfMonth (month: number, year: number): number {
  const [currentMonth, currentYear] = [new Date().getMonth() + 1, new Date().getFullYear()]

  if (month === currentMonth && year === currentYear) {
    return new Date().getDate()
  }
  return new Date(year, month, 0).getDate()
}

export function getInputErrorMessage (errorCode: InputError): string {
  if (errorCode === 'EMPTY_VALUE') {
    return 'This field is required'
  } else if (errorCode === 'INVALID_DATE') {
    return 'Must be a valid date'
  } else if (errorCode === 'DATE_EXCEEDED') {
    return 'Must be in the past'
  } else if (errorCode === 'DATE_ZERO') {
    return 'Must not be a zero date'
  }
  return ''
}

export function getDateString (typeOfDate: TypeOfDate): string {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const selectedDates = getStore().selectedDates

  if (typeOfDate === 'to') return new Date().toLocaleDateString('en-US', options)

  return new Date(selectedDates.year as number, selectedDates.month as number - 1, selectedDates.day as number).toLocaleDateString('en-US', options)
}
