<script>
  let tabOpened = false;
</script>

<h1>Coinquilining</h1>
<nav>
  <a href="/">Home</a>
  <a href="/Shopping">Shopping</a>
  <a href="/Fridge">Fridge</a>
  <a href="/House">House</a>
</nav>
<br />
<slot />
<div>
  <button on:click={() => (tabOpened = !tabOpened)}>Notifiche TAB</button>
  {#if tabOpened}
    <nav>
      <ul>
        <li>
          <b>Flavio xx</b>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex mollitia repudiandae
          laboriosam laudantium eum, sed libero illum, esse debitis harum expedita
          iste est aut autem sapiente aperiam qui labore fugiat! <i>Today</i>
        </li>
        <li>
          <b>Gabriele cc</b>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex mollitia repudiandae
          laboriosam laudantium eum, sed libero illum, esse debitis harum expedita
          iste est aut autem sapiente aperiam qui labore fugiat!
          <i>Yesterday</i>
        </li>
        <li>
          <b>Gabriele cc</b>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex mollitia repudiandae
          laboriosam laudantium eum, sed libero illum, esse debitis harum expedita
          iste est aut autem sapiente aperiam qui labore fugiat!
          <i>5 Sept. 2023</i>
        </li>
        <li>
          <b>Flavio xx</b>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex mollitia repudiandae
          laboriosam laudantium eum, sed libero illum, esse debitis harum expedita
          iste est aut autem sapiente aperiam qui labore fugiat!
          <i>4 Sept. 2023</i>
        </li>
      </ul>
    </nav>
  {/if}
</div>
