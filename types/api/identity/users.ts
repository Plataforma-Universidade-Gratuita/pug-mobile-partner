import { z } from "zod";

import {
	UserComplexSearchRequestSchema,
	UserResponseSchema,
	UserSimpleComplexSearchResponseSchema,
} from "@/schemas/api";
import type { PageResponse } from "@/types/api";

export type UserResponse = z.infer<typeof UserResponseSchema>;

export type UserSimpleComplexSearchResponse = z.infer<
	typeof UserSimpleComplexSearchResponseSchema
>;

export type UserComplexSearchRequest = z.infer<
	typeof UserComplexSearchRequestSchema
>;
export type UserComplexSearchResponse = PageResponse<UserResponse>;
