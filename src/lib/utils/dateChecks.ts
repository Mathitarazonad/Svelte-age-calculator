import type { DateType, InputError } from '$lib/types/types.js'
import dateStore from '$lib/dates.js'
import { updateDatesErrors } from './datesUpdates.js'
import { getMaxDayOfMonth, getStore } from './dateGetter.js'

export function checkForDateErrors (dateType: DateType): InputError {
  const dateStoreValues = getStore()
  const dateToCheck = dateStoreValues.selectedDates[dateType]
  const { month: selectedMonth, year: selectedYear } = dateStoreValues.selectedDates
  const { month: maxMonth, year: maxYear } = dateStoreValues.maxDates
  const maxDay = selectedMonth && selectedYear ? getMaxDayOfMonth(selectedMonth, selectedYear) : 31

  const currentError = dateStoreValues.datesErrors[dateType]
  let errorType: InputError = null

  if (dateToCheck === null && currentError === 'EMPTY_VALUE') {
    return currentError
  }

  if (dateToCheck === null) {
    updateDatesErrors(errorType, dateType)
    return errorType
  }

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

export function areEmptyInputs (updateErrors = false): boolean {
  const dateStoreValues = getStore()
  const { day, month, year } = dateStoreValues.selectedDates

  if (day !== null && month !== null && year !== null) {
    return false
  }

  if (updateErrors) {
    const emptyError = 'EMPTY_VALUE'
    if (day === null) updateDatesErrors(emptyError, 'day')
    if (month === null) updateDatesErrors(emptyError, 'month')
    if (year === null) updateDatesErrors(emptyError, 'year')
  }

  return true
}
