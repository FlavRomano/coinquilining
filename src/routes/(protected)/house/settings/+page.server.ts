import { fail, error, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../../../$types";
import { superValidate } from "sveltekit-superforms/server";
import { changeNameSchema, changePasswordSchema } from "$types/lib/schemas";
import { generate } from "random-words";

let wordsForDestroy;

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, "/register");
	}

	const { data: user, error: errno0 } = await locals.supabase
		.from("users")
		.select("firstname, lastname, email")
		.eq("id", session.user.id)
		.single();

	if (errno0) {
		return fail(500, { errno0 });
	}

	const changeNameForm = await superValidate(changeNameSchema);
	const changePasswordForm = await superValidate(changePasswordSchema);

	wordsForDestroy = generate({
		exactly: 1,
		wordsPerString: 4,
		separator: "-",
		maxLength: 5,
	})[0];

	return { user, changeNameForm, changePasswordForm, wordsForDestroy };
};

export const actions: Actions = {
	changeName: async ({ request, locals: { supabase, getSession } }) => {
		const changeNameForm = await superValidate(request, changeNameSchema);
		const session = await getSession();

		if (!changeNameForm.valid) {
			return fail(400, { changeNameForm });
		}

		const { error } = await supabase
			.from("users")
			.update({
				firstname: changeNameForm.data.firstname,
				lastname: changeNameForm.data.lastname,
			})
			.eq("id", session.user.id);

		if (error) {
			return fail(400, { error });
		}
	},
	changeEmail: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		const { newEmail } = Object.fromEntries(await request.formData());

		const { data, error: errno0 } = await supabase
			.from("users")
			.select()
			.eq("email", newEmail);

		if (errno0) {
			return fail(400, { error });
		}

		if (data.length === 0) {
			const { error: errno1 } = await supabase.auth.updateUser({
				email: newEmail.toString(),
			});

			if (errno1) {
				return fail(400, { error });
			}

			const { error: errno2 } = await supabase
				.from("users")
				.update({ email: newEmail })
				.eq("id", session.user.id);

			if (errno2) {
				return fail(400, { error });
			}
		} else {
			return fail(409, { message: `User at ${newEmail} already exists` });
		}
	},
	changePassword: async ({ request, locals: { supabase, getSession } }) => {
		const changePasswordForm = await superValidate(
			request,
			changePasswordSchema
		);

		if (!changePasswordForm.valid) {
			return fail(500, { changePasswordForm });
		}

		const { oldPassword, newPassword } = changePasswordForm.data;

		if (oldPassword !== newPassword) {
			const { error: errno0 } = await supabase.auth.updateUser({
				password: newPassword,
			});

			if (errno0) {
				return fail(500, { error });
			}
		}
	},
	destroyHouse: async ({ request, locals: { supabase, getSession } }) => {
		const { words } = Object.fromEntries(await request.formData());
		console.log(words, wordsForDestroy);

		if (words === wordsForDestroy) {
			console.log("Boom");
		} else {
			return fail(409, { message: "Wrong words" });
		}
	},
};
