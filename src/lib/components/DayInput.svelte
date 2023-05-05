<script lang='ts'>
  import date from '$lib/stores/dates.js'
	import { checkForDateErrors, checkForSubmitAble, getInputErrorMessage } from '$lib/utils/dateChecks.js';
	import { updateDates } from '$lib/utils/datesUpdates.js';

  const dateType = 'day'
  let selectedDay = $date.selectedDates.day
  $: dateError = $date.datesErrors.day
  
  $: updateDates(selectedDay,dateType) 

  $: month = $date.selectedDates.month
  $: year = $date.selectedDates.year
  $: year, month, dateError = checkForDateErrors(selectedDay, dateType) 
  //Everytime the month or age changes, check the date again

  $: checkForSubmitAble(dateError)
</script>

<div class="date-input" class:error={dateError}>
  <label for="day">DAY</label>
  <input type="number" id="day" placeholder="DD" bind:value={selectedDay}>
  {#if dateError}
    <p class='input-error-message'>{getInputErrorMessage(dateError)}</p>
  {/if}
</div>