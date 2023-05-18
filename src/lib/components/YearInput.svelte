<script lang='ts'>
	import { afterUpdate } from 'svelte';
  import date from '$lib/dates.js'
	import { checkForDateErrors, checkForSubmitAble } from '$lib/utils/dateChecks.js';
	import { getInputErrorMessage } from '$lib/utils/dateGetter.js';

  const dateType = 'year'
  let maxYear = $date.maxDates.year
  $: dateError = $date.datesErrors[dateType];
  $: $date.maxDates.month = $date.selectedDates.year === maxYear ? (new Date().getMonth() + 1) : 12

  afterUpdate(() => {
    dateError = checkForDateErrors(dateType)
  })
  
  $: checkForSubmitAble(dateError)

</script>

<div class='date-input' class:error={dateError} >
  <label for='year'>YEAR</label>
  <input type='number' id='year' placeholder='YYYY' bind:value={$date.selectedDates.year}>
  {#if dateError}
    <p class='input-error-message'>{getInputErrorMessage(dateError)}</p>
  {/if}
</div>