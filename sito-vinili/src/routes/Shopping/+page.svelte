<script lang="ts">
  let addingToCart = false;
  let addingToShopList = false;
</script>

<h2>Shopping List</h2>
<button on:click={() => (addingToShopList = !addingToShopList)}>
  {addingToShopList ? "Hide" : "Add to shopping list"}
</button>

<div>
  {#if addingToShopList}
    <form>
      <label for="item">Item:</label>
      <input type="text" name="item" id="item" />
      <br />
      <label for="description">Description:</label>
      <input type="text" name="description" id="description" />
      <br />
      <br />
      <input type="submit" value="Conferma" />
    </form>
  {:else}
    <table>
      <tr>
        <th>Roommate</th>
        <th>Item</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>Flavio</td>
        <td>Balsamo</td>
        <td>Il più economico</td>
      </tr>
      <tr>
        <td>Gabriele</td>
        <td>Dentifricio</td>
        <td>Colgate o Parodontax</td>
      </tr>
    </table>
  {/if}
</div>

<h2>Cart</h2>
<ul>
  <li>Totale:</li>
  <li>Flavio:</li>
  <li>Gabriele:</li>
</ul>
<button on:click={() => (addingToCart = !addingToCart)}>
  {addingToCart ? "Hide" : "Add to cart"}
</button>

<div>
  {#if addingToCart}
    <p>
      TODO: In "Item" suggerisci gli elementi già presenti nella "Shopping list"
    </p>
    <form>
      <label for="item">Item:</label>
      <input type="text" name="item" id="item" />
      <br />
      <label for="price">Price:</label>
      <input type="text" name="price" id="price" />
      <br />
      <br />
      <input type="submit" value="Conferma" />
    </form>
  {:else}
    <ul>
      Flavio
      <li>
        <input type="checkbox" name="cartItem" id="check1" />
        <label for="check1">Balsamo</label>
        <input
          type="text"
          name="cartItem"
          id="check1"
          placeholder="Insert price"
        />
      </li>
    </ul>
    <ul>
      Gabriele
      <li>
        <input type="checkbox" name="asd" id="check2" />
        <label for="check2">Dentifricio</label>
        <input
          type="text"
          name="cartItem"
          id="check2"
          placeholder="Insert price"
        />
      </li>
    </ul>
  {/if}
</div>
