import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, "/register");
	}

	const {
		data: { cleaning_zones, cleaning_days },
		error,
	} = await locals.supabase
		.from("houses")
		.select("cleaning_zones, cleaning_days")
		.eq("invitation_ID", session.user.user_metadata.house_id)
		.single();

	if (error) {
		console.log(error);
		return fail(500, { error });
	}

	return { cleaning_zones, cleaning_days };
};

export const actions = {
	save: async ({ locals, request, params }) => {
		const session = await locals.getSession();

		const data = Object.fromEntries(await request.formData());

		const weekdays = data.weekdays.toString().split(",");
		const zones = data.zones
			.toString()
			.split(",")
			.filter((v) => v.trim().length !== 0);

		const { error } = await locals.supabase
			.from("houses")
			.update({ cleaning_zones: zones, cleaning_days: weekdays })
			.eq("invitation_ID", session.user.user_metadata.house_id);

		if (error) {
			console.log(error);
			return fail(500, { error });
		}

		throw redirect(303, "/house/lifestyle/cleaning-rotations?/shuffle");
	},
};
