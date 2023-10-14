import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, "/register");
	}

	const { data: roommates, error: errno0 } = await locals.supabase
		.from("users")
		.select("id, firstname, lastname, balance")
		.eq("house_id", session.user.user_metadata.house_id);

	const userId = session.user.id;

	if (errno0) {
		console.log(errno0);
		return fail(500, { message: errno0.message });
	}

	return { userId, roommates };
};

export const actions: Actions = {
	addOutgoing: async ({ request, fetch }) => {
		const {
			title: item_name,
			from,
			price,
			...splitWith
		} = Object.fromEntries(await request.formData());

		await fetch(
			`/api/receipts?title=${item_name}&price=${price}&from=${from}&splitWith=${[
				...Object.values(splitWith),
			]}`,
			{ method: "POST" }
		);
	},
	addPayment: async ({ request, locals }) => {
		const {
			amount: paymentAmount,
			from,
			to,
		} = Object.fromEntries(await request.formData());

		const { data: oldAmount, error: errno0 } = await locals.supabase
			.from("users")
			.select("amount")
			.eq("id", to)
			.single();

		if (errno0) {
			console.log(errno0);
			return fail(500, { errno0 });
		}

		const { error: errno1 } = await locals.supabase
			.from("payments")
			.insert({ from, amount: paymentAmount, to });

		if (errno1) {
			console.log(errno1);
			return fail(500, { errno1 });
		}

		const newAmount = oldAmount.amount + paymentAmount;

		const { error: errno2 } = await locals.supabase
			.from("users")
			.update({ amount: newAmount });

		if (errno2) {
			console.log(errno2);
			return fail(500, { errno2 });
		}
	},
};
