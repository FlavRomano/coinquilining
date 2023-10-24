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

	const latest = JSON.parse(url.searchParams.get("latest"));

	let { data: shoppingLists, error } = await locals.supabase
		.from("shoppingLists")
		.select("id, name, date")
		.eq("house_id", session.user.user_metadata.house_id);

	if (error) {
		return new Response(null, { status: 500, statusText: error.message });
	}

	if (latest) {
		const latestDate = shoppingLists.reduce((a, b) =>
			Date.parse(a.date) > Date.parse(b.date) ? a.date : b.date
		);
		const latestShoppingLists = shoppingLists.filter(
			(shoppingList) => shoppingList.date == latestDate
		);

		return json(latestShoppingLists, { status: 200 });
	}

	return json(shoppingLists, { status: 200 });
}
