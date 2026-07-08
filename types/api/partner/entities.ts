import { z } from "zod";

import {
	EntityComplexSearchRequestSchema,
	EntityComplexSearchResponseSchema,
	EntityCreateRequestSchema,
	EntitySimpleComplexSearchResponseSchema,
	EntityResponseSchema,
	EntityUpdateRequestSchema,
} from "@/schemas/api";
import type { PageResponse } from "@/types/api";

export type EntitySimpleComplexSearchResponse = z.infer<
	typeof EntitySimpleComplexSearchResponseSchema
>;
export type EntityResponse = z.infer<typeof EntityResponseSchema>;
export type EntityComplexSearchRequest = z.infer<
	typeof EntityComplexSearchRequestSchema
>;
export type EntityComplexSearchResponse = PageResponse<
	z.infer<typeof EntityComplexSearchResponseSchema>
>;
export type EntityCreateRequest = z.infer<typeof EntityCreateRequestSchema>;
export type EntityUpdateRequest = z.infer<typeof EntityUpdateRequestSchema>;
