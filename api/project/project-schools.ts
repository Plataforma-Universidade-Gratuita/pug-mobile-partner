import { z } from "zod";

import { API_ROUTE_BASES } from "@/constants/api";
import { SchoolResponseSchema } from "@/schemas/api/academic/school";
import { ProjectResponseSchema } from "@/schemas/api/project/project";
import type {
	ProjectSchoolAssociationUpdateRequest,
	ProjectSchoolRequest,
	SchoolResponse,
	ProjectResponse,
} from "@/types/api";
import { zfetch, zvoid } from "@/utils/api";

const PROJECTS_BASE = API_ROUTE_BASES.project.projects;
const SCHOOLS_BASE = API_ROUTE_BASES.academic.schools;

export async function listSchoolsByProject(
	projectId: string,
	token?: string,
): Promise<SchoolResponse[]> {
	return zfetch(
		`${PROJECTS_BASE}/${projectId}/schools`,
		{ method: "GET" },
		z.array(SchoolResponseSchema),
		token,
	);
}

export async function listProjectsBySchool(
	schoolId: string,
	token?: string,
): Promise<ProjectResponse[]> {
	return zfetch(
		`${SCHOOLS_BASE}/${schoolId}/projects`,
		{ method: "GET" },
		z.array(ProjectResponseSchema),
		token,
	);
}

export async function createAssociations(
	body: ProjectSchoolRequest,
	token?: string,
): Promise<SchoolResponse[]> {
	const payload: ProjectSchoolAssociationUpdateRequest = {
		schoolIds: body.schoolIds,
	};
	return zfetch(
		`${PROJECTS_BASE}/${body.projectId}/schools`,
		{ method: "POST", body: JSON.stringify(payload) },
		z.array(SchoolResponseSchema),
		token,
	);
}

export async function deleteAssociation(
	projectId: string,
	schoolId: string,
	token?: string,
): Promise<void> {
	return zvoid(
		`${PROJECTS_BASE}/${projectId}/schools/${schoolId}`,
		{ method: "DELETE" },
		token,
	);
}

export async function deleteAllByProject(
	projectId: string,
	token?: string,
): Promise<void> {
	return zvoid(
		`${PROJECTS_BASE}/${projectId}/schools`,
		{ method: "DELETE" },
		token,
	);
}

export async function deleteAllBySchool(
	schoolId: string,
	token?: string,
): Promise<void> {
	return zvoid(
		`${SCHOOLS_BASE}/${schoolId}/projects`,
		{ method: "DELETE" },
		token,
	);
}
