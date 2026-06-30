"use client";

import { useQuery } from "@tanstack/react-query";

import { buildUserComplexSearchRequest } from "@/api/utils";
import type { UserComplexSearchFilters } from "@/types/client";

import { get, getMe, list, search } from "./endpoints";
import { userKeys as keys } from "./keys";

export function useUsersQuery(enabled = true) {
	return useQuery({
		queryKey: keys.list(),
		queryFn: () => list(),
		enabled,
	});
}

export function useUsersSearchQuery(
	page: number,
	size: number,
	filters: UserComplexSearchFilters,
	enabled = true,
) {
	const complexSearchRequest = buildUserComplexSearchRequest(filters);
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

export function useUserDetailQuery(id: string | null) {
	return useQuery({
		queryKey: id === null ? keys.idleDetail() : keys.detail(id),
		queryFn: () => get(id!),
		enabled: id !== null,
	});
}

export function useCurrentUserQuery() {
	return useQuery({
		queryKey: keys.me(),
		queryFn: getMe,
	});
}
