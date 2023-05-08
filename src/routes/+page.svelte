<script lang='ts'>
	import AgeForm from '$lib/components/AgeForm.svelte';
	import DateResults from '$lib/components/DateResults.svelte';
</script>

<h1>Svelte Age Calculator</h1>
<div class="card">
  <AgeForm />
  <DateResults />
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&display=swap');

  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    --Purple: hsl(259, 100%, 65%);
    --Red: hsl(0, 100%, 67%);
    --White: white;
    --Off-white: hsl(0, 0%, 94%);
    --Light-grey: hsl(0, 0%, 86%);
    --Smokey-grey: hsl(0, 1%, 44%);
    --Black: hsl(0, 0%, 8%);
  }

  :global(body) {
    background-color: var(--Light-grey);
  }

  h1 {
    text-align:  center;
    color: var(--Black);
    font-weight: 900;
  }

  .card {
    width: 100%;
    max-width: 600px;
    padding: 55px 20px;
    padding-bottom: 20px;
    background-color: var(--White);
    border-radius: 25px;
    border-bottom-right-radius: 25%;
    display: flex;
    flex-direction: column;
    gap:40px;
  }
</style>
