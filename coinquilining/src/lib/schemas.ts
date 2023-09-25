import { z } from "zod";

export const user = z.object({
	email: z.string().email({
		message: "Invalid email",
	}),

	password: z.string().trim().min(6, { message: "Password too short" }),

	firstname: z
		.string()
		.trim()
		.min(3, { message: "Firstname too short" })
		.max(20, { message: "Firstname too long" })
		.regex(/^[A-Za-z]{1,}$/, {
			message: "Firstname must contain only letters",
		}),

	lastname: z
		.string()
		.trim()
		.min(3, { message: "Lastname too short" })
		.max(20, { message: "Lastname too long" })
		.regex(/^[A-Za-z]{1,}$/, {
			message: "Lastname must contain only letters",
		}),

	houseId: z.string(),
});

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export const houseSchema = z.object({
	name: z
		.string()
		.min(3, { message: "Name too short" })
		.max(64, { message: "Name too long" })
		.trim(),

	code: z
		.string()
		.min(9, { message: "Code too short" })
		.max(9, { message: "Code too long" }),

	enteringExistingHouse: z.boolean(),
});

export type User = {
	email: string;
	firstname: string;
	lastname: string;
	house_id: string;
};
