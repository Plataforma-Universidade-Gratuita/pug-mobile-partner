"use client";


import { useQuery } from "@tanstack/react-query";

import { buildEntityComplexSearchRequest } from "@/api/utils";
import type { UseEntitiesSearchQueryFilters } from "@/types/client";

import { get, list, listCities, search } from "./endpoints";
import { entityKeys as keys } from "./keys";

export function useEntitiesQuery(enabled = true) {
	return useQuery({
		queryKey: keys.list(),
		queryFn: () => list(),
		enabled,
	});
}

export function useEntitiesSearchQuery(
	page: number,
	size: number,
	filters: UseEntitiesSearchQueryFilters,
	enabled = true,
) {
	const complexSearchRequest = buildEntityComplexSearchRequest(filters);
	const filtersKey = JSON.stringify(complexSearchRequest);

	return useQuery({
		queryKey: keys.search(page, size, filtersKey),
		queryFn: () =>
			search(
				{
					page,
					size,
				},
				complexSearchRequest,
			),
		enabled,
	});
}

export function useEntityCitiesQuery() {
	return useQuery({
		queryKey: keys.cities(),
		queryFn: listCities,
	});
}

export function useEntityDetailQuery(id: string | null) {
	return useQuery({
		queryKey: id === null ? keys.idleDetail() : keys.detail(id),
		queryFn: () => get(id!),
		enabled: id !== null,
	});
}
