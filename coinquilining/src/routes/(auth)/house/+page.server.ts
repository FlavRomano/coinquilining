import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { message, superValidate } from "sveltekit-superforms/server";
import { loginSchema } from "$lib/schemas";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	console.log(session);

	if (!session) {
		throw redirect(303, "/register");
	}

	const form = await superValidate(loginSchema);

	return { form };
};
