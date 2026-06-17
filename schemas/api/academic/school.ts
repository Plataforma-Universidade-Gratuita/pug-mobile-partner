import { z } from "zod";

import { AuditInfoResponseSchema } from "@/schemas/api/shared/shared";

// ─── Responses ───────────────────────────────────────────────────────────────

export const SchoolResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	auditInfo: AuditInfoResponseSchema,
});

// ─── Requests ────────────────────────────────────────────────────────────────

export const SchoolCreateRequestSchema = z.object({
	name: z.string(),
});

export const SchoolUpdateRequestSchema = z.object({
	name: z.string().nullable().optional(),
});
