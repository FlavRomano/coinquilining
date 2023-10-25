import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { timeout_ougoings } from "$types/lib/stores";
import { getRoommates } from "$types/lib/utilities";

export const load: PageServerLoad = async ({ locals, fetch }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, "/register");
	}

	const house_id = session.user.user_metadata.house_id;

	const roommates = await getRoommates(fetch, house_id);

	return { house_id, roommates };
};

export const actions: Actions = {
	edit: async ({ request, locals, fetch }) => {
		let {
			id,
			owner: from,
			title: item_name,
			price,
			...splitWith
		} = Object.fromEntries(await request.formData());

		await fetch(
			`/api/receipts?title=${item_name}&price=${price}&from=${from}&splitWith=${[
				...Object.values(splitWith),
			]}`,
			{ method: "POST" }
		);

		await fetch(`/api/receipts?id=${id}`, { method: "DELETE" });

		timeout_ougoings.set(true);
	},

	delete: async ({ request, locals, fetch }) => {
		let { id } = Object.fromEntries(await request.formData());

		const response = await fetch(`/api/receipts?id=${id}`, {
			method: "DELETE",
		});

		timeout_ougoings.set(true);
	},
};
