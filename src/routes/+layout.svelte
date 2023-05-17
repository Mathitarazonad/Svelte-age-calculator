<main>
  <slot />
</main>

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
  main {
    min-height: 100vh;
    padding: 15px 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>