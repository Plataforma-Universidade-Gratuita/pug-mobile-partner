import { z } from "zod";

import { API_ROUTE_BASES } from "@/api/constants";
import { authFetch, authVoid } from "@/api/utils";
import {
	AreaOfExpertiseResponseSchema,
	ProjectAreaOfExpertiseRequestSchema,
	ProjectResponseSchema,
} from "@/schemas/api";
import type {
	AreaOfExpertiseResponse,
	ProjectAreaOfExpertiseRequest,
	ProjectResponse,
} from "@/types/api";

export async function listAreasOfExpertiseByProject(
	projectId: string,
): Promise<AreaOfExpertiseResponse[]> {
	return authFetch(
		`${API_ROUTE_BASES.project.projects}/${projectId}/areas-of-expertise`,
		z.array(AreaOfExpertiseResponseSchema),
	);
}

export async function listProjectsByAreaOfExpertise(
	areaOfExpertiseId: string,
): Promise<ProjectResponse[]> {
	return authFetch(
		`${API_ROUTE_BASES.academic.areasOfExpertise}/${areaOfExpertiseId}/projects`,
		z.array(ProjectResponseSchema),
	);
}

export async function createAssociations(
	projectId: string,
	body: ProjectAreaOfExpertiseRequest,
): Promise<void> {
	return authVoid(
		`${API_ROUTE_BASES.project.projects}/${projectId}/areas-of-expertise`,
		{
			method: "POST",
			body: JSON.stringify(ProjectAreaOfExpertiseRequestSchema.parse(body)),
		},
	);
}

export async function deleteAssociation(
	projectId: string,
	areaOfExpertiseId: string,
): Promise<void> {
	return authVoid(
		`${API_ROUTE_BASES.project.projects}/${projectId}/areas-of-expertise/${areaOfExpertiseId}`,
		{
			method: "DELETE",
		},
	);
}

export async function deleteAllByProject(projectId: string): Promise<void> {
	return authVoid(
		`${API_ROUTE_BASES.project.projects}/${projectId}/areas-of-expertise`,
		{ method: "DELETE" },
	);
}

export async function deleteAllByAreaOfExpertise(
	areaOfExpertiseId: string,
): Promise<void> {
	return authVoid(
		`${API_ROUTE_BASES.academic.areasOfExpertise}/${areaOfExpertiseId}/projects`,
		{ method: "DELETE" },
	);
}
