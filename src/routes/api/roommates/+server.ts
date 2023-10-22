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

	const { data: roommates, error } = await locals.supabase
		.from("users")
		.select("id, firstname, lastname")
		.eq("house_id", house_id);

	if (error) {
		throw TypeError("Failed fetch <> " + error.message);
	}

	return json(roommates, { status: 200 });
}
