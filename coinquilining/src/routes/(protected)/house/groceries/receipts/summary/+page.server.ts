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
	addOutgoing: async ({ request, locals }) => {
		let data = Object.fromEntries(await request.formData());

		let splitWith = [];
		for (let key in data) {
			if (key.includes("split")) {
				splitWith = [...splitWith, data[key]];
			}
		}
		const { from, title, price } = data;
		const house_id = (await locals.getSession()).user.user_metadata
			.house_id;

		const { data: receipts, error: errno0 } = await locals.supabase
			.from("receipts")
			.insert({
				item_name: title,
				house_id,
				price,
				from,
				splitWith,
			})
			.select();

		if (errno0) {
			console.log(errno0);
			return fail(500, { errno0 });
		}

		if (splitWith.length > 0) {
			const priceToPay = Number(price) / splitWith.length;
			console.log(priceToPay);

			for (let userId of splitWith) {
				let { data: oldBalance, error: errno1 } = await locals.supabase
					.from("users")
					.select("balance")
					.eq("id", userId)
					.single();

				if (errno1) {
					console.log(errno1);
					return fail(500, { errno1 });
				}

				let newBalance = oldBalance.balance - priceToPay;

				let { error: errno2 } = await locals.supabase
					.from("users")
					.update({ balance: newBalance })
					.eq("id", userId);

				if (errno2) {
					console.log(errno2);
					return fail(500, { errno2 });
				}
			}

			let { data: oldBalance, error: errno3 } = await locals.supabase
				.from("users")
				.select("balance")
				.eq("id", from)
				.single();

			if (errno3) {
				console.log(errno3);
				return fail(500, { errno3 });
			}

			let newBalance = oldBalance.balance + priceToPay;

			let { error: errno4 } = await locals.supabase
				.from("users")
				.update({ balance: newBalance })
				.eq("id", from);

			if (errno4) {
				console.log(errno4);
				return fail(500, { errno4 });
			}
		}
	},
	addPayment: async ({ request, locals }) => {},
};
