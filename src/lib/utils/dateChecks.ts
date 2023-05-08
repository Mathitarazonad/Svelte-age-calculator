import type { DateType, InputError } from '$lib/types/types.js'
import { get } from 'svelte/store'
import dateStore from '../stores/dates.js'
import { updateDatesErrors } from './datesUpdates.js'

export function getMaxDayOfMonth (month: number, year: number): number {
  const dateStoreValues = get(dateStore)
  const { month: maxMonth, year: maxYear } = dateStoreValues.maxDates

  if (month === maxMonth + 1 && year === maxYear) {
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

export function checkForDateErrors (dateType: DateType): InputError {
  const dateStoreValues = get(dateStore)
  const dateToCheck = dateStoreValues.selectedDates[dateType]
  const { month: selectedMonth, year: selectedYear } = dateStoreValues.selectedDates
  const { day: maxDay, month: maxMonth, year: maxYear } = dateStoreValues.maxDates
  let errorType: InputError = null

  if (dateToCheck === null) return null

  if (dateToCheck === 0) {
    updateDatesErrors('DATE_ZERO', dateType)
    return 'DATE_ZERO'
  }

  if (dateType === 'day') {
    if (dateToCheck < 0 || dateToCheck > maxDay) errorType = 'INVALID_DATE'
    if (dateToCheck >= maxDay && (selectedMonth === maxMonth + 1 && selectedYear === maxYear)) errorType = 'DATE_EXCEEDED'
  }

  if (dateType === 'month') {
    if (selectedYear === maxYear && dateToCheck > maxMonth + 1) errorType = 'DATE_EXCEEDED'
    if (dateToCheck > 12 || dateToCheck < 0) errorType = 'INVALID_DATE'
  }

  if (dateType === 'year') {
    if (dateToCheck > maxYear) errorType = 'DATE_EXCEEDED'
    if (dateToCheck < 0) errorType = 'INVALID_DATE'
  }

  updateDatesErrors(errorType, dateType)
  return errorType
}

export function checkForSubmitAble (dateError: InputError): void {
  const ableToSubmitForm = dateError === null

  dateStore.update(store => {
    return { ...store, ableToSubmitForm }
  })
}

export function areEmptyInputs (): boolean {
  const dateStoreValues = get(dateStore)
  const { day, month, year } = dateStoreValues.selectedDates

  if (day !== null && month !== null && year !== null) {
    return false
  }

  const newDateErrors = { ...dateStoreValues.datesErrors }
  if (day === null) newDateErrors.day = 'EMPTY_VALUE'
  if (month === null) newDateErrors.month = 'EMPTY_VALUE'
  if (year === null) newDateErrors.year = 'EMPTY_VALUE'

  dateStore.update(store => {
    return { ...store, datesErrors: newDateErrors }
  })

  return true
}
