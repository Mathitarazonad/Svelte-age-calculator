<script lang='ts'>
  import date from '$lib/stores/dates.js'
	import type { InputError } from '$lib/types/types.js';
	import { checkForDateErrors, checkForSubmitAble, getInputErrorMessage, getMaxDayOfMonth } from '$lib/utils/dateChecks.js';
	import { afterUpdate } from 'svelte';

  const dateType = 'month'
  let dateError: InputError;

  afterUpdate(() => {
    dateError = checkForDateErrors(dateType)
    $date.maxDates.day = $date.selectedDates.year && $date.selectedDates.month ? getMaxDayOfMonth($date.selectedDates.month, $date.selectedDates.year) : 31
  })

  $: checkForSubmitAble(dateError) 
</script>

<div class='date-input' class:error={dateError}>
  <label for='month'>MONTH</label>
  <input type='number' id='month' placeholder='MM' bind:value={$date.selectedDates.month} name='month'>
  {#if dateError}
    <p class='input-error-message'>{getInputErrorMessage(dateError)}</p>
  {/if}
</div>