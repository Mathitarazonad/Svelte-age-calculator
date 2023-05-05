<script lang=ts>
  import MdEvent from 'svelte-icons/md/MdEvent.svelte'
  import { DatePicker} from 'date-picker-svelte'
	import { updateFullDate } from '$lib/utils/datesUpdates.js';

  let date: Date;
  let openCalendar = false

  $: formatedDate = date ? {
    day: parseInt(date.toLocaleDateString().split('/')[0]),
    month: parseInt(date.toLocaleDateString().split('/')[1]),
    year: parseInt(date.toLocaleDateString().split('/')[2])
  } : null

  $: if(formatedDate) {
    updateFullDate(formatedDate)
  }

  const handleClick = () => {
    openCalendar = !openCalendar
  }

</script>

<div class='date-picker-container'>
  <div class='date-picker-icon' on:click={() => handleClick()}>
    <MdEvent />
  </div>
  {#if openCalendar}
    <div class='date-picker'>
      <DatePicker max={new Date()} bind:value={date}/>
    </div>
  {/if}
</div>

<style>
  .date-picker {
    position: absolute;
    left: -215px;
  }

  .date-picker-container {
    position: absolute;
    top: -35px;
    right: 0px;
    z-index: 999;
  }

  .date-picker-icon {
    width: 30px;
    height: 30px;
    color: hsl(259, 100%, 65%);
    cursor: pointer;
  }
</style>