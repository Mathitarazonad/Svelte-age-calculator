<script lang='ts'>
  import date from '$lib/stores/dates.js'
	import { checkForDateErrors, checkForSubmitAble, getInputErrorMessage } from '$lib/utils/dateChecks.js';
	import { afterUpdate } from 'svelte';

  const dateType = 'day'
  let dateError = $date.datesErrors.day
  
  afterUpdate(() => dateError = checkForDateErrors(dateType)) 
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