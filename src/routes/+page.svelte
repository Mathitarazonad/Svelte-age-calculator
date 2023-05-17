<script lang='ts'>
	import AgeForm from '$lib/components/AgeForm.svelte';
	import Results from '$lib/components/Results.svelte';
</script>

<div class='card'>
  <AgeForm />
  <Results />
</div>

<style>
  .card {
    width: 100%;
    max-width: 370px;
    padding: 55px 20px;
    padding-bottom: 20px;
    background-color: var(--White);
    border-radius: 25px;
    border-bottom-right-radius: 25%;
    display: flex;
    flex-direction: column;
    gap:40px;
  }

  @media (min-width: 750px) {
    .card {
      max-width: 700px;
      padding: 50px 40px;
    }
  }
</style>
