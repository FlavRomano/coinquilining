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

	const { data: pantry, error } = await locals.supabase
		.from("pantry")
		.select("id, owner, food_name, kind, purchased_on, expiration, price")
		.eq("house_id", session.user.user_metadata.house_id);

	const { data: roommates, error: err } = await locals.supabase
		.from("users")
		.select("firstname, lastname")
		.eq("house_id", session.user.user_metadata.house_id);

	if (error) {
		return fail(404, { error });
	}

	const insertFoodForm = await superValidate(foodAddSchema);
	const deleteFoodForm = await superValidate(foodRemoveSchema);
	const editFoodForm = await superValidate(foodEditSchema);

	return {
		insertFoodForm,
		deleteFoodForm,
		editFoodForm,
		table: pantry,
		roommates,
	};
};

export const actions: Actions = {
	insert: async ({ request, cookies, locals }) => {
		const insertFoodForm = await superValidate(request, foodAddSchema);
		if (!insertFoodForm.valid) {
			return fail(400, { insertFoodForm });
		}

		let session = await locals.getSession();

		const { error } = await locals.supabase.from("pantry").insert({
			house_id: session.user.user_metadata.house_id,
			owner: insertFoodForm.data.owner.split(" ")[0],
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
	delete: async ({ request, cookies, locals }) => {
		const removeFoodForm = await superValidate(request, foodRemoveSchema);
		if (!removeFoodForm.valid) {
			return fail(400, { removeFoodForm });
		}

		const { error } = await locals.supabase
			.from("pantry")
			.delete()
			.eq("id", removeFoodForm.data.id);

		if (error) {
			return fail(400, { removeFoodForm });
		}
	},
	edit: async ({ request, cookies, locals }) => {
		const editFoodForm = await superValidate(request, foodEditSchema);
		if (!editFoodForm.valid) {
			return fail(400, { editFoodForm });
		}

		const { error } = await locals.supabase
			.from("pantry")
			.update({
				owner: editFoodForm.data.owner.split(" ").at(0),
				food_name: editFoodForm.data.food_name,
				purchased_on: editFoodForm.data.purchased_on,
				expiration: editFoodForm.data.expiration_on,
				kind: editFoodForm.data.kind,
				price: editFoodForm.data.price,
			})
			.eq("id", editFoodForm.data.id)
			.select();

		if (error) {
			return fail(400, { editFoodForm });
		}
	},
};
