<script lang='ts'>
  import date from '$lib/dates.js'
	import { updateDateResults } from '$lib/utils/datesUpdates.js';
	import { areEmptyInputs } from '$lib/utils/dateChecks.js'
	import { updateDateDetails } from '$lib/utils/datesUpdates.js';
	import YearInput from './YearInput.svelte'
	import DayInput from './DayInput.svelte'
	import MonthInput from './MonthInput.svelte'
	import SubmitButton from './SubmitButton.svelte'
	import DatePicker from './DatePicker.svelte'
	import CurrentDayButton from './CurrentDayButton.svelte'
	import DateComparison from './DateComparison.svelte'

  const handleSubmit = () => {
    if (!$date.ableToSubmitForm || areEmptyInputs(true)) {
      return null
    }

    updateDateResults()
    updateDateDetails()
  }

</script>

<form on:submit|preventDefault={handleSubmit}>
  <DatePicker />
  <div class='inputs-container'>
    <DayInput />
    <MonthInput />
    <YearInput />
  </div>
  <DateComparison />
  <CurrentDayButton />
  <SubmitButton />
</form>

<style>
  form {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
  }
  .inputs-container {
    display: flex;
    gap: 10px;
  }
  :global(.date-input) {
    position: relative;
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    gap: 5px;
  }
  :global(.date-input input) {
    width: 100%;
    padding: 10px 10px;
    font-size: 20px;
    font-weight: 900;
    color: var(--Black);
    border: none;
    border: 1px solid hsl(0, 0%, 86%);
    border-radius: 7px;
    outline-color: var(--Purple);
    outline-width: .1px;
  }
  :global(.date-input input::-webkit-outer-spin-button,.date-input input::-webkit-inner-spin-button) {
    -webkit-appearance: none;
    margin: 0;
  }
  :global(.date-input input:hover) {
    border-color: var(--Purple);
  }
  :global(.date-input label) {
    color: hsl(0, 1%, 44%);
    font-weight: 900;
    letter-spacing: 1.5px;
    font-size: 13px;
  }

  :global(.date-input.error input){
    border-color: var(--Red);
    outline-color: var(--Red);
  }

  :global(.date-input.error label) {
    color: var(--Red);
  }

  :global(.date-input .input-error-message) {
    position: absolute;
    top: 105%;
    color: var(--Red);
    font-style: italic;
    font-size: 12px;
  }

  @media (max-height: 650px) {
    form {
      gap: 25px;
    }
  }

</style>