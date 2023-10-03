import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../../$types";
import { superValidate } from "sveltekit-superforms/server";
import { changeNameSchema } from "$types/lib/schemas";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, "/register");
	}

	const { data: user, error } = await locals.supabase
		.from("users")
		.select("firstname, lastname, email")
		.eq("id", session.user.id)
		.single();

	const changeNameForm = await superValidate(changeNameSchema);

	return { user, changeNameForm };
};

export const actions: Actions = {
	changeName: async ({
		request,
		cookies,
		locals: { supabase, getSession },
	}) => {
		const changeNameForm = await superValidate(request, changeNameSchema);

		if (!changeNameForm.valid) {
			return fail(400, { changeNameForm });
		}

		const { error } = await supabase
			.from("users")
			.update({
				firstname: changeNameForm.data.firstname,
				lastname: changeNameForm.data.lastname,
			})
			.eq("id", (await getSession()).user.id);

		if (error) {
			return fail(400, { error });
		}
	},
};
