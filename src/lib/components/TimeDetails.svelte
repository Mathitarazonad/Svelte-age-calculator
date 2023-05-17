<script lang='ts'>
  import dateStore from '$lib/stores/dates.js'

  export let showTimeDetails: boolean;
  $: dateDetails = $dateStore.dateDetails

  const formatedTime = (time: number):string =>  {
    // Convert the numbers to string with thousands separators '.'
    return time.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".") + ' '
  }
</script>


<div class={`details + ${showTimeDetails ? 'show-details' : ''}`}>
  <h2>More details</h2>
  <ul>
    <li>{formatedTime(dateDetails.seconds)}<span>seconds</span></li>
    <li>{formatedTime(dateDetails.minutes)}<span>minutes</span></li>
    <li>{formatedTime(dateDetails.hours)}<span>hours</span></li>

    {#if dateDetails.weeksWithDays.weeks > 0}
      <li>
        {dateDetails.weeksWithDays.weeks + ' '}<span>weeks</span>
        {#if dateDetails.weeksWithDays.days}
          and {dateDetails.weeksWithDays.days} <span>days</span>
        {/if}
      </li>
    {/if}
    <li>
      {dateDetails.monthsWithDays.months + ' '}<span>months</span> 
      {#if dateDetails.monthsWithDays.days}
        and {dateDetails.monthsWithDays.days} <span>days</span>
      {/if}
    </li>
  </ul>
</div>

<style>
  .details {
    display: none;
    margin-top: 10px;
    color: var(--Black);
  }

  .show-details {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  h2 {
    text-align: center;
    font-size: 40px;
    font-style: italic;
    font-weight: 900;
  }

  ul {
    list-style: none; /* Remove default bullets */
  }

  ul li::before {
    content: "\2022";
    color: var(--Purple);
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -2em;
  }

  li {
    color: var(--Black);
    margin-left: 35px;
  }

  span {
    font-weight: bold;
    color: var(--Purple)
  }

  @media (min-width: 750px) {
    .details {
      display: flex;
      flex-direction: column;
    }

    h2 {
      text-align: start;
    }
  }
</style>