import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../../../../$types";
import { cleaningCalendar, cleaningMonth } from "$types/lib";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, "/register");
	}

	let { data: calendar, error: errno0 } = await locals.supabase
		.from("calendar")
		.select("roommate, events")
		.eq("house_id", session.user.user_metadata.house_id);

	if (errno0) {
		console.log(errno0);
		return fail(500, { errno0 });
	}

	const { data: roommates, error: errno1 } = await locals.supabase
		.from("users")
		.select("id, firstname, lastname")
		.eq("house_id", session.user.user_metadata.house_id);

	if (errno1) {
		console.log(errno1);
		return fail(500, { errno1 });
	}

	calendar = calendar.map((entry) => {
		const roommate = roommates.filter(
			(obj) => obj.id === entry.roommate
		)[0];
		return {
			...entry,
			roommate: {
				firstname: roommate.firstname,
				lastname: roommate.lastname,
			},
		};
	});

	return { calendar };
};

export const actions = {
	shuffle: async ({ locals, request, params }) => {
		const session = await locals.getSession();

		const { data: roommates, error: errno0 } = await locals.supabase
			.from("users")
			.select("id, firstname, lastname")
			.eq("house_id", session.user.user_metadata.house_id);

		if (errno0) {
			console.log(errno0);
			return fail(404, { errno0 });
		}

		const {
			data: {
				cleaning_zones: DB_cleaning_zones,
				cleaning_days: DB_cleaning_days,
			},
			error: errno1,
		} = await locals.supabase
			.from("houses")
			.select("cleaning_zones, cleaning_days")
			.eq("invitation_ID", session.user.user_metadata.house_id)
			.single();

		if (errno1) {
			console.log(errno1);
			return fail(500, { errno1 });
		}

		const cleaningDays = cleaningMonth(DB_cleaning_days);
		const calendar = cleaningCalendar(
			roommates,
			DB_cleaning_zones,
			cleaningDays
		);

		for (let [userId, events] of Object.entries(calendar)) {
			const { error: errno2 } = await locals.supabase
				.from("calendar")
				.upsert({
					roommate: userId,
					house_id: session.user.user_metadata.house_id,
					events: JSON.stringify(events),
				})
				.eq("roommate", userId);

			if (errno2) {
				console.log(errno2);
				return fail(500, { errno2 });
			}
		}
	},
};
