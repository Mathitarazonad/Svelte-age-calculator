<script lang='ts'>
  import date from '$lib/stores/dates.js'
	import { checkForDateErrors, checkForSubmitAble, getInputErrorMessage, getMaxDayOfMonth } from '$lib/utils/dateChecks.js';
	import { updateDates } from '$lib/utils/datesUpdates.js';

  const dateType = 'month'
  let selectedMonth = $date.selectedDates.month
  $: dateError = $date.datesErrors.month
  
  $: updateDates(selectedMonth,dateType) 
  
  $: year = $date.selectedDates.year
  $: year, dateError = checkForDateErrors(selectedMonth, dateType)

  $: if (selectedMonth && $date.selectedDates.year){
    $date.maxDates.day = getMaxDayOfMonth(selectedMonth, $date.selectedDates.year)
  }

  $: checkForSubmitAble(dateError)
</script>

<div class="date-input" class:error={dateError}>
  <label for="month">MONTH</label>
  <input type="number" id="month" placeholder="MM" bind:value={selectedMonth} name="month">
  {#if dateError}
    <p class='input-error-message'>{getInputErrorMessage(dateError)}</p>
  {/if}
</div>