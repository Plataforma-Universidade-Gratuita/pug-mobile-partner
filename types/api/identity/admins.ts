import { z } from "zod";

import {
	AdminComplexSearchRequestSchema,
	AdminComplexSearchResponseSchema,
	AdminCreateRequestSchema,
	AdminResponseSchema,
	AdminSearchResponseSchema,
	AdminUpdateRequestSchema,
} from "@/schemas/api";
import type { PageResponse } from "@/types/api";

export type AdminResponse = z.infer<typeof AdminResponseSchema>;
export type AdminSearchResponse = z.infer<typeof AdminSearchResponseSchema>;
export type AdminComplexSearchItemResponse = z.infer<
	typeof AdminComplexSearchResponseSchema
>;
export type AdminComplexSearchRequest = z.infer<
	typeof AdminComplexSearchRequestSchema
>;
export type AdminCreateRequest = z.infer<typeof AdminCreateRequestSchema>;
export type AdminUpdateRequest = z.infer<typeof AdminUpdateRequestSchema>;
export type AdminComplexSearchResponse =
	PageResponse<AdminComplexSearchItemResponse>;
