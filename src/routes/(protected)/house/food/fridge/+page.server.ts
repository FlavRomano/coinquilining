import { fail, redirect, type Actions } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import {
	foodAddSchema,
	foodRemoveSchema,
	foodEditSchema,
} from "$types/lib/schemas";

export const load = async ({ locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, "/register");
	}

	const { data: fridge, error: errno0 } = await locals.supabase
		.from("fridge")
		.select(
			"id, owner_id, food_name, kind, purchased_on, expiration, price"
		)
		.eq("house_id", session.user.user_metadata.house_id);

	if (errno0) {
		console.log(errno0);
		return fail(404, { errno0 });
	}

	const { data: roommates, error: errno1 } = await locals.supabase
		.from("users")
		.select("id, firstname, lastname")
		.eq("house_id", session.user.user_metadata.house_id);

	if (errno1) {
		console.log(errno1);
		return fail(404, { errno1 });
	}

	return {
		table: fridge,
		roommates,
	};
};

export const actions: Actions = {
	add: async ({ request, cookies, locals }) => {
		const {
			owner: owner_id,
			food_name,
			purchased_on,
			expiration,
			kind,
			price,
		} = Object.fromEntries(await request.formData());

		let session = await locals.getSession();

		const { error } = await locals.supabase.from("fridge").insert({
			house_id: session.user.user_metadata.house_id,
			owner_id,
			food_name,
			purchased_on,
			expiration,
			kind,
			price,
		});

		if (error) {
			console.log(error);
			return fail(400, { error });
		}
	},
	delete: async ({ request, cookies, locals }) => {
		const { deleteIds } = Object.fromEntries(await request.formData());

		for (let id of deleteIds.toString().split(",")) {
			const { error } = await locals.supabase
				.from("fridge")
				.delete()
				.eq("id", id);

			if (error) {
				console.log(error);
				return fail(400, { error });
			}
		}
	},
	edit: async ({ request, cookies, locals }) => {
		const {
			id,
			owner: owner_id,
			food_name,
			purchased_on,
			expiration,
			kind,
			price,
		} = Object.fromEntries(await request.formData());

		const { error } = await locals.supabase
			.from("fridge")
			.update({
				owner_id,
				food_name,
				purchased_on,
				expiration,
				kind,
				price,
			})
			.eq("id", id);

		if (error) {
			console.log(error);
			return fail(400, { error });
		}
	},
};
