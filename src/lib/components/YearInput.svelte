<script lang='ts'>
	import { checkForDateErrors, checkForSubmitAble, getInputErrorMessage } from '$lib/utils/dateChecks.js';
	import { updateDates } from '$lib/utils/datesUpdates.js';
  import date from '../stores/dates.js'

  const dateType = 'year'
  let selectedYear = $date.selectedDates.year
  let maxYear = $date.maxDates.year
  $: dateError = $date.datesErrors.year

  $: updateDates(selectedYear, dateType)
  $: $date.maxDates.month = selectedYear === maxYear ? new Date().getMonth() : 12
  
  $: selectedYear, dateError = checkForDateErrors(selectedYear, dateType)
  $: checkForSubmitAble(dateError)

</script>

<div class="date-input" class:error={dateError} >
  <label for="year">YEAR</label>
  <input type="number" id="year" placeholder="YYYY" bind:value={selectedYear}>
  {#if dateError}
    <p class="input-error-message">{getInputErrorMessage(dateError)}</p>
  {/if}
</div>