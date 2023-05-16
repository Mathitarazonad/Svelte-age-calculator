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


</script>

<div class='date-picker-container'>
  <button type="button" class='date-picker-icon' on:click={() => openCalendar = !openCalendar}>
    <MdEvent />
  </button>
  {#if openCalendar}
    <div class='date-picker'>
      <DatePicker bind:value={date} browseWithoutSelecting={true}/>
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
    border: none;
    background: none;
    width: 30px;
    height: 30px;
    color: hsl(259, 100%, 65%);
    cursor: pointer;
  }

  .date-picker-icon:hover {
    transform: scale(1.1);
  }
</style>