import { fail, json } from "@sveltejs/kit";

export async function POST({ url, locals }) {
	const session = await locals.getSession();

	if (!session) {
		return json("INVALID REQUEST");
	}

	const title = url.searchParams.get("title");
	const price = parseFloat(url.searchParams.get("price"));
	const from = url.searchParams.get("from");
	let splitWith =
		url.searchParams.get("splitWith") === ""
			? []
			: [...new Array(url.searchParams.get("splitWith"))];
	const house_id = session.user.user_metadata.house_id;

	if (splitWith.length > 0) {
		const { data: receipt, error: errno0 } = await locals.supabase
			.from("receipts")
			.upsert({
				item_name: title,
				house_id,
				price,
				from,
				splitWith,
			})
			.select();

		if (errno0) {
			console.log(errno0);
			return json(fail(500, { errno0 }));
		}

		const priceToPay = Number(price) / (splitWith.length + 1);

		for (let userId of splitWith) {
			let { data: oldBalance, error: errno1 } = await locals.supabase
				.from("users")
				.select("balance")
				.eq("id", userId)
				.single();

			if (errno1) {
				console.log(errno1);
				return json(fail(500, { errno1 }));
			}

			let newBalance = oldBalance.balance - priceToPay;

			let { error: errno2 } = await locals.supabase
				.from("users")
				.update({ balance: newBalance })
				.eq("id", userId);

			if (errno2) {
				console.log(errno2);
				return json(fail(500, { errno2 }));
			}
		}

		let { data: oldBalance, error: errno3 } = await locals.supabase
			.from("users")
			.select("balance")
			.eq("id", from)
			.single();

		if (errno3) {
			console.log(errno3);
			return json(fail(500, { errno3 }));
		}

		let newBalance = oldBalance.balance + priceToPay;

		let { error: errno4 } = await locals.supabase
			.from("users")
			.update({ balance: newBalance })
			.eq("id", from);

		if (errno4) {
			console.log(errno4);
			return json(fail(500, { errno4 }));
		}
		return json(receipt);
	} else {
		const { data: receipt, error: errno0 } = await locals.supabase
			.from("receipts")
			.upsert({
				item_name: title,
				house_id,
				price,
				from,
			})
			.select();

		if (errno0) {
			console.log(errno0);
			return json(fail(500, { errno0 }));
		}
		return json(receipt);
	}
}

export async function DELETE({ url, locals }) {
	const id = url.searchParams.get("id");

	const {
		data: { price, from, splitWith },
		error: errno0,
	} = await locals.supabase.from("receipts").select().eq("id", id).single();

	if (errno0) {
		console.log(errno0);
		return json(fail(500, { errno0 }));
	}

	const { error: errno1 } = await locals.supabase
		.from("receipts")
		.delete()
		.eq("id", id);

	if (errno1) {
		console.log(errno1);
		return json(fail(500, { errno1 }));
	}

	if (splitWith !== null && splitWith.length > 0) {
		const priceToRestore = Number(price) / (splitWith.length + 1);

		for (let userId of splitWith) {
			let { data: oldBalance, error: errno1 } = await locals.supabase
				.from("users")
				.select("balance")
				.eq("id", userId)
				.single();

			if (errno1) {
				console.log(errno1);
				return json(fail(500, { errno1 }));
			}

			let newBalance = oldBalance.balance + priceToRestore;

			let { error: errno2 } = await locals.supabase
				.from("users")
				.update({ balance: newBalance })
				.eq("id", userId);

			if (errno2) {
				console.log(errno2);
				return json(fail(500, { errno2 }));
			}
		}

		let { data: oldBalance, error: errno3 } = await locals.supabase
			.from("users")
			.select("balance")
			.eq("id", from)
			.single();

		if (errno3) {
			console.log(errno3);
			return json(fail(500, { errno3 }));
		}

		let newBalance = oldBalance.balance - priceToRestore;

		let { error: errno4 } = await locals.supabase
			.from("users")
			.update({ balance: newBalance })
			.eq("id", from);

		if (errno4) {
			console.log(errno4);
			return json(fail(500, { errno4 }));
		}
	}
	return json({ code: 204 });
}
