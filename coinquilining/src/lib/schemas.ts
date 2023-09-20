import { z } from "zod";

export const user = z.object({
	email: z.string().email({
		message: "Invalid email",
	}),

	password: z.string().trim().min(6, { message: "Password too short" }),

	name: z
		.string()
		.trim()
		.min(3, { message: "Name too short" })
		.max(20, { message: "Name too long" })
		.regex(/^[A-Za-z]{1,}$/, {
			message: "Name must contain only letters",
		}),

	surname: z
		.string()
		.trim()
		.min(3, { message: "Surname too short" })
		.max(20, { message: "Surname too long" })
		.regex(/^[A-Za-z]{1,}$/, {
			message: "Surname must contain only letters",
		}),
});

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export const house = z.object({
	name: z.string().min(3),
	mates: z.array(
		z.object({
			email: z.string().email(),
		})
	),
});
