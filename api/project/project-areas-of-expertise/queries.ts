"use client";

/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { useQuery } from "@tanstack/react-query";

import { listProjectsByAreaOfExpertise } from "./endpoints";
import { projectAreaOfExpertiseKeys as keys } from "./keys";

export function useProjectsByAreaOfExpertiseQuery(
	areaOfExpertiseId: string | null,
) {
	return useQuery({
		queryKey:
			areaOfExpertiseId === null
				? keys.idleProjects()
				: keys.projects(areaOfExpertiseId),
		queryFn: () => listProjectsByAreaOfExpertise(areaOfExpertiseId!),
		enabled: areaOfExpertiseId !== null,
	});
}
