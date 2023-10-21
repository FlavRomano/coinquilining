import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../../$types";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, "/register");
	}

	const { data, error } = await locals.supabase
		.from("users")
		.select()
		.eq("id", session.user.id)
		.single();
};
