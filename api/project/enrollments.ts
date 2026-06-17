import { z } from "zod";

import { API_ROUTE_BASES } from "@/constants/api";
import { EnrollmentResponseSchema } from "@/schemas/api/project/enrollment";
import type {
	EnrollmentCreateRequest,
	EnrollmentResponse,
	EnrollmentStatus,
} from "@/types/api";
import { zfetch, zvoid, qs } from "@/utils/api";

const BASE = API_ROUTE_BASES.project.enrollments;
const PROJECTS_BASE = API_ROUTE_BASES.project.projects;

export async function get(
	projectId: string,
	studentId: string,
	token?: string,
): Promise<EnrollmentResponse> {
	return zfetch(
		`${PROJECTS_BASE}/${projectId}/enrollments/${studentId}`,
		{ method: "GET" },
		EnrollmentResponseSchema,
		token,
	);
}

export async function getMine(
	projectId: string,
	token?: string,
): Promise<EnrollmentResponse> {
	return zfetch(
		`${PROJECTS_BASE}/${projectId}/enrollments/me`,
		{ method: "GET" },
		EnrollmentResponseSchema,
		token,
	);
}

export async function list(
	token?: string,
	projectId?: string,
	studentId?: string,
): Promise<EnrollmentResponse[]> {
	return zfetch(
		`${BASE}${qs({ projectId, studentId })}`,
		{ method: "GET" },
		z.array(EnrollmentResponseSchema),
		token,
	);
}

export async function listMine(token?: string): Promise<EnrollmentResponse[]> {
	return zfetch(
		`${BASE}/me`,
		{ method: "GET" },
		z.array(EnrollmentResponseSchema),
		token,
	);
}

export async function create(
	body: EnrollmentCreateRequest,
	token?: string,
): Promise<EnrollmentResponse> {
	return zfetch(
		`${PROJECTS_BASE}/${body.projectId}/enrollments`,
		{ method: "POST" },
		EnrollmentResponseSchema,
		token,
	);
}

async function updateStatus(
	projectId: string,
	studentId: string,
	status: EnrollmentStatus,
	token?: string,
): Promise<EnrollmentResponse> {
	return zfetch(
		`${PROJECTS_BASE}/${projectId}/enrollments/${studentId}`,
		{ method: "PATCH", body: JSON.stringify({ status }) },
		EnrollmentResponseSchema,
		token,
	);
}

async function updateMyStatus(
	projectId: string,
	status: EnrollmentStatus,
	token?: string,
): Promise<EnrollmentResponse> {
	return zfetch(
		`${PROJECTS_BASE}/${projectId}/enrollments/me`,
		{ method: "PATCH", body: JSON.stringify({ status }) },
		EnrollmentResponseSchema,
		token,
	);
}

export async function accept(
	projectId: string,
	studentId: string,
	token?: string,
): Promise<EnrollmentResponse> {
	return updateStatus(projectId, studentId, "APPROVED", token);
}

export async function cancel(
	projectId: string,
	studentId: string,
	token?: string,
): Promise<EnrollmentResponse> {
	return updateStatus(projectId, studentId, "CANCELED", token);
}

export async function complete(
	projectId: string,
	studentId: string,
	token?: string,
): Promise<EnrollmentResponse> {
	return updateStatus(projectId, studentId, "COMPLETED", token);
}

export async function exit(
	projectId: string,
	token?: string,
): Promise<EnrollmentResponse> {
	return updateMyStatus(projectId, "EXITED", token);
}

export async function reject(
	projectId: string,
	studentId: string,
	token?: string,
): Promise<EnrollmentResponse> {
	return updateStatus(projectId, studentId, "REJECTED", token);
}

export async function remove(
	projectId: string,
	studentId: string,
	token?: string,
): Promise<EnrollmentResponse> {
	return updateStatus(projectId, studentId, "REMOVED", token);
}

export async function deleteEnrollment(
	projectId: string,
	studentId: string,
	token?: string,
): Promise<void> {
	return zvoid(
		`${PROJECTS_BASE}/${projectId}/enrollments/${studentId}`,
		{ method: "DELETE" },
		token,
	);
}
