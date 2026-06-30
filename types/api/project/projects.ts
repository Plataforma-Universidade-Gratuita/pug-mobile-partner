import { z } from "zod";

import {
	ProjectAreaOfExpertiseRequestSchema,
	ProjectComplexSearchRequestSchema,
	ProjectComplexSearchResponseSchema,
	ProjectCreateRequestSchema,
	ProjectResponseSchema,
	ProjectSimpleComplexSearchResponseSchema,
	ProjectStatusEnum,
	ProjectUpdateRequestSchema,
} from "@/schemas/api";
import type { PageResponse } from "@/types/api";

export type ProjectStatus = z.infer<typeof ProjectStatusEnum>;
export type ProjectSimpleComplexSearchResponse = z.infer<
	typeof ProjectSimpleComplexSearchResponseSchema
>;
export type ProjectResponse = z.infer<typeof ProjectResponseSchema>;
export type ProjectComplexSearchRequest = z.infer<
	typeof ProjectComplexSearchRequestSchema
>;
export type ProjectComplexSearchResponse = PageResponse<
	z.infer<typeof ProjectComplexSearchResponseSchema>
>;
export type ProjectCreateRequest = z.infer<typeof ProjectCreateRequestSchema>;
export type ProjectUpdateRequest = z.infer<typeof ProjectUpdateRequestSchema>;
export type ProjectAreaOfExpertiseRequest = z.infer<
	typeof ProjectAreaOfExpertiseRequestSchema
>;
