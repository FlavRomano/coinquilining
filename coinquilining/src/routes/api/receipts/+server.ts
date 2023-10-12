import { json } from "@sveltejs/kit";

export async function GET({ request, locals }) {
	return json("ALL THE receipts");
}
