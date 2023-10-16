import { fail, redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
	const session = await locals.getSession();
	if (!session) {
		throw redirect(303, "/register");
	}

	const { data: fridge, error: ERRFridge } = await locals.supabase
		.from("fridge")
		.select(
			`
            id, owner_id, food_name, kind, expiration
        `
		)
		.eq("house_id", session.user.user_metadata.house_id);

	const { data: pantry, error: ERRPantry } = await locals.supabase
		.from("pantry")
		.select(
			`
            id, owner_id, food_name, kind, expiration
        `
		)
		.eq("house_id", session.user.user_metadata.house_id);

	const { data: roommates, error: err } = await locals.supabase
		.from("users")
		.select("id, firstname, lastname")
		.eq("house_id", session.user.user_metadata.house_id);

	if (ERRFridge) {
		return fail(404, { ERRFridge });
	} else if (ERRPantry) {
		return fail(404, { ERRPantry });
	} else if (err) {
		return fail(404, { err });
	}

	return {
		table: [...fridge, ...pantry],
		roommates,
	};
};
