import type { DateType, InputError } from '$lib/types/types.js'
import { get } from 'svelte/store'
import dateStore from '../stores/dates.js'
import { updateDatesErrors } from './datesUpdates.js'
import { getMaxDayOfMonth } from './dateGetter.js'

export function checkForDateErrors (dateType: DateType): InputError {
  const dateStoreValues = get(dateStore)
  const dateToCheck = dateStoreValues.selectedDates[dateType]
  const { month: selectedMonth, year: selectedYear } = dateStoreValues.selectedDates
  const { month: maxMonth, year: maxYear } = dateStoreValues.maxDates
  const maxDay = selectedMonth === maxMonth && selectedYear === maxYear ? getMaxDayOfMonth(selectedMonth, selectedYear) : 31

  let errorType: InputError = null

  if (dateToCheck === null) return null

  if (dateToCheck === 0) {
    errorType = 'DATE_ZERO'
    updateDatesErrors(errorType, dateType)
    return errorType
  }

  if (dateType === 'day') {
    if (dateToCheck < 0 || dateToCheck > maxDay) errorType = 'INVALID_DATE'
    if (dateToCheck >= maxDay && (selectedMonth === maxMonth && selectedYear === maxYear)) errorType = 'DATE_EXCEEDED'
  }

  if (dateType === 'month') {
    if (selectedYear === maxYear && dateToCheck > maxMonth) errorType = 'DATE_EXCEEDED'
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
