export interface FullDate {
  day: SingleDate,
  month: SingleDate,
  year: SingleDate,
}

export type SingleDate = number | null

export type DateType = 'day' | 'month' | 'year'

export type InputError = 'EMPTY_VALUE' | 'INVALID_DATE' | 'DATE_EXCEEDED' | 'DATE_ZERO'| null
