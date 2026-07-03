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
	EntityComplexSearchRequestSchema,
	EntityComplexSearchResponseSchema,
	EntityCreateRequestSchema,
	EntityResponseSchema,
	EntityUpdateRequestSchema,
	createPageResponseSchema,
} from "@/schemas/api";
import type {
	EntityComplexSearchRequest,
	EntityComplexSearchResponse,
	EntityCreateRequest,
	EntityResponse,
	EntityUpdateRequest,
	PaginationRequest,
} from "@/types/api";

export { list as listCities } from "@/api/geo/cities/endpoints";

export async function get(id: string): Promise<EntityResponse> {
	return authFetch(
		`${API_ROUTE_BASES.partner.entities}/${id}`,
		EntityResponseSchema,
	);
}

export async function list(ids?: string[]): Promise<EntityResponse[]> {
	return authFetch(
		`${API_ROUTE_BASES.partner.entities}${qs({
			ids,
		})}`,
		z.array(EntityResponseSchema),
	);
}

export async function search(
	pagination: PaginationRequest,
	body: EntityComplexSearchRequest,
): Promise<EntityComplexSearchResponse> {
	return authFetch(
		`${API_ROUTE_BASES.partner.entities}/search${qs({
			page: String(pagination.page),
			size: String(pagination.size),
		})}`,
		createPageResponseSchema(EntityComplexSearchResponseSchema),
		{
			method: "POST",
			body: JSON.stringify(EntityComplexSearchRequestSchema.parse(body)),
		},
	);
}

export async function create(
	body: EntityCreateRequest,
): Promise<EntityResponse> {
	return authFetch(
		`${API_ROUTE_BASES.partner.entities}`,
		EntityResponseSchema,
		{
			method: "POST",
			body: JSON.stringify(EntityCreateRequestSchema.parse(body)),
		},
	);
}

export async function update(
	id: string,
	body: EntityUpdateRequest,
): Promise<EntityResponse> {
	return authFetch(
		`${API_ROUTE_BASES.partner.entities}/${id}`,
		EntityResponseSchema,
		{
			method: "PUT",
			body: JSON.stringify(EntityUpdateRequestSchema.parse(body)),
		},
	);
}

export async function remove(id: string): Promise<void> {
	return authVoid(`${API_ROUTE_BASES.partner.entities}/${id}`, {
		method: "DELETE",
	});
}
