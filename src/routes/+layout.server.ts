import type { User } from "$lib/schemas";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({
	locals: { getSession, supabase },
}) => {
	const session = await getSession();
	const user: User | null = session
		? (
				await supabase
					.from("users")
					.select()
					.eq("id", session.user.id)
					.single()
		  ).data
		: null;

	return {
		session,
		user,
	};
};
