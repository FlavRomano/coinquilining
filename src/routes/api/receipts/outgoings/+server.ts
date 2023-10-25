import { json } from "@sveltejs/kit";

export async function GET({ request, url, locals }) {
	const session = await locals.getSession();
	if (!session) {
		return json("Unauthorized access", { status: 401 });
	}

	const house_id = url.searchParams.get("house_id");
	const client_house_id = session.user.user_metadata.house_id;

	if (house_id !== client_house_id) {
		return json("Forbidden access", { status: 403 });
	}

	const { data: outgoings, error } = await locals.supabase
		.from("receipts")
		.select();

	if (error) {
		return new Response(null, { status: 500, statusText: error.message });
	}

	return json(outgoings, { status: 200 });
}
