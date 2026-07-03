/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { z } from "zod";

import {
	AreaOfExpertiseComplexSearchRequestSchema,
	AreaOfExpertiseComplexSearchResponseSchema,
	AreaOfExpertiseCreateRequestSchema,
	AreaOfExpertiseResponseSchema,
	AreaOfExpertiseUpdateRequestSchema,
} from "@/schemas/api";
import type { PageResponse } from "@/types/api";

export type AreaOfExpertiseResponse = z.infer<
	typeof AreaOfExpertiseResponseSchema
>;
export type AreaOfExpertiseComplexSearchRequest = z.infer<
	typeof AreaOfExpertiseComplexSearchRequestSchema
>;
export type AreaOfExpertiseComplexSearchItemResponse = z.infer<
	typeof AreaOfExpertiseComplexSearchResponseSchema
>;
export type AreaOfExpertiseCreateRequest = z.infer<
	typeof AreaOfExpertiseCreateRequestSchema
>;
export type AreaOfExpertiseUpdateRequest = z.infer<
	typeof AreaOfExpertiseUpdateRequestSchema
>;
export type AreaOfExpertiseComplexSearchResponse =
	PageResponse<AreaOfExpertiseComplexSearchItemResponse>;
