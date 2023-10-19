import { fail, json, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, "/register");
	}

	const { data: roommates, error: errno0 } = await locals.supabase
		.from("users")
		.select("firstname, lastname")
		.eq("house_id", session.user.user_metadata.house_id);

	const { data: shoppingLists, error: errno1 } = await locals.supabase
		.from("shoppingLists")
		.select("id, name, date")
		.eq("house_id", session.user.user_metadata.house_id);

	if (errno0) {
		console.log(errno0);
		return fail(500, { message: errno0.message });
	}

	if (errno1) {
		console.log(errno1);
		return fail(500, { message: errno1.message });
	}

	return { shoppingLists, roommates };
};

export const actions = {
	new: async ({ locals, request }) => {
		const session = await locals.getSession();

		let { shoppingListName } = Object.fromEntries(await request.formData());

		const { data: shoppingListID, error } = await locals.supabase
			.from("shoppingLists")
			.insert({
				house_id: session.user.user_metadata.house_id,
				name: shoppingListName,
				date: new Date().toISOString().split("T")[0],
			})
			.select("id");

		if (error) {
			console.log(error);
			return fail(500, { message: error.message });
		}

		throw redirect(
			303,
			`/house/groceries/shopping-list/${shoppingListID[0].id}`
		);
	},

	delete: async ({ locals, request }) => {
		const { deleteId } = Object.fromEntries(await request.formData());

		const { error: errno0 } = await locals.supabase
			.from("shoppingListItems")
			.delete()
			.eq("shoppingListId", deleteId);

		if (errno0) {
			console.log(errno0);
			return fail(500, { message: errno0.message });
		}

		const { error: errno1 } = await locals.supabase
			.from("shoppingLists")
			.delete()
			.eq("id", deleteId);

		if (errno1) {
			console.log(errno1);
			return fail(500, { message: errno1.message });
		}
	},
};
