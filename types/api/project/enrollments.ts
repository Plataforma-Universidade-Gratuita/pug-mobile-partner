/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { z } from "zod";

import {
	EnrollmentComplexSearchRequestSchema,
	EnrollmentComplexSearchResponseSchema,
	EnrollmentCreateRequestSchema,
	EnrollmentResponseSchema,
	EnrollmentStatusEnum,
	EnrollmentUpdateStatusRequestSchema,
} from "@/schemas/api";
import type { PageResponse } from "@/types/api";

export type EnrollmentStatus = z.infer<typeof EnrollmentStatusEnum>;
export type EnrollmentResponse = z.infer<typeof EnrollmentResponseSchema>;
export type EnrollmentComplexSearchRequest = z.infer<
	typeof EnrollmentComplexSearchRequestSchema
>;
export type EnrollmentComplexSearchResponse = PageResponse<
	z.infer<typeof EnrollmentComplexSearchResponseSchema>
>;
export type EnrollmentCreateRequest = z.infer<
	typeof EnrollmentCreateRequestSchema
>;
export type EnrollmentUpdateStatusRequest = z.infer<
	typeof EnrollmentUpdateStatusRequestSchema
>;
