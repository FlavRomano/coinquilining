import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../../../../../$types";
import { getRoommates } from "$types/lib/utilities";

export const load: PageServerLoad = async ({ params, locals, fetch }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, "/register");
	}

	const house_id = session.user.user_metadata.house_id;

	const roommates = await getRoommates(fetch, house_id);

	const shoppingListId = params.shoppingListId;

	const { data: shoppingList, error: errno1 } = await locals.supabase
		.from("shoppingListItems")
		.select()
		.eq("shoppingListId", shoppingListId);

	if (errno1) {
		console.log(errno1);
		return fail(500, { message: errno1.message });
	}
	const { data: listName, error: errno2 } = await locals.supabase
		.from("shoppingLists")
		.select("name")
		.eq("id", shoppingListId)
		.single();

	if (errno2) {
		console.log(errno2);
		return fail(500, { message: errno2.message });
	}

	return { shoppingList, listName: listName.name, roommates };
};

export const actions = {
	add: async ({ locals, request, params }) => {
		const shoppingListId = params.shoppingListId;

		let { owner_id, item } = Object.fromEntries(await request.formData());

		owner_id = owner_id.toString();

		const { error } = await locals.supabase
			.from("shoppingListItems")
			.insert({ shoppingListId, owner_id, item });

		if (error) {
			console.log(error);
			return fail(500, { message: error.message });
		}
	},
	delete: async ({ locals, request }) => {
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
		const { editId, item, owner_id } = Object.fromEntries(
			await request.formData()
		);

		const { error } = await locals.supabase
			.from("shoppingListItems")
			.update({ owner_id, item })
			.eq("id", editId);

		if (error) {
			console.log(error);
			return fail(500, { message: error.message });
		}
	},
};
