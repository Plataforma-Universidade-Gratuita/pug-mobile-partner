"use client";

/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { useQuery } from "@tanstack/react-query";

import { buildAccountComplexSearchRequest } from "@/api/utils";
import type { AccountComplexSearchFilters } from "@/types/client";

import { get, getMe, list, search } from "./endpoints";
import { accountKeys as keys } from "./keys";

export function useAccountsQuery(enabled = true) {
	return useQuery({
		queryKey: keys.list(),
		queryFn: () => list(),
		enabled,
	});
}

export function useAccountsSearchQuery(
	page: number,
	size: number,
	filters: AccountComplexSearchFilters,
	enabled = true,
) {
	const complexSearchRequest = buildAccountComplexSearchRequest(filters);
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

export function useAccountDetailQuery(id: string | null) {
	return useQuery({
		queryKey: id === null ? keys.idleDetail() : keys.detail(id),
		queryFn: () => get(id!),
		enabled: id !== null,
	});
}

export function useCurrentAccountQuery() {
	return useQuery({
		queryKey: keys.me(),
		queryFn: getMe,
	});
}
