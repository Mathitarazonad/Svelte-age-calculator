<script lang='ts'>
  import date from '$lib/stores/dates.js'
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const currentDate = new Date().toLocaleDateString('en-US', options)
  $: selectedDates = $date.selectedDates
  $: areDateErrors = $date.datesErrors.year || $date.datesErrors.month || $date.datesErrors.day
</script>

<div>
  <p>
    <strong>From: </strong>
    {#if (selectedDates.year && selectedDates.month && selectedDates.day && !areDateErrors)}
    {new Date(selectedDates.year, selectedDates.month - 1, selectedDates.day).toLocaleDateString(undefined, options)}
    {:else} . . .
    {/if}
  </p>
  <p><strong>To: </strong>{currentDate}</p>
</div>