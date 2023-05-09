import dateStore from '$lib/stores/dates.js'
import { get } from 'svelte/store'
import type { InputError } from '$lib/types/types.js'

export function getMaxDayOfMonth (month: number, year: number): number {
  const dateStoreValues = get(dateStore)
  const { month: maxMonth, year: maxYear } = dateStoreValues.maxDates

  if (month === maxMonth && year === maxYear) {
    return new Date().getDate()
  }
  return new Date(year, month - 1, 0).getDate()
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
