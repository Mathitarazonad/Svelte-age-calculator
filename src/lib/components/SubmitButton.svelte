<div>
  <hr />
  <button type="submit">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 44">
      <g fill="none" stroke="#FFF" stroke-width="5">
        <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/>
      </g>
    </svg>
  </button>
</div>

<style>
  div {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
  }
  hr {
    border: none;
    width: 100%;
    border-top: 2px solid hsl(0, 0%, 86%);
  }
  button {
    background-color: hsl(259, 100%, 65%);
    padding: 17px;
    width: 55px;
    height: 55px;
    border: none;
    border-radius: 50%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -25px;
    left: 50%;
    transform: translate(-50%, 0);
    transition: .5s;
  }
  button:hover {
    background-color: hsl(0, 0%, 8%);
    transition: .5s;
  }
</style>