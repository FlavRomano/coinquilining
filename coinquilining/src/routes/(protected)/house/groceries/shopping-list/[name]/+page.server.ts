import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../../../../../$types";

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, "/register");
	}

	const { data: roommates, error: errno0 } = await locals.supabase
		.from("users")
		.select("firstname, lastname")
		.eq("house_id", session.user.user_metadata.house_id);

	if (errno0) {
		console.log(errno0);
		return fail(500, { message: errno0.message });
	}

	const shoppingListId = params.name;

	const { data: shoppingList, error: errno1 } = await locals.supabase
		.from("shoppingListItems")
		.select()
		.eq("shoppingListId", shoppingListId);

	if (errno1) {
		console.log(errno1);
		return fail(500, { message: errno1.message });
	}

	return { shoppingList, roommates };
};

export const actions = {
	add: async ({ locals, request, params }) => {
		const shoppingListId = params.name;

		let { owner, item } = Object.fromEntries(await request.formData());

		owner = owner.toString().trim();

		const { error } = await locals.supabase
			.from("shoppingListItems")
			.insert({ shoppingListId, owner, item });

		if (error) {
			console.log(error);
			return fail(500, { message: error.message });
		}
	},
	delete: async ({ locals, request }) => {
		const session = await locals.getSession();

		const deleteIds = Object.fromEntries(await request.formData())
			.deleteIds.toString()
			.split(";");

		for (let deleteId of deleteIds) {
			const { error } = await locals.supabase
				.from("shoppingListItems")
				.delete()
				.eq("id", deleteId);

			if (error) {
				console.log(error);
				return fail(500, { message: error.message });
			}
		}
	},
	edit: async ({ locals, request }) => {
		const session = await locals.getSession();

		const { editId, item } = Object.fromEntries(await request.formData());

		// TODO EDIT SUPABASE

		console.log(editId);
		console.log(item);
	},
};
