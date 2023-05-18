<script lang='ts'>
  import date from '$lib/dates.js'
	import { checkForDateErrors, checkForSubmitAble } from '$lib/utils/dateChecks.js';
	import { getInputErrorMessage } from '$lib/utils/dateGetter.js';
	import { afterUpdate } from 'svelte';

  const dateType = 'day'
  $: dateError = $date.datesErrors[dateType];
  
  afterUpdate(() => {
    dateError = checkForDateErrors(dateType)
  }) 
  //Everytime the month, age, day or maxDay changes, check the date again

  $: checkForSubmitAble(dateError)
</script>

<div class='date-input' class:error={dateError}>
  <label for='day'>DAY</label>
  <input type='number' id='day' placeholder='DD' bind:value={$date.selectedDates.day}>
  {#if dateError}
    <p class='input-error-message'>{getInputErrorMessage(dateError)}</p>
  {/if}
</div>