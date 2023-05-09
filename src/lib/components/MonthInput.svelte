<script lang='ts'>
  import date from '$lib/stores/dates.js'
	import { checkForDateErrors, checkForSubmitAble } from '$lib/utils/dateChecks.js';
	import { getInputErrorMessage } from '$lib/utils/dateGetter.js';
	import { afterUpdate } from 'svelte';

  const dateType = 'month'
  $: dateError = $date.datesErrors[dateType];
  
  afterUpdate(() => {
    dateError = checkForDateErrors(dateType)
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