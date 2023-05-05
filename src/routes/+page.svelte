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
  }

  :global(body) {
    background-color: hsl(0, 0%, 86%)
  }

  h1 {
    text-align:  center;
    color: hsl(0, 0%, 8%);
    font-weight: 900;
  }

  .card {
    width: 100%;
    max-width: 600px;
    max-height: 500px;
    padding: 55px 20px;
    background-color: white;
    border-radius: 25px;
    border-bottom-right-radius: 25%;
    display: flex;
    flex-direction: column;
    gap:40px;
  }
</style>
