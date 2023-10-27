import { fail, error, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../../../$types";
import { superValidate } from "sveltekit-superforms/server";
import { changeNameSchema, changePasswordSchema } from "$types/lib/schemas";
import { generate } from "random-words";
import { getRoommates } from "$types/lib/utilities";

let wordsForDestroy;

export const load: PageServerLoad = async ({ locals, fetch }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, "/register");
	}

	const house_id = session.user.user_metadata.house_id;

	const roommates = await getRoommates(fetch, house_id);

	const user = roommates.filter(
		(roommate) => roommate.id === session.user.id
	)[0];

	const changeNameForm = await superValidate(changeNameSchema);
	const changePasswordForm = await superValidate(changePasswordSchema);

	wordsForDestroy = generate({
		exactly: 1,
		wordsPerString: 4,
		separator: "-",
		maxLength: 5,
	})[0];

	return {
		user,
		roommates,
		changeNameForm,
		changePasswordForm,
		wordsForDestroy,
		house_id,
	};
};

export const actions: Actions = {
	changeName: async ({ request, locals: { supabase, getSession } }) => {
		const changeNameForm = await superValidate(request, changeNameSchema);
		const session = await getSession();

		// DEMO
	},
	changeEmail: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession();
		const { newEmail } = Object.fromEntries(await request.formData());

		// DEMO
	},
	changePassword: async ({ request, locals: { supabase, getSession } }) => {
		const changePasswordForm = await superValidate(
			request,
			changePasswordSchema
		);

		// DEMO
	},
	destroyHouse: async ({ request, locals: { supabase, getSession } }) => {
		const { words } = Object.fromEntries(await request.formData());

		if (words === wordsForDestroy) {
			throw redirect(303, "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
		} else {
			return fail(409);
		}
	},
};
