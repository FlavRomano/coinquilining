import { redirect } from "@sveltejs/kit";

export const load = async ({ locals, fetch }) => {
	const session = await locals.getSession();
	if (!session) {
		throw redirect(303, "/register");
	}

	const house_id = session.user.user_metadata.house_id;

	let response = await fetch(`/api/fridge?house_id=${house_id}`);

	const fridge = await response.json();

	response = await fetch(`/api/pantry?house_id=${house_id}`);

	const pantry = await response.json();

	response = await fetch(`/api/roommates?house_id=${house_id}`);

	const roommates = await response.json();

	return {
		fridge,
		pantry,
		roommates,
	};
};
