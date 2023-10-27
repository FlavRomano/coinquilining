import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { env } from "$types/lib/utilities";

export const load: PageServerLoad = async ({ locals }) => {
	const { error: err } = await locals.supabase.auth.signInWithPassword({
		email: env.DEMO_EMAIL,
		password: env.DEMO_PASSWORD,
	});

	if (err) {
		console.log(err.message);
		throw error(500);
	}
	throw redirect(303, "/demo/house/dashboard");
};
