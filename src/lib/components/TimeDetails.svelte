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
  <div>
    <h2>More details</h2>
    <p><span class='days-convert'>{formatedTime(dateDetails.days)}</span><span>days</span> same as:</p>
    <ul>
      <li><strong>{formatedTime(dateDetails.seconds)}</strong>seconds</li>
      <li><strong>{formatedTime(dateDetails.minutes)}</strong>minutes</li>
      <li><strong>{formatedTime(dateDetails.hours)}</strong>hours</li>
      <li>
        <strong>{formatedTime(dateDetails.weeksWithDays.weeks)}</strong>weeks
        {#if dateDetails.weeksWithDays.days}
          and <strong>{dateDetails.weeksWithDays.days}</strong> days
        {/if}
      </li>
      <li>
        <strong>{dateDetails.monthsWithDays.months + ' '}</strong>months
        {#if dateDetails.monthsWithDays.days}
          and <strong>{dateDetails.monthsWithDays.days + ' '}</strong>days
        {/if}
      </li>
    </ul>
  </div>
</div>

<style>
  .details {
    display: flex;
    flex-direction: row;
    gap: 10px;
    color: var(--Black);
  }

  div {
    display: none;
  }

  .details::before {
    content: '';
    width: 10px;
    background-color: var(--Purple);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .show-details div {
    display: flex;
    flex-direction: column;
  }

  h2 {
    font-size: 40px;
    font-style: italic;
    font-weight: 900;
  }

  .days-convert {
    color: var(--Purple);
    font-weight: 900;
    font-size: 1.2rem;
  }

  span {
    font-weight: 700;
    font-style: italic;
  }

  p {
    font-size: 1.2rem;
  }

  ul {
    list-style: none; /* Remove default bullets */
  }

  li {
    color: var(--Black);
    font-weight: 700;
    font-style: italic;
    font-size: 1.05rem;
  }

  li::before {
    content: '• ';
    color: var(--Black);
  }

  strong {
    color: var(--Purple);
    font-weight: 900;
    font-style: italic;
  }

  @media (min-width: 750px) {
    div {
      display: flex;
      flex-direction: column;
    }

    h2 {
      text-align: start;
    }

    p, span, .days-convert {
      font-size: 1.35rem;
    }

    li, strong {
      font-size: 1.15rem;
    }
  }
</style>