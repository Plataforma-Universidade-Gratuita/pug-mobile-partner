/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { z } from "zod";

import {
	AttendanceComplexSearchRequestSchema,
	AttendanceComplexSearchResponseSchema,
	AttendanceCreateRequestSchema,
	AttendanceResponseSchema,
	AttendanceStatusEnum,
	AttendanceValidateRequestSchema,
} from "@/schemas/api";
import type { PageResponse } from "@/types/api";

export type AttendanceStatus = z.infer<typeof AttendanceStatusEnum>;
export type AttendanceResponse = z.infer<typeof AttendanceResponseSchema>;
export type AttendanceComplexSearchRequest = z.infer<
	typeof AttendanceComplexSearchRequestSchema
>;
export type AttendanceComplexSearchItem = z.infer<
	typeof AttendanceComplexSearchResponseSchema
>;
export type AttendanceComplexSearchResponse =
	PageResponse<AttendanceComplexSearchItem>;
export type AttendanceCreateRequest = z.infer<
	typeof AttendanceCreateRequestSchema
>;
export type AttendanceValidateRequest = z.infer<
	typeof AttendanceValidateRequestSchema
>;
