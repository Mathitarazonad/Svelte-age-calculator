<script lang='ts'>
	import { checkForDateErrors, checkForSubmitAble, getInputErrorMessage } from '$lib/utils/dateChecks.js';
	import { afterUpdate } from 'svelte';
  import date from '../stores/dates.js'

  const dateType = 'year'
  let maxYear = $date.maxDates.year
  let dateError = $date.datesErrors.year
  $: $date.maxDates.month = $date.selectedDates.year === maxYear ? new Date().getMonth() : 12

  afterUpdate(() => dateError = checkForDateErrors(dateType))
  $: checkForSubmitAble(dateError)

</script>

<div class='date-input' class:error={dateError} >
  <label for='year'>YEAR</label>
  <input type='number' id='year' placeholder='YYYY' bind:value={$date.selectedDates.year}>
  {#if dateError}
    <p class='input-error-message'>{getInputErrorMessage(dateError)}</p>
  {/if}
</div>