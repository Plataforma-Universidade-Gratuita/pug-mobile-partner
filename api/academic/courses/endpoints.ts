/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { z } from "zod";

import { API_ROUTE_BASES } from "@/api/constants";
import { authFetch, authVoid, qs } from "@/api/utils";
import {
	CourseComplexSearchRequestSchema,
	CourseCreateRequestSchema,
	CourseResponseSchema,
	CourseUpdateRequestSchema,
	CourseWithAuditInfoComplexSearchResponseSchema,
	createPageResponseSchema,
} from "@/schemas/api";
import type {
	CourseComplexSearchRequest,
	CourseComplexSearchResponse,
	CourseCreateRequest,
	CourseResponse,
	CourseUpdateRequest,
	PaginationRequest,
} from "@/types/api";

export async function get(id: string): Promise<CourseResponse> {
	return authFetch(
		`${API_ROUTE_BASES.academic.courses}/${id}`,
		CourseResponseSchema,
	);
}

export async function list(ids?: string[]): Promise<CourseResponse[]> {
	return authFetch(
		`${API_ROUTE_BASES.academic.courses}${qs({
			ids,
		})}`,
		z.array(CourseResponseSchema),
	);
}

export async function search(
	pagination: PaginationRequest,
	body: CourseComplexSearchRequest,
): Promise<CourseComplexSearchResponse> {
	return authFetch(
		`${API_ROUTE_BASES.academic.courses}/search${qs({
			page: String(pagination.page),
			size: String(pagination.size),
		})}`,
		createPageResponseSchema(CourseWithAuditInfoComplexSearchResponseSchema),
		{
			method: "POST",
			body: JSON.stringify(CourseComplexSearchRequestSchema.parse(body)),
		},
	);
}

export async function create(
	body: CourseCreateRequest,
): Promise<CourseResponse> {
	return authFetch(
		`${API_ROUTE_BASES.academic.courses}`,
		CourseResponseSchema,
		{
			method: "POST",
			body: JSON.stringify(CourseCreateRequestSchema.parse(body)),
		},
	);
}

export async function update(
	id: string,
	body: CourseUpdateRequest,
): Promise<CourseResponse> {
	return authFetch(
		`${API_ROUTE_BASES.academic.courses}/${id}`,
		CourseResponseSchema,
		{
			method: "PUT",
			body: JSON.stringify(CourseUpdateRequestSchema.parse(body)),
		},
	);
}

export async function remove(id: string): Promise<void> {
	return authVoid(`${API_ROUTE_BASES.academic.courses}/${id}`, {
		method: "DELETE",
	});
}
