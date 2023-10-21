import { fail, redirect, type Actions } from "@sveltejs/kit";

export const load = async ({ locals, fetch }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, "/register");
	}

	const house_id = session.user.user_metadata.house_id;

	let response = await fetch(`/api/fridge?house_id=${house_id}`);

	const fridge = await response.json();

	response = await fetch(`/api/roommates?house_id=${house_id}`);

	const roommates = await response.json();

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
