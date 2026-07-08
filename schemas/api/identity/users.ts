import { z } from "zod";

/*
 * Forced exception: this frozen API schema avoids the root schemas barrel to
 * break a build-time initialization cycle during Next.js SSR collection.
 */
import { AuditInfoResponseSchema } from "../shared/shared";

export const UserResponseSchema = z.object({
	id: z.string(),
	cpf: z.string(),
	cpfFormatted: z.string(),
	name: z.string(),
	auditInfo: AuditInfoResponseSchema,
});

export const UserSimpleComplexSearchResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
});

export const UserComplexSearchRequestSchema = z.object({
	cpf: z.string().optional(),
	dateFrom: z.iso.datetime({ offset: true }).optional(),
	dateTo: z.iso.datetime({ offset: true }).optional(),
	name: z.string().optional(),
});
