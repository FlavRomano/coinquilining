import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { message, setError, superValidate } from "sveltekit-superforms/server";
import { registrationSchema, houseSchema } from "$lib/schemas";

let userCredential: {
	email: string;
	password: string;
	firstname: string;
	lastname: string;
};

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	if (session) {
		throw redirect(303, "/house/dashboard");
	}

	const registrationForm = await superValidate(registrationSchema);
	const houseForm = await superValidate(houseSchema);

	return { registrationForm, houseForm };
};

export const actions: Actions = {
	userSection: async ({ request, cookies, locals: { supabase } }) => {
		const registrationForm = await superValidate(
			request,
			registrationSchema
		);

		if (!registrationForm.valid) {
			return fail(400, { registrationForm });
		}

		userCredential = {
			email: registrationForm.data.email,
			password: registrationForm.data.password,
			firstname: registrationForm.data.firstname,
			lastname: registrationForm.data.lastname,
		};

		const { data } = await supabase
			.from("users")
			.select()
			.eq("email", userCredential.email);

		console.log(data);

		if (data.length !== 0) {
			return setError(
				registrationForm,
				"email",
				"E-mail already exists."
			);
		}
		return { registrationForm };
	},
	houseSection: async ({ request, locals: { supabase } }) => {
		const houseForm = await superValidate(request, houseSchema);

		if (!houseForm.valid) {
			return message(houseForm, "Invalid form", {
				status: 403,
			});
		}

		const enteringExistingHouse = houseForm.data.enteringExistingHouse;
		if (enteringExistingHouse) {
			const { data, error } = await supabase
				.from("houses")
				.select()
				.eq("invitation_ID", houseForm.data.code);

			console.log(data);

			if (error) {
				return setError(houseForm, "", "Internal server error", {
					status: 500,
				});
			}
			if (data.length === 0) {
				return setError(houseForm, "code", "House doesn't exists.", {
					status: 409,
				});
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
			return setError(houseForm, "", error.message, {
				status: 409,
			});
		}

		if (!enteringExistingHouse) {
			const { error: err } = await supabase.from("houses").insert({
				invitation_ID: houseForm.data.code,
				name: houseForm.data.name,
			});

			if (err) {
				return setError(houseForm, "", err.message, {
					status: 500,
				});
			}
		}
	},
};
