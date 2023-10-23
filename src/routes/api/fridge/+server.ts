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

	const { data: fridge, error } = await locals.supabase
		.from("fridge")
		.select()
		.eq("house_id", house_id);

	if (error) {
		return new Response(null, {
			status: 500,
			statusText: error.message,
		});
	}

	return json(fridge, { status: 200 });
}

export async function POST({ request, url, locals }) {
	const session = await locals.getSession();
	if (!session) {
		return json("Unauthorized access", { status: 401 });
	}

	const house_id = url.searchParams.get("house_id");
	const client_house_id = session.user.user_metadata.house_id;

	if (house_id !== client_house_id) {
		return json("Forbidden access", { status: 403 });
	}

	const requestBody = await request.text();

	const { owner_id, food_name, purchased_on, expiration, kind, price } =
		JSON.parse(requestBody);

	const { error } = await locals.supabase.from("fridge").insert({
		house_id: house_id,
		owner_id,
		food_name,
		purchased_on,
		expiration,
		kind,
		price: parseFloat(price),
	});

	if (error) {
		return new Response(null, {
			status: 500,
			statusText: error.message,
		});
	}

	return new Response(null, { status: 204 });
}

export async function DELETE({ request, url, locals }) {
	const session = await locals.getSession();
	if (!session) {
		return json("Unauthorized access", { status: 401 });
	}

	const house_id = url.searchParams.get("house_id");
	const client_house_id = session.user.user_metadata.house_id;

	if (house_id !== client_house_id) {
		return json("Forbidden access", { status: 403 });
	}

	const foodIds = JSON.parse(await request.text());

	for (let id of foodIds) {
		const { error } = await locals.supabase
			.from("fridge")
			.delete()
			.eq("id", id);

		if (error) {
			return new Response(null, {
				status: 500,
				statusText: error.message,
			});
		}
	}

	return new Response(foodIds, { status: 202 });
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

	const { id, owner_id, food_name, purchased_on, expiration, kind, price } =
		JSON.parse(await request.text());

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
		return new Response(null, {
			status: 500,
			statusText: error.message,
		});
	}

	return new Response(null, { status: 204 });
}
