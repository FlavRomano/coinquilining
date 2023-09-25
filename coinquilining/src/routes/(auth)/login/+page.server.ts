import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { message, superValidate } from "sveltekit-superforms/server";
import { loginSchema } from "$lib/schemas";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	if (session) {
		throw redirect(303, "/house/dashboard");
	}

	const form = await superValidate(loginSchema);

	return { form };
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const form = await superValidate(request, loginSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { error: err } = await supabase.auth.signInWithPassword({
			email: form.data.email,
			password: form.data.password,
		});

		if (err) {
			console.log(err.message);
			return message(form, err.message);
		}

		const session = await getSession();

		throw redirect(303, `/house/dashboard`);
	},
};
