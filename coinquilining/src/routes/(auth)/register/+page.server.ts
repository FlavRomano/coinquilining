import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { message, superValidate } from "sveltekit-superforms/server";
import { user, houseSchema } from "$lib/schemas";

let userCredential: {
	email: string;
	password: string;
	firstname: string;
	lastname: string;
};

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	if (session) {
		throw redirect(303, "/dashboard");
	}

	const registrationForm = await superValidate(user);
	const houseForm = await superValidate(houseSchema);

	return { registrationForm, houseForm };
};

export const actions: Actions = {
	userSection: async ({ request, cookies, locals: { supabase } }) => {
		const registrationForm = await superValidate(request, user);

		if (!registrationForm.valid) {
			return fail(400, { registrationForm });
		}

		userCredential = {
			email: registrationForm.data.email,
			password: registrationForm.data.password,
			firstname: registrationForm.data.firstname,
			lastname: registrationForm.data.lastname,
		};
	},
	houseSection: async ({ request, cookies, locals: { supabase } }) => {
		const houseForm = await superValidate(request, houseSchema);

		if (!houseForm.valid) {
			return fail(400, { houseForm });
		}

		const enteringExistingHouse = houseForm.data.enteringExistingHouse;
		if (enteringExistingHouse) {
			const { data, error } = await supabase
				.from("houses")
				.select()
				.eq("invitation_ID", houseForm.data.code);

			console.log(data);

			if (error) {
				console.log(error);
				return message(houseForm, error.message);
			} else if (data.length === 0) {
				console.log("Invalid invitation ID");
				return message(houseForm, "Invalid invitation ID");
			}
		}

		const { data, error } = await supabase.auth.signUp({
			email: userCredential.email,
			password: userCredential.password,
			options: {
				data: {
					firstname: userCredential.firstname,
					lastname: userCredential.lastname,
					house_id: houseForm.data.code,
				},
			},
		});

		if (error) {
			console.log(error);
			return message(houseForm, error.message);
		}

		if (!enteringExistingHouse) {
			const { error: err } = await supabase.from("houses").insert({
				invitation_ID: houseForm.data.code,
				name: houseForm.data.name,
			});

			if (err) {
				console.log(err);
				return message(houseForm, err.message);
			}
		}

		console.log(data);
	},
};
