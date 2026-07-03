"use client";

/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { useQuery } from "@tanstack/react-query";

import { buildProjectComplexSearchRequest } from "@/api/utils";
import type { ProjectComplexSearchFilters } from "@/types/client";

import * as projectAreasOfExpertise from "../project-areas-of-expertise";
import { get, list, search } from "./endpoints";
import { projectKeys as keys } from "./keys";

const { listAreasOfExpertiseByProject } = projectAreasOfExpertise;

export function useProjectsQuery(enabled = true) {
	return useQuery({
		queryKey: keys.list(),
		queryFn: () => list(),
		enabled,
	});
}

export function useProjectsSearchQuery(
	page: number,
	size: number,
	filters: ProjectComplexSearchFilters,
	enabled = true,
) {
	const complexSearchRequest = buildProjectComplexSearchRequest(filters);
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

export function useProjectDetailQuery(id: string | null) {
	return useQuery({
		queryKey: id === null ? keys.idleDetail() : keys.detail(id),
		queryFn: () => get(id!),
		enabled: id !== null,
	});
}

export function useProjectAreasOfExpertiseQuery(projectId: string | null) {
	return useQuery({
		queryKey:
			projectId === null
				? keys.idleAreasOfExpertise()
				: keys.areasOfExpertise(projectId),
		queryFn: () => listAreasOfExpertiseByProject(projectId!),
		enabled: projectId !== null,
	});
}
