import { z } from "zod";

import { AuditInfoResponseSchema } from "@/schemas/api/shared/shared";

// ─── Responses ───────────────────────────────────────────────────────────────

export const EntityResponseSchema = z.object({
	id: z.string(),
	cnpj: z.string(),
	cnpjFormatted: z.string(),
	name: z.string(),
	address: z.string(),
	cityId: z.string(),
	auditInfo: AuditInfoResponseSchema,
});

// ─── Requests ────────────────────────────────────────────────────────────────

export const EntityCreateRequestSchema = z.object({
	cnpj: z.string(),
	name: z.string(),
	cityId: z.string(),
	address: z.string().nullable().optional(),
});

export const EntityUpdateRequestSchema = z.object({
	name: z.string().nullable().optional(),
	cityId: z.string().nullable().optional(),
	address: z.string().nullable().optional(),
});
