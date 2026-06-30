import { z } from "zod";

import {
	StaffComplexSearchRequestSchema,
	StaffComplexSearchResponseSchema,
	StaffCreateRequestSchema,
	StaffResponseSchema,
	StaffUpdateRequestSchema,
} from "@/schemas/api";
import type { PageResponse } from "@/types/api";

export type StaffResponse = z.infer<typeof StaffResponseSchema>;
export type StaffComplexSearchRequest = z.infer<
	typeof StaffComplexSearchRequestSchema
>;
export type StaffSearchResponse = z.infer<
	typeof StaffComplexSearchResponseSchema
>;
export type StaffComplexSearchResponse = PageResponse<StaffSearchResponse>;
export type StaffCreateRequest = z.infer<typeof StaffCreateRequestSchema>;
export type StaffUpdateRequest = z.infer<typeof StaffUpdateRequestSchema>;
