import { z } from "zod";

import { SchoolResponseSchema } from "@/schemas/api/academic/school";
import { AuditInfoResponseSchema } from "@/schemas/api/shared/shared";

// ─── Responses ───────────────────────────────────────────────────────────────

export const CourseResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	school: SchoolResponseSchema,
	auditInfo: AuditInfoResponseSchema,
});

// ─── Requests ────────────────────────────────────────────────────────────────

export const CourseCreateRequestSchema = z.object({
	name: z.string(),
	schoolId: z.string(),
});

export const CourseUpdateRequestSchema = z.object({
	name: z.string().nullable().optional(),
	schoolId: z.string().nullable().optional(),
});
