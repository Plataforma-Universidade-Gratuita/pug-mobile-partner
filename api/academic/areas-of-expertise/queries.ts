"use client";

/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { useQuery } from "@tanstack/react-query";

import { get, list } from "./endpoints";
import { areaOfExpertiseKeys as keys } from "./keys";

export function useAreasOfExpertiseQuery() {
	return useQuery({
		queryKey: keys.list(),
		queryFn: () => list(),
	});
}

export function useAreaOfExpertiseDetailQuery(id: string | null) {
	return useQuery({
		queryKey: id === null ? keys.idleDetail() : keys.detail(id),
		queryFn: () => get(id!),
		enabled: id !== null,
	});
}
