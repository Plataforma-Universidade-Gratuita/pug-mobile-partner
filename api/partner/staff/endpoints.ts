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
	StaffComplexSearchRequestSchema,
	StaffComplexSearchResponseSchema,
	StaffCreateRequestSchema,
	StaffResponseSchema,
	StaffUpdateRequestSchema,
	createPageResponseSchema,
} from "@/schemas/api";
import type {
	PaginationRequest,
	StaffComplexSearchRequest,
	StaffComplexSearchResponse,
	StaffCreateRequest,
	StaffResponse,
	StaffUpdateRequest,
} from "@/types/api";

export async function get(id: string): Promise<StaffResponse> {
	return authFetch(
		`${API_ROUTE_BASES.partner.staff}/${id}`,
		StaffResponseSchema,
	);
}

export async function getMe(): Promise<StaffResponse> {
	return authFetch(`${API_ROUTE_BASES.partner.staff}/me`, StaffResponseSchema);
}

export async function list(ids?: string[]): Promise<StaffResponse[]> {
	return authFetch(
		`${API_ROUTE_BASES.partner.staff}${qs({
			ids,
		})}`,
		z.array(StaffResponseSchema),
	);
}

export async function search(
	pagination: PaginationRequest,
	body: StaffComplexSearchRequest,
): Promise<StaffComplexSearchResponse> {
	return authFetch(
		`${API_ROUTE_BASES.partner.staff}/search${qs({
			page: String(pagination.page),
			size: String(pagination.size),
		})}`,
		createPageResponseSchema(StaffComplexSearchResponseSchema),
		{
			method: "POST",
			body: JSON.stringify(StaffComplexSearchRequestSchema.parse(body)),
		},
	);
}

export async function create(body: StaffCreateRequest): Promise<StaffResponse> {
	return authFetch(`${API_ROUTE_BASES.partner.staff}`, StaffResponseSchema, {
		method: "POST",
		body: JSON.stringify(StaffCreateRequestSchema.parse(body)),
	});
}

export async function update(
	id: string,
	body: StaffUpdateRequest,
): Promise<StaffResponse> {
	return authFetch(
		`${API_ROUTE_BASES.partner.staff}/${id}`,
		StaffResponseSchema,
		{
			method: "PUT",
			body: JSON.stringify(StaffUpdateRequestSchema.parse(body)),
		},
	);
}

export async function setActive(id: string, active: boolean): Promise<void> {
	return authVoid(`${API_ROUTE_BASES.partner.staff}/${id}/status`, {
		method: "PATCH",
		body: JSON.stringify(AccountStatusRequestSchema.parse({ active })),
	});
}

export async function deactivate(id: string): Promise<void> {
	return setActive(id, false);
}

export async function reactivate(id: string): Promise<void> {
	return setActive(id, true);
}

export async function remove(id: string): Promise<void> {
	return authVoid(`${API_ROUTE_BASES.partner.staff}/${id}`, {
		method: "DELETE",
	});
}
