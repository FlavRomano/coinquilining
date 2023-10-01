import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../../../../$types";
import { message, superValidate } from "sveltekit-superforms/server";
import { fridgeSchema } from "$types/lib/schemas";

export const load = async ({ locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, "/register");
	}

	const { data: fridge, error } = await locals.supabase
		.from("fridge")
		.select("owner, food_name, kind, purchased_on, expiration, price")
		.eq("house_id", session.user.user_metadata.house_id);

	if (error) {
		return fail(404);
	}
	console.log(fridge);

	const insertFoodForm = await superValidate(fridgeSchema);

	return { insertFoodForm, table: fridge };
};

export const actions: Actions = {
	insert: async ({ request, cookies, locals }) => {
		const insertFoodForm = await superValidate(request, fridgeSchema);
		if (!insertFoodForm.valid) {
			return fail(400, { insertFoodForm });
		}

		let session = await locals.getSession();

		const { error } = await locals.supabase.from("fridge").insert({
			house_id: session.user.user_metadata.house_id,
			owner: insertFoodForm.data.owner,
			food_name: insertFoodForm.data.food_name,
			purchased_on: insertFoodForm.data.purchased_on,
			expiration: insertFoodForm.data.expiration_on,
			kind: insertFoodForm.data.kind,
			price: insertFoodForm.data.price,
		});

		if (error) {
			return fail(400, { insertFoodForm });
		}
	},
};
