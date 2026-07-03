/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { z } from "zod";

import {
	CityComplexSearchRequestSchema,
	CityResponseSchema,
} from "@/schemas/api";
import type { PageResponse } from "@/types/api";

// ─── Responses ───────────────────────────────────────────────────────────────

export type CityResponse = z.infer<typeof CityResponseSchema>;
export type CityComplexSearchRequest = z.infer<
	typeof CityComplexSearchRequestSchema
>;
export type CityComplexSearchResponse = PageResponse<CityResponse>;
