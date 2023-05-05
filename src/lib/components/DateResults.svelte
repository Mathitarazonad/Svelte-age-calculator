<script lang='ts'>
  import date from '../stores/dates.js'
  $: day = $date.datesResult.day
  $: month = $date.datesResult.month
  $: year = $date.datesResult.year
</script>

<div class="results-container">
  <div>
    <p><span>{year || year === 0 ? year : '- -'}</span> years</p>
  </div>
  <div>
    <p><span>{month || month === 0 ? month : '- -'}</span> months</p>
  </div>
  <div>
    <p><span>{day || day === 0 ? day : '- -'}</span> days</p>
  </div>
</div>

<style>
  .results-container {
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  span {
    font-size: 50px;
    font-weight: 900;
    font-style: italic;
    color: hsl(259, 100%, 65%);
  }

  p {
    font-size: 45px;
    font-weight: 900;
    font-style: italic;
    color: hsl(0, 0%, 8%);
  }
</style>