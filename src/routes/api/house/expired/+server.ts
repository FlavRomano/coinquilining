import type { Food } from "$types/lib/server/db/types.js";
import { json } from "@sveltejs/kit";

export async function GET({ url, locals }) {
	const currentDate = new Date();
	const house_id = url.searchParams.get("house_id");

	if (house_id === null) {
		return new Response(null, { status: 400 });
	}

	const { data: fridge, error: errno0 } = await locals.supabase
		.from("fridge")
		.select()
		.eq("house_id", house_id);

	if (errno0) {
		return new Response(null, { status: 500, statusText: errno0.message });
	}

	const { data: pantry, error: errno1 } = await locals.supabase
		.from("pantry")
		.select()
		.eq("house_id", house_id);

	if (errno1) {
		return new Response(null, { status: 500, statusText: errno1.message });
	}

	const fridgeExpired = fridge.filter(
		(food) => new Date(food.expiration) <= currentDate
	);

	for (let food of fridgeExpired) {
		const { error: errno2 } = await locals.supabase
			.from("fridge")
			.update({ ...food, is_expired: true })
			.eq("id", food.id);

		if (errno2)
			return new Response(null, {
				status: 500,
				statusText: errno2.message,
			});
	}

	const pantryExpired = pantry.filter(
		(food) => new Date(food.expiration) <= currentDate
	);

	for (let food of pantryExpired) {
		const { error: errno2 } = await locals.supabase
			.from("pantry")
			.update({ ...food, is_expired: true })
			.eq("id", food.id);

		if (errno2)
			return new Response(null, {
				status: 500,
				statusText: errno2.message,
			});
	}

	const expiredFoods = [
		...fridgeExpired.map((food) => ({ where: "fridge", ...food })),
		...pantryExpired.map((food) => ({ where: "pantry", ...food })),
	];
	expiredFoods.sort((food1, food2) => {
		return Date.parse(food1.expiration) - Date.parse(food2.expiration);
	});

	return json(expiredFoods, { status: 200 });
}
