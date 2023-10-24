import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, fetch }) => {
	const session = await locals.getSession();

	if (!session) {
		throw redirect(303, "/register");
	}

	const house_id = session.user.user_metadata.house_id;

	const roommates = await (async () => {
		const response = await fetch(
			`/api/house/roommates?house_id=${house_id}`
		);
		if (response.ok) return await response.json();
	})();

	return { house_id, roommates };
};
