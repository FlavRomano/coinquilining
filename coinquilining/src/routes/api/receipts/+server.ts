import { json } from "@sveltejs/kit";

export async function POST({ request, locals }) {
	return json("ok");
}

export async function GET({ request, locals }) {
	return json("ALL THE receipts");
}
