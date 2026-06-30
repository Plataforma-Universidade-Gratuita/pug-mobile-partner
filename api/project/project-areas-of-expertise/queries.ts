"use client";

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
