// See https://kit.svelte.dev/docs/types#app
import { SupabaseClient, Session } from "@supabase/supabase-js";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			getSession(): Promise<Session | null>;
            user: User
		} // interface PageData {}
		// interface Platform {}
	}
}

export {};
