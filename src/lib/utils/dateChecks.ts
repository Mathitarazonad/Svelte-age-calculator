import type { DateType, InputError, SingleDate } from '$lib/types/types.js';
import { get } from 'svelte/store';
import dateStore from '../stores/dates.js'
import { updateDatesErrors } from './datesUpdates.js';

export function getMaxDayOfMonth (month: number, year: number) {
  const dateStoreValues = get(dateStore)
  const {month: maxMonth, year: maxYear} = dateStoreValues.maxDates

  if (month === maxMonth! + 1 && year === maxYear) {
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
  } else if(errorCode === 'DATE_ZERO'){
    return  'Must not be a zero date'
  } 
  return ''
}

export function checkForDateErrors(date: SingleDate, dateType: DateType): InputError {
  const dateStoreValues = get(dateStore)
  const {day: selectedDay, month: selectedMonth, year: selectedYear} = dateStoreValues.selectedDates
  const {day: maxDay, month: maxMonth, year: maxYear} = dateStoreValues.maxDates
  let errorType: InputError = null;

  if (date !== null && date === 0) errorType = 'DATE_ZERO'

  if (dateType === 'day' && date !== null) {
    if (date < 0 || date > maxDay!) errorType = 'INVALID_DATE'
    if (date >= maxDay! && (selectedMonth === maxMonth! + 1 && selectedYear === maxYear)) errorType = 'DATE_EXCEEDED' 
  }

  if (dateType === 'month' && date !== null) {
    if (selectedYear === maxYear && date > maxMonth! + 1) errorType = 'DATE_EXCEEDED'
    if (date > 12 || date < 0) errorType = 'INVALID_DATE'
  }

  if (dateType === 'year' && date !== null) {
    if (date > maxYear!) errorType = 'DATE_EXCEEDED'
    if (date < 0) errorType = 'INVALID_DATE'
  }

  updateDatesErrors(errorType, dateType)
  return errorType
}

export function checkForSubmitAble(dateError: InputError): void{
  const ableToSubmitForm = dateError ? false : true

  dateStore.update(store => {
    return {...store, ableToSubmitForm}
  })
}

export function areEmptyInputs(): boolean {
  const dateStoreValues = get(dateStore)
  const {day, month, year} = dateStoreValues.selectedDates

  if (day && month && year) {
    return false
  }
  
  const newDateErrors = {...dateStoreValues.datesErrors}
  if (!day) newDateErrors.day = 'EMPTY_VALUE'
  if (!month) newDateErrors.month = 'EMPTY_VALUE'
  if (!year) newDateErrors.year = 'EMPTY_VALUE'

  console.log(newDateErrors)

  dateStore.update(store => {
    return {...store, datesErrors: newDateErrors}
  })

  return true
  
}




