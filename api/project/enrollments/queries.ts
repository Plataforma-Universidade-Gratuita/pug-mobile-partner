"use client";


import { useQuery } from "@tanstack/react-query";

import { ApiError } from "@/api/errors";
import { buildEnrollmentComplexSearchRequest } from "@/api/utils";
import type { EnrollmentComplexSearchFilters } from "@/types/client";

import { get, getMine, list, listMine, search } from "./endpoints";
import { enrollmentKeys as keys } from "./keys";

export function useEnrollmentsQuery(enabled = true) {
	return useQuery({
		queryKey: keys.list(),
		queryFn: () => list(),
		enabled,
	});
}

export function useMyEnrollmentsQuery(enabled = true) {
	return useQuery({
		queryKey: [...keys.list(), "mine"] as const,
		queryFn: () => listMine(),
		enabled,
	});
}

export function useProjectEnrollmentsQuery(projectId: string | null) {
	return useQuery({
		queryKey:
			projectId === null ? keys.idleProjectList() : keys.projectList(projectId),
		queryFn: () => list(projectId!),
		enabled: projectId !== null,
	});
}

export function useEnrollmentsSearchQuery(
	page: number,
	size: number,
	filters: EnrollmentComplexSearchFilters,
	enabled = true,
) {
	const complexSearchRequest = buildEnrollmentComplexSearchRequest(filters);
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

export function useEnrollmentDetailQuery(
	projectId: string | null,
	formerStudentId: string | null,
) {
	return useQuery({
		queryKey:
			projectId === null || formerStudentId === null
				? keys.idleDetail()
				: keys.detail(projectId, formerStudentId),
		queryFn: () => get(projectId!, formerStudentId!),
		enabled: projectId !== null && formerStudentId !== null,
	});
}

export function useMyEnrollmentDetailQuery(projectId: string | null) {
	return useQuery({
		queryKey:
			projectId === null ? keys.idleMineDetail() : keys.mineDetail(projectId),
		queryFn: async () => {
			try {
				return await getMine(projectId!);
			} catch (error) {
				if (error instanceof ApiError && error.status === 404) {
					return null;
				}

				throw error;
			}
		},
		enabled: projectId !== null,
		retry: false,
	});
}
