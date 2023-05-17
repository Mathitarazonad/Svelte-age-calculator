<script lang='ts'>
	import type { DateType } from '$lib/types/types.js';
  import date from '../stores/dates.js'
  
  type AnimationType = 'add' | 'substract' | ''

  $: day = $date.datesResult.day
  $: month = $date.datesResult.month
  $: year = $date.datesResult.year
  let [dayResult, monthResult, yearResult] = [0, 0, 0]

  const getAnimation = (date: number, dateType: DateType):AnimationType => {
    return $date.datesResult[dateType]! < date ? 'add' : $date.datesResult[dateType]! > date ? 'substract' : ''
  }

  const calculateDifference = (date: number, dateToReach: number, actionType: AnimationType):number => {
    if ((date + 300 < dateToReach && actionType === 'add') || (date - 300 > dateToReach && actionType === 'substract')) {
      return 10
    }
    if ((date + 100 < dateToReach && actionType === 'add') || (date - 100 > dateToReach && actionType === 'substract')) {
      return 5
    }
    if ((date + 50 < dateToReach && actionType === 'add') || (date - 50 > dateToReach && actionType === 'substract')) {
      return 3
    }

    return 1
  }

  $: if (day !== null && month !== null && year !== null) {
    const interval = setInterval(() => {
      if (dayResult < day!) dayResult += 1
      if (monthResult < month!) monthResult += 1
      if (yearResult < year!) yearResult += calculateDifference(yearResult, year!, 'add')

      if (dayResult > day!) dayResult -= 1
      if (monthResult > month!) monthResult -= 1
      if (yearResult > year!) yearResult -= calculateDifference(yearResult, year!, 'substract')

      clearInterval(interval)
      if (dayResult === day && month === monthResult && year === yearResult) clearInterval(interval)
    }, 100)
  } else {
    dayResult = 0
    monthResult = 0
    yearResult = 0
  }

</script>

<div class='results-container'>
  <div class='single-result-container'>
    {#key yearResult}
      <p class={`result ` + getAnimation(yearResult, 'year')}>
        {year || year === 0 ? yearResult : '- -'}
      </p>
    {/key}
    <p>{yearResult === 1 ? 'year' : 'years'}</p>
  </div>
  <div class='single-result-container'>
    {#key monthResult}
      <p class={`result ` + getAnimation(monthResult, 'month')}>
        {month || month === 0 ? monthResult : '- -'}
      </p> 
    {/key}
    <p>{monthResult === 1 ? 'month' : 'months'}</p>
  </div>
  <div class='single-result-container'>
    {#key dayResult}
      <p class={`result ` + getAnimation(dayResult, 'day')}>
        {day || day === 0 ? dayResult : '- -'}
      </p>
    {/key}
    <p>{dayResult === 1 ? 'day' : 'days'}</p>
  </div>
</div>

<style>
  .results-container {
    display: flex;
    flex-direction: column;
    margin-top: -1rem;
    gap: 5px;
  }
  .results.container::before {
    content: '';
    width: 10px;
    background-color: var(--Purple);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .single-result-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  p {
    font-size: 45px;
    font-weight: 900;
    font-style: italic;
    color: var(--Black);
  }

  .result {
    font-size: 50px;
    font-weight: 900;
    font-style: italic;
    color: var(--Purple);
  }

  .add {
    animation: adding 100ms linear both;
  }

  .substract {
    animation: substracting 100ms linear both
  }

  @keyframes adding {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    25% {
      transform: translateY(-10px);
      opacity: 0;
    }
    50% {
      transform: translateY(10px);
      opacity: 0.1
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }

  }

  @keyframes substracting {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    25% {
      transform: translateY(10px);
      opacity: 0;
    }
    50% {
      transform: translateY(-10px);
      opacity: 0.1
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>