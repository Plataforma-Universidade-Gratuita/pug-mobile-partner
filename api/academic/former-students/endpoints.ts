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
	AccountStatusRequestSchema,
	createPageResponseSchema,
	FormerStudentComplexSearchRequestSchema,
	FormerStudentComplexSearchResponseSchema,
	FormerStudentCreateRequestSchema,
	FormerStudentResponseSchema,
	FormerStudentUpdateRequestSchema,
} from "@/schemas/api";
import type {
	FormerStudentComplexSearchRequest,
	FormerStudentComplexSearchResponse,
	FormerStudentCreateRequest,
	FormerStudentResponse,
	FormerStudentUpdateRequest,
	PaginationRequest,
} from "@/types/api";

export async function get(id: string): Promise<FormerStudentResponse> {
	return authFetch(
		`${API_ROUTE_BASES.academic.formerStudents}/${id}`,
		FormerStudentResponseSchema,
	);
}

export async function getMe(): Promise<FormerStudentResponse> {
	return authFetch(
		`${API_ROUTE_BASES.academic.formerStudents}/me`,
		FormerStudentResponseSchema,
	);
}

export async function list(ids?: string[]): Promise<FormerStudentResponse[]> {
	return authFetch(
		`${API_ROUTE_BASES.academic.formerStudents}${qs({
			ids,
		})}`,
		z.array(FormerStudentResponseSchema),
	);
}

export async function search(
	pagination: PaginationRequest,
	body: FormerStudentComplexSearchRequest,
): Promise<FormerStudentComplexSearchResponse> {
	return authFetch(
		`${API_ROUTE_BASES.academic.formerStudents}/search${qs({
			page: String(pagination.page),
			size: String(pagination.size),
		})}`,
		createPageResponseSchema(FormerStudentComplexSearchResponseSchema),
		{
			method: "POST",
			body: JSON.stringify(FormerStudentComplexSearchRequestSchema.parse(body)),
		},
	);
}

export async function create(
	body: FormerStudentCreateRequest,
): Promise<FormerStudentResponse> {
	return authFetch(
		`${API_ROUTE_BASES.academic.formerStudents}`,
		FormerStudentResponseSchema,
		{
			method: "POST",
			body: JSON.stringify(FormerStudentCreateRequestSchema.parse(body)),
		},
	);
}

export async function createBulk(
	body: FormerStudentCreateRequest[],
): Promise<FormerStudentResponse[]> {
	return authFetch(
		`${API_ROUTE_BASES.academic.formerStudents}/bulk`,
		z.array(FormerStudentResponseSchema),
		{
			method: "POST",
			body: JSON.stringify(
				z.array(FormerStudentCreateRequestSchema).parse(body),
			),
		},
	);
}

export async function update(
	id: string,
	body: FormerStudentUpdateRequest,
): Promise<FormerStudentResponse> {
	return authFetch(
		`${API_ROUTE_BASES.academic.formerStudents}/${id}`,
		FormerStudentResponseSchema,
		{
			method: "PUT",
			body: JSON.stringify(FormerStudentUpdateRequestSchema.parse(body)),
		},
	);
}

export async function setActive(id: string, active: boolean): Promise<void> {
	return authVoid(`${API_ROUTE_BASES.academic.formerStudents}/${id}/status`, {
		method: "PATCH",
		body: JSON.stringify(AccountStatusRequestSchema.parse({ active })),
	});
}

export async function remove(id: string): Promise<void> {
	return authVoid(`${API_ROUTE_BASES.academic.formerStudents}/${id}`, {
		method: "DELETE",
	});
}
