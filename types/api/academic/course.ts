import { z } from "zod";

import {
	CourseCreateRequestSchema,
	CourseResponseSchema,
	CourseUpdateRequestSchema,
} from "@/schemas/api/academic/course";

// ─── Responses ───────────────────────────────────────────────────────────────

export type CourseResponse = z.infer<typeof CourseResponseSchema>;

// ─── Requests ────────────────────────────────────────────────────────────────

export type CourseCreateRequest = z.infer<typeof CourseCreateRequestSchema>;
export type CourseUpdateRequest = z.infer<typeof CourseUpdateRequestSchema>;
