import { z } from "zod";

import { API_ROUTE_BASES } from "@/api/constants";
import { authFetch, authVoid, qs } from "@/api/utils";
import {
	AreaOfExpertiseComplexSearchRequestSchema,
	AreaOfExpertiseComplexSearchResponseSchema,
	AreaOfExpertiseCreateRequestSchema,
	AreaOfExpertiseResponseSchema,
	AreaOfExpertiseUpdateRequestSchema,
	createPageResponseSchema,
} from "@/schemas/api";
import type {
	AreaOfExpertiseComplexSearchRequest,
	AreaOfExpertiseComplexSearchResponse,
	AreaOfExpertiseCreateRequest,
	AreaOfExpertiseResponse,
	AreaOfExpertiseUpdateRequest,
	PaginationRequest,
} from "@/types/api";

export async function get(id: string): Promise<AreaOfExpertiseResponse> {
	return authFetch(
		`${API_ROUTE_BASES.academic.areasOfExpertise}/${id}`,
		AreaOfExpertiseResponseSchema,
	);
}

export async function list(ids?: string[]): Promise<AreaOfExpertiseResponse[]> {
	return authFetch(
		`${API_ROUTE_BASES.academic.areasOfExpertise}${qs({
			ids: ids?.join(","),
		})}`,
		z.array(AreaOfExpertiseResponseSchema),
	);
}

export async function search(
	pagination: PaginationRequest,
	body: AreaOfExpertiseComplexSearchRequest,
): Promise<AreaOfExpertiseComplexSearchResponse> {
	return authFetch(
		`${API_ROUTE_BASES.academic.areasOfExpertise}/search${qs({
			page: String(pagination.page),
			size: String(pagination.size),
		})}`,
		createPageResponseSchema(AreaOfExpertiseComplexSearchResponseSchema),
		{
			method: "POST",
			body: JSON.stringify(
				AreaOfExpertiseComplexSearchRequestSchema.parse(body),
			),
		},
	);
}

export async function create(
	body: AreaOfExpertiseCreateRequest,
): Promise<AreaOfExpertiseResponse> {
	return authFetch(
		`${API_ROUTE_BASES.academic.areasOfExpertise}`,
		AreaOfExpertiseResponseSchema,
		{
			method: "POST",
			body: JSON.stringify(AreaOfExpertiseCreateRequestSchema.parse(body)),
		},
	);
}

export async function update(
	id: string,
	body: AreaOfExpertiseUpdateRequest,
): Promise<AreaOfExpertiseResponse> {
	return authFetch(
		`${API_ROUTE_BASES.academic.areasOfExpertise}/${id}`,
		AreaOfExpertiseResponseSchema,
		{
			method: "PUT",
			body: JSON.stringify(AreaOfExpertiseUpdateRequestSchema.parse(body)),
		},
	);
}

export async function remove(id: string): Promise<void> {
	return authVoid(`${API_ROUTE_BASES.academic.areasOfExpertise}/${id}`, {
		method: "DELETE",
	});
}
