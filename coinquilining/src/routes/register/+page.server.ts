import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { message, superValidate } from "sveltekit-superforms/server";
import { user } from "$lib/schemas";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	if (session) {
		throw redirect(303, "/");
	}

	const form = await superValidate(user);

	return { form };
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const form = await superValidate(request, user);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { error: err } = await supabase.auth.signUp({
			email: form.data.email,
			password: form.data.password,
			options: {
				data: {
					name: form.data.name,
					surname: form.data.surname,
				},
			},
		});

		if (err) {
			console.log(err.message);
			return message(form, err.message);
		}

		throw redirect(303, "/login");
	},
};
