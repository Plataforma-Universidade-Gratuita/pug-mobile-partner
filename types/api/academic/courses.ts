import { z } from "zod";

import {
	CourseComplexSearchRequestSchema,
	CourseComplexSearchResponseSchema,
	CourseCreateRequestSchema,
	CourseResponseSchema,
	CourseUpdateRequestSchema,
	CourseWithAuditInfoComplexSearchResponseSchema,
} from "@/schemas/api";
import type { PageResponse } from "@/types/api";

export type CourseResponse = z.infer<typeof CourseResponseSchema>;
export type CourseComplexSearchRequest = z.infer<
	typeof CourseComplexSearchRequestSchema
>;
export type CourseComplexSearchItemResponse = z.infer<
	typeof CourseComplexSearchResponseSchema
>;
export type CourseWithAuditInfoComplexSearchResponse = z.infer<
	typeof CourseWithAuditInfoComplexSearchResponseSchema
>;
export type CourseCreateRequest = z.infer<typeof CourseCreateRequestSchema>;
export type CourseUpdateRequest = z.infer<typeof CourseUpdateRequestSchema>;
export type CourseComplexSearchResponse =
	PageResponse<CourseWithAuditInfoComplexSearchResponse>;
