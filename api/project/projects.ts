import { z } from "zod";

import { API_ROUTE_BASES } from "@/constants/api";
import { ProjectResponseSchema } from "@/schemas/api/project/project";
import type {
	ProjectCreateRequest,
	ProjectResponse,
	ProjectStatus,
	ProjectUpdateRequest,
} from "@/types/api";
import { zfetch, zvoid, qs } from "@/utils/api";

const BASE = API_ROUTE_BASES.project.projects;

export async function get(
	id: string,
	token?: string,
): Promise<ProjectResponse> {
	return zfetch(
		`${BASE}/${id}`,
		{ method: "GET" },
		ProjectResponseSchema,
		token,
	);
}

export async function list(
	token?: string,
	q?: string,
	entityId?: string,
): Promise<ProjectResponse[]> {
	return zfetch(
		`${BASE}${qs({ q, entityId })}`,
		{ method: "GET" },
		z.array(ProjectResponseSchema),
		token,
	);
}

export async function listByCreatedBy(
	accountId: string,
	token?: string,
): Promise<ProjectResponse[]> {
	return zfetch(
		`${BASE}${qs({ createdBy: accountId })}`,
		{ method: "GET" },
		z.array(ProjectResponseSchema),
		token,
	);
}

export async function create(
	body: ProjectCreateRequest,
	token?: string,
): Promise<ProjectResponse> {
	return zfetch(
		`${BASE}`,
		{ method: "POST", body: JSON.stringify(body) },
		ProjectResponseSchema,
		token,
	);
}

export async function update(
	id: string,
	body: ProjectUpdateRequest,
	token?: string,
): Promise<ProjectResponse> {
	return zfetch(
		`${BASE}/${id}`,
		{ method: "PUT", body: JSON.stringify(body) },
		ProjectResponseSchema,
		token,
	);
}

async function updateStatus(
	id: string,
	status: ProjectStatus,
	token?: string,
): Promise<ProjectResponse> {
	return zfetch(
		`${BASE}/${id}`,
		{ method: "PATCH", body: JSON.stringify({ status }) },
		ProjectResponseSchema,
		token,
	);
}

export async function cancel(
	id: string,
	token?: string,
): Promise<ProjectResponse> {
	return updateStatus(id, "CANCELED", token);
}

export async function complete(
	id: string,
	token?: string,
): Promise<ProjectResponse> {
	return updateStatus(id, "COMPLETED", token);
}

export async function hold(
	id: string,
	token?: string,
): Promise<ProjectResponse> {
	return updateStatus(id, "ON_HOLD", token);
}

export async function retake(
	id: string,
	token?: string,
): Promise<ProjectResponse> {
	return updateStatus(id, "PLANNED", token);
}

export async function start(
	id: string,
	token?: string,
): Promise<ProjectResponse> {
	return updateStatus(id, "IN_PROGRESS", token);
}

export async function remove(id: string, token?: string): Promise<void> {
	return zvoid(`${BASE}/${id}`, { method: "DELETE" }, token);
}
