import { json } from "@sveltejs/kit";

export async function GET({ url, locals }) {
	const session = await locals.getSession();
	if (!session) {
		return json("Unauthorized access", { status: 401 });
	}

	const house_id = url.searchParams.get("house_id");
	const client_house_id = session.user.user_metadata.house_id;

	if (house_id !== client_house_id) {
		return json("Forbidden access", { status: 403 });
	}

	let { data: calendar, error: errno0 } = await locals.supabase
		.from("calendar")
		.select("roommate, events")
		.eq("house_id", session.user.user_metadata.house_id);

	if (errno0) {
		return new Response(null, {
			status: 500,
			statusText: errno0.message,
		});
	}

	const { data: roommates, error: errno1 } = await locals.supabase
		.from("users")
		.select("id, firstname, lastname")
		.eq("house_id", session.user.user_metadata.house_id);

	if (errno1) {
		return new Response(null, {
			status: 500,
			statusText: errno1.message,
		});
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

	return json(calendar, { status: 200 });
}

export async function PUT({ request, url, locals }) {
	const session = await locals.getSession();
	if (!session) {
		return json("Unauthorized access", { status: 401 });
	}

	const house_id = url.searchParams.get("house_id");
	const client_house_id = session.user.user_metadata.house_id;

	if (house_id !== client_house_id) {
		return json("Forbidden access", { status: 403 });
	}

	const calendar = JSON.parse(await request.text());

	for (let [userId, events] of Object.entries(calendar)) {
		const { error: errno1 } = await locals.supabase
			.from("calendar")
			.upsert({
				roommate: userId,
				house_id: session.user.user_metadata.house_id,
				events: JSON.stringify(events),
			})
			.eq("roommate", userId);

		if (errno1) {
			return new Response(null, {
				status: 500,
				statusText: errno1.message,
			});
		}
	}

	return new Response(null, { status: 202 });
}
