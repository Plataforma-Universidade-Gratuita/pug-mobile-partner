import { z } from "zod";

import { AuditInfoResponseSchema } from "../shared/shared";
/*
 * Forced exception: this frozen API schema avoids the root schemas barrel to
 * break a build-time initialization cycle during Next.js SSR collection.
 */
import {
	AreaOfExpertiseComplexSearchResponseSchema,
	AreaOfExpertiseResponseSchema,
} from "./areas-of-expertise";

export const CourseComplexSearchRequestSchema = z.object({
	name: z.string().optional(),
	areaOfExpertiseIds: z.array(z.string()).optional(),
});

export const CourseComplexSearchResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	areaOfExpertise: AreaOfExpertiseComplexSearchResponseSchema,
});

export const CourseWithAuditInfoComplexSearchResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	areaOfExpertise: AreaOfExpertiseComplexSearchResponseSchema,
	auditInfo: AuditInfoResponseSchema,
});

export const CourseResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	areaOfExpertise: AreaOfExpertiseResponseSchema,
	auditInfo: AuditInfoResponseSchema,
});

export const CourseCreateRequestSchema = z.object({
	name: z.string(),
	areaOfExpertiseId: z.string(),
});

export const CourseUpdateRequestSchema = z.object({
	name: z.string(),
	areaOfExpertiseId: z.string(),
});
