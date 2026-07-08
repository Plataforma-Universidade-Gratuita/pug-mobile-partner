
import { z } from "zod";

import { API_ROUTE_BASES } from "@/api/constants";
import { authFetch, qs } from "@/api/utils";
import {
	CityComplexSearchRequestSchema,
	CityResponseSchema,
	createPageResponseSchema,
} from "@/schemas/api";
import type {
	CityComplexSearchRequest,
	CityComplexSearchResponse,
	CityResponse,
	PaginationRequest,
} from "@/types/api";

export async function get(id: string): Promise<CityResponse> {
	return authFetch(`${API_ROUTE_BASES.geo.cities}/${id}`, CityResponseSchema);
}

export async function list(): Promise<CityResponse[]> {
	return authFetch(API_ROUTE_BASES.geo.cities, z.array(CityResponseSchema));
}

export async function search(
	pagination: PaginationRequest,
	body: CityComplexSearchRequest,
): Promise<CityComplexSearchResponse> {
	return authFetch(
		`${API_ROUTE_BASES.geo.cities}/search${qs({
			page: String(pagination.page),
			size: String(pagination.size),
		})}`,
		createPageResponseSchema(CityResponseSchema),
		{
			method: "POST",
			body: JSON.stringify(CityComplexSearchRequestSchema.parse(body)),
		},
	);
}
