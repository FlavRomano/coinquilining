import { json } from "@sveltejs/kit";

export async function POST({ request, locals }) {
	return json("ok");
}
