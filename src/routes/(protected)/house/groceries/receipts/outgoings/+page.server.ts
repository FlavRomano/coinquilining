import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, "/register");
	}

	const { data: roommates, error: errno0 } = await locals.supabase
		.from("users")
		.select("id, firstname, lastname, balance")
		.eq("house_id", session.user.user_metadata.house_id);

	if (errno0) {
		console.log(errno0);
		return fail(500, { message: errno0.message });
	}

	const { data: outgoings, error: errno1 } = await locals.supabase
		.from("receipts")
		.select();

	if (errno1) {
		console.log(errno1);
		return fail(500, { message: errno1.message });
	}

	return { roommates, outgoings };
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
	},

	delete: async ({ request, locals, fetch }) => {
		let { id } = Object.fromEntries(await request.formData());

		const response = await fetch(`/api/receipts?id=${id}`, {
			method: "DELETE",
		});
    },

};
