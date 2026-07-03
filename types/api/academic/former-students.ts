/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { z } from "zod";

import {
	CounterpartHoursResponseSchema,
	FormerStudentComplexSearchRequestSchema,
	FormerStudentComplexSearchResponseSchema,
	FormerStudentCreateRequestSchema,
	FormerStudentResponseSchema,
	FormerStudentSimpleComplexSearchResponseSchema,
	FormerStudentUpdateRequestSchema,
	PeriodResponseSchema,
} from "@/schemas/api";
import type { PageResponse } from "@/types/api";

export type CounterpartHoursResponse = z.infer<
	typeof CounterpartHoursResponseSchema
>;
export type PeriodResponse = z.infer<typeof PeriodResponseSchema>;
export type FormerStudentCreateRequest = z.infer<
	typeof FormerStudentCreateRequestSchema
>;
export type FormerStudentUpdateRequest = z.infer<
	typeof FormerStudentUpdateRequestSchema
>;
export type FormerStudentResponse = z.infer<typeof FormerStudentResponseSchema>;
export type FormerStudentSimpleComplexSearchResponse = z.infer<
	typeof FormerStudentSimpleComplexSearchResponseSchema
>;
export type FormerStudentComplexSearchRequest = z.infer<
	typeof FormerStudentComplexSearchRequestSchema
>;
export type FormerStudentComplexSearchItemResponse = z.infer<
	typeof FormerStudentComplexSearchResponseSchema
>;
export type FormerStudentComplexSearchResponse =
	PageResponse<FormerStudentComplexSearchItemResponse>;
