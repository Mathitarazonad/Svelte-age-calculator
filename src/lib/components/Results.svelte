<script lang='ts'>
	import DateResults from './DateResults.svelte';
	import TimeDetails from './TimeDetails.svelte';
  import dateStore from '$lib/dates.js'
	import TimeDetailsButton from './TimeDetailsButton.svelte';

  let areResults = false
  let showTimeDetails = false

  const handleTimeDetails = () => {
    showTimeDetails = !showTimeDetails
  }

  $: if ($dateStore.datesResult.day !== null && $dateStore.datesResult.month !== null && $dateStore.datesResult.year !== null) {
    areResults = true 
  } else {
    areResults = false
  }
</script>

<div>
  <DateResults />
  {#if areResults}
    <TimeDetailsButton {showTimeDetails} on:click={handleTimeDetails} />
    <TimeDetails {showTimeDetails} on:click={handleTimeDetails} />
  {/if}
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    padding-right: 15px;
    position: relative;
    gap: 10px;
  }

  @media (min-width: 750px) {
    div {
      flex-direction: row;
      justify-content: space-between;
    }
  }
</style>