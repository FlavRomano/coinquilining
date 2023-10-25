import { writable } from "svelte/store";

export const notifications = writable([]);
export const timeout = writable(false);

export const latestShoppingLists = writable([]);
export const timeout_shoppingList = writable(false);

export const summary = writable({
	fridgePrices: undefined,
	pantryPrices: undefined,
});
export const timeout_summary = writable(false);

export const outgoings = writable([]);
export const timeout_ougoings = writable(false);
