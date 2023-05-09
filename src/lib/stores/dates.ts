import { writable, type Writable } from 'svelte/store'
import type { FullDate, InputError } from '$lib/types/types.js'

interface DateStore {
  selectedDates: FullDate
  maxDates: { month: number, year: number }
  datesResult: FullDate
  datesErrors: {
    day: InputError
    month: InputError
    year: InputError
  }
  ableToSubmitForm: boolean
  includeCurrentDay: boolean
}

const date: Writable<DateStore> = writable({
  selectedDates: {
    day: 1,
    month: 1,
    year: 2000
  },
  maxDates: {
    month: (new Date().getMonth()) + 1,
    year: new Date().getFullYear()
  },
  datesResult: {
    day: null,
    month: null,
    year: null
  },
  datesErrors: {
    day: null,
    month: null,
    year: null
  },
  ableToSubmitForm: true,
  includeCurrentDay: false
})

export default date
