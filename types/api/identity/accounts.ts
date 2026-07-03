/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { z } from "zod";

import {
	AccountComplexSearchRequestSchema,
	AccountComplexSearchResponseSchema,
	AccountResponseSchema,
	AccountSimpleComplexSearchResponseSchema,
	AccountSearchResponseSchema,
} from "@/schemas/api";
import type { PageResponse } from "@/types/api";

export type AccountResponse = z.infer<typeof AccountResponseSchema>;
export type AccountSimpleComplexSearchResponse = z.infer<
	typeof AccountSimpleComplexSearchResponseSchema
>;
export type AccountComplexSearchItemResponse = z.infer<
	typeof AccountComplexSearchResponseSchema
>;
export type AccountSearchResponse = z.infer<typeof AccountSearchResponseSchema>;
export type AccountComplexSearchRequest = z.infer<
	typeof AccountComplexSearchRequestSchema
>;
export type AccountComplexSearchResponse =
	PageResponse<AccountComplexSearchItemResponse>;
