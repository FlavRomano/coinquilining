import { fail, redirect, type Actions } from "@sveltejs/kit";
import { timeout } from "$lib/stores.js";
import { getRoommates } from "$types/lib/utilities";

export const load = async ({ locals, fetch }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, "/register");
	}

	const house_id = session.user.user_metadata.house_id;

	const pantry = (async () => {
		let response = await fetch(`/api/pantry?house_id=${house_id}`);
		if (response.ok) return await response.json();
	})();

	const roommates = await getRoommates(fetch, house_id);
	timeout.set(true);

	return {
		table: pantry,
		roommates,
	};
};

export const actions: Actions = {
	add: async ({ request, locals, fetch }) => {
		const {
			owner: owner_id,
			food_name,
			purchased_on,
			expiration,
			kind,
			price,
		} = Object.fromEntries(await request.formData());

		let session = await locals.getSession();

		const house_id = session.user.user_metadata.house_id;

		const requestBody = JSON.stringify({
			owner_id,
			food_name,
			purchased_on,
			expiration,
			kind,
			price,
		});

		const response = await fetch(`/api/pantry?house_id=${house_id}`, {
			method: "POST",
			body: requestBody,
		});

		if (!response.ok) {
			return fail(response.status);
		}
	},
	delete: async ({ request, locals, fetch }) => {
		const { deleteIds } = Object.fromEntries(await request.formData());

		let session = await locals.getSession();

		const house_id = session.user.user_metadata.house_id;

		const requestBody = JSON.stringify(deleteIds.toString().split(","));

		const response = await fetch(`/api/pantry?house_id=${house_id}`, {
			method: "DELETE",
			body: requestBody,
		});

		if (!response.ok) {
			return fail(response.status);
		}
	},
	edit: async ({ request, fetch, locals }) => {
		const {
			id,
			owner: owner_id,
			food_name,
			purchased_on,
			expiration,
			kind,
			price,
		} = Object.fromEntries(await request.formData());

		let session = await locals.getSession();

		const house_id = session.user.user_metadata.house_id;

		const requestBody = JSON.stringify({
			id,
			owner_id,
			food_name,
			purchased_on,
			expiration,
			kind,
			price,
		});

		const response = await fetch(`/api/pantry?house_id=${house_id}`, {
			method: "PUT",
			body: requestBody,
		});

		if (!response.ok) {
			return fail(response.status);
		}
	},
};
