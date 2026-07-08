import { z } from "zod";

/*
 * Forced exception: this frozen API schema avoids the root schemas barrel to
 * break a build-time initialization cycle during Next.js SSR collection.
 */
import { AuditInfoResponseSchema } from "../shared/shared";

export const AreaOfExpertiseComplexSearchRequestSchema = z.object({
	name: z.string().optional(),
});

export const AreaOfExpertiseCreateRequestSchema = z.object({
	name: z.string(),
});

export const AreaOfExpertiseUpdateRequestSchema = z.object({
	name: z.string(),
});

export const AreaOfExpertiseResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	auditInfo: AuditInfoResponseSchema,
});

export const AreaOfExpertiseComplexSearchResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
});
