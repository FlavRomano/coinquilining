import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms/client";
import { user } from "$lib/schemas";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	if (session) {
		const { error: err } = await locals.supabase.auth.signOut();

		if (err) {
			console.log(err);
		}

		throw redirect(303, "/register");
	} else {
		throw redirect(303, "/");
	}
};
