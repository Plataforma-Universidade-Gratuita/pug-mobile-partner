import { z } from "zod";

import { AccountResponseSchema } from "@/schemas/api/identity/account";

// ─── Responses ───────────────────────────────────────────────────────────────

export const StaffResponseSchema = z.object({
	account: AccountResponseSchema,
	entityId: z.string(),
	cityId: z.string(),
});

// ─── Requests ────────────────────────────────────────────────────────────────

export const StaffCreateRequestSchema = z.object({
	cpf: z.string(),
	name: z.string(),
	email: z.string(),
	password: z.string(),
	entityId: z.string(),
});

export const StaffUpdateRequestSchema = z.object({
	name: z.string().nullable().optional(),
	email: z.string().nullable().optional(),
	password: z.string().nullable().optional(),
	active: z.boolean().nullable().optional(),
});
