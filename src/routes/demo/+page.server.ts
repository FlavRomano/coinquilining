import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, url }) => {
	throw redirect(303, "/demo/house/dashboard");
};
