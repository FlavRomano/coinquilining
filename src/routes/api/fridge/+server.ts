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
		.select(
			"id, owner_id, food_name, kind, purchased_on, expiration, price"
		)
		.eq("house_id", session.user.user_metadata.house_id);

	if (error) {
		throw TypeError("Failed fetch <> " + error.message);
	}

	return json(fridge, { status: 200 });
}
