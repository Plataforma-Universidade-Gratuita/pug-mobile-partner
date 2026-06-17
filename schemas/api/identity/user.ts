import { z } from "zod";

import { AuditInfoResponseSchema } from "@/schemas/api/shared/shared";

// ─── Responses ───────────────────────────────────────────────────────────────

export const UserResponseSchema = z.object({
	id: z.string(),
	cpf: z.string(),
	cpfFormatted: z.string(),
	name: z.string(),
	auditInfo: AuditInfoResponseSchema,
});
