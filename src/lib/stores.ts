import { writable } from "svelte/store";

export const notifications = writable([]);
export const timeout = writable(false);

export const latestShoppingLists = writable([]);
export const timeout_shoppingList = writable(false);
