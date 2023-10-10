import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../../../../../$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, "/register");
	}

	const { data: roommates, error: errno0 } = await locals.supabase
		.from("users")
		.select("firstname, lastname")
		.eq("house_id", session.user.user_metadata.house_id);

	return { roommates };
};

export const actions = {
	add: async ({ locals, request }) => {
		const session = await locals.getSession();

		let { owner, item } = Object.fromEntries(await request.formData());

		owner = owner.toString().trim();

		// TODO ADD SUPABASE

		console.log(owner, item);
	},
	delete: async ({ locals, request }) => {
		const session = await locals.getSession();

		const deleteIds = Object.fromEntries(await request.formData())
			.deleteIds.toString()
			.split(";");

		// TODO REMOVE SUPABASE

		console.log(deleteIds);
	},
	edit: async ({ locals, request }) => {
		const session = await locals.getSession();

		const { editId, item } = Object.fromEntries(await request.formData());

		// TODO EDIT SUPABASE

		console.log(editId);
		console.log(item);
	},
};
