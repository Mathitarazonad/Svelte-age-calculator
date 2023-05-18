<script lang='ts'>
  import date from '$lib/dates.js'
</script>

<div>
  <div class='checkbox-container'>
    <input type='checkbox' id='current-day' bind:checked={$date.includeCurrentDay}/>
    <label for='current-day'>Include the current day in calculation</label>
  </div>
</div>

<style>
  .checkbox-container {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  label {
    color: var(--Black);
    font-weight: 600;
    user-select: none;
    font-size: 13px;
    cursor: pointer;
  }

  input {
    background-color: red;
    accent-color: var(--Purple);
  }

  @media (min-width: 750px){
    label {
      font-size: 16px;
    }
  }
</style>