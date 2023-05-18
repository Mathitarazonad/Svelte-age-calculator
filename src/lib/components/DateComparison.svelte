<script lang='ts'>
  import date from '$lib/dates.js'
	import { areEmptyInputs } from '$lib/utils/dateChecks.js'
  import {getDateString} from '$lib/utils/dateGetter.js'
  $: areDateErrors = $date.datesErrors.year !== null || $date.datesErrors.month !== null || $date.datesErrors.day !== null || areEmptyInputs(false)

  const currentDate = getDateString('to')
  let fromDate: string;

  $: if (!areDateErrors) {
    $date.selectedDates
    fromDate = getDateString('from')
  } else fromDate = '. . .'
</script>

<div>
  <p><strong>From: </strong><span>{fromDate}</span></p>
  <p><strong>To: </strong><span>{currentDate}</span></p>
</div>

