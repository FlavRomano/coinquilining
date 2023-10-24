import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../../../../$types";
import { cleaningCalendar, cleaningMonth } from "$types/lib";

export const load: PageServerLoad = async ({ locals, fetch }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, "/register");
	}

	const house_id = session.user.user_metadata.house_id;

	const calendar = await (async () => {
		const response = await fetch(`/api/calendar?house_id=${house_id}`);
		if (response.ok) return await response.json();
	})();

	return { calendar };
};

export const actions = {
	shuffle: async ({ locals, fetch }) => {
		const session = await locals.getSession();

		const house_id = session.user.user_metadata.house_id;

		const roommates = await (async () => {
			const response = await fetch(
				`/api/house/roommates?house_id=${house_id}`
			);
			if (response.ok) return await response.json();
		})();

		const {
			data: {
				cleaning_zones: DB_cleaning_zones,
				cleaning_days: DB_cleaning_days,
			},
			error: errno1,
		} = await locals.supabase
			.from("houses")
			.select("cleaning_zones, cleaning_days")
			.eq("invitation_ID", house_id)
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

		const requestBody = JSON.stringify(calendar);
		const response = await fetch(`/api/calendar?house_id=${house_id}`, {
			method: "PUT",
			body: requestBody,
		});

		if (!response.ok) {
			return fail(response.status);
		}
	},
	changeEvents: async ({ locals, request }) => {
		const { events } = Object.fromEntries(await request.formData());
		const session = await locals.getSession();

		for (let { id, start } of JSON.parse(events.toString())) {
			// TODO
		}
	},
};
