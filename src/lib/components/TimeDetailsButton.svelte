<script lang='ts'>
  import FaClock from 'svelte-icons/fa/FaClock.svelte'
  import IoIosArrowUp from 'svelte-icons/io/IoIosArrowUp.svelte'

  export let showTimeDetails: boolean;
</script>


<div>
  {#if showTimeDetails}
    <button type='button' class='close' on:click>
      <IoIosArrowUp />
    </button>
  {:else}
    <button type='button' on:click>
      <FaClock />
    </button>
  {/if}
</div>

<style>
  button {
    border: none;
    background: none;
    border-radius: 50%;
    width: 55px;
    height: 55px;
    padding: 10px;
    background-color: var(--Purple);
    color: var(--White);
    position: absolute;
    right: 30px;
    bottom: 10px;
    transition: .5s;
  }

  button:hover {
    transition: .5s;
    background-color: var(--Black);
  }

  .close {
    bottom: 215px;
  }

  @media (min-width: 650px) {
    div {
      display: none;
    }
  }
</style>




