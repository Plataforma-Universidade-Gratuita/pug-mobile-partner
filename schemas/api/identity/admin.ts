import { z } from "zod";

import { AccountResponseSchema } from "@/schemas/api/identity/account";
import { CampiEnum, CampusResponseSchema } from "@/schemas/api/shared/shared";

// ─── Responses ───────────────────────────────────────────────────────────────

export const AdminResponseSchema = z.object({
	accountResponse: AccountResponseSchema,
	campus: CampusResponseSchema,
	grantedAt: z.string(),
	grantedAtFormatted: z.string(),
});

// ─── Requests ────────────────────────────────────────────────────────────────

export const AdminCreateRequestSchema = z.object({
	cpf: z.string(),
	name: z.string(),
	email: z.string(),
	password: z.string(),
	campus: CampiEnum,
});

export const AdminUpdateRequestSchema = z.object({
	name: z.string().nullable().optional(),
	email: z.string().nullable().optional(),
	password: z.string().nullable().optional(),
	campus: CampiEnum.nullable().optional(),
	active: z.boolean().nullable().optional(),
});
