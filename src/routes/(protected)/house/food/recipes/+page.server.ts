import { redirect } from "@sveltejs/kit";

export const load = async ({ locals, fetch }) => {
	const session = await locals.getSession();
	if (!session) {
		throw redirect(303, "/register");
	}

	const house_id = session.user.user_metadata.house_id;

	const fridge = (async () => {
		let response = await fetch(`/api/fridge?house_id=${house_id}`);
		if (response.ok) return await response.json();
	})();

	const pantry = (async () => {
		let response = await fetch(`/api/pantry?house_id=${house_id}`);
		if (response.ok) return await response.json();
	})();

	const roommates = (async () => {
		let response = await fetch(`/api/house/roommates?house_id=${house_id}`);
		if (response.ok) return await response.json();
	})();

	return {
		fridge,
		pantry,
		roommates,
	};
};
