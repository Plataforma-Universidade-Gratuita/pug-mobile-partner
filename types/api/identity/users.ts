/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
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
