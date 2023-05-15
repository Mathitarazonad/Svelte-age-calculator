export interface FullDate {
  day: SingleDate
  month: SingleDate
  year: SingleDate
}

export type SingleDate = number | null

export type DateType = 'day' | 'month' | 'year'

export type InputError = 'EMPTY_VALUE' | 'INVALID_DATE' | 'DATE_EXCEEDED' | 'DATE_ZERO' | null

interface WeeksWithDays {
  weeks: number
  days: number
}

interface MonthsWithDays {
  months: number
  days: number
}

interface DateDetails {
  seconds: number
  minutes: number
  hours: number
  days: number
  weeksWithDays: WeeksWithDays
  monthsWithDays: MonthsWithDays
}
