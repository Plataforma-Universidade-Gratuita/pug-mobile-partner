import { z } from "zod";

import { API_ROUTE_BASES } from "@/constants/api";
import { AttendanceResponseSchema } from "@/schemas/api/project/attendance";
import type {
	AttendanceCreateRequest,
	AttendanceResponse,
	AttendanceValidateRequest,
} from "@/types/api";
import { zfetch, zvoid, qs } from "@/utils/api";

const BASE = API_ROUTE_BASES.project.attendances;

export async function get(
	id: string,
	token?: string,
): Promise<AttendanceResponse> {
	return zfetch(
		`${BASE}/${id}`,
		{ method: "GET" },
		AttendanceResponseSchema,
		token,
	);
}

export async function list(
	token?: string,
	projectId?: string,
	studentId?: string,
): Promise<AttendanceResponse[]> {
	return zfetch(
		`${BASE}${qs({ projectId, studentId })}`,
		{ method: "GET" },
		z.array(AttendanceResponseSchema),
		token,
	);
}

export async function create(
	body: AttendanceCreateRequest,
	token?: string,
): Promise<AttendanceResponse> {
	return zfetch(
		`${BASE}`,
		{ method: "POST", body: JSON.stringify(body) },
		AttendanceResponseSchema,
		token,
	);
}

export async function validate(
	id: string,
	body: AttendanceValidateRequest,
	token?: string,
): Promise<AttendanceResponse> {
	return zfetch(
		`${BASE}/${id}/validate`,
		{ method: "PATCH", body: JSON.stringify(body) },
		AttendanceResponseSchema,
		token,
	);
}

export async function remove(id: string, token?: string): Promise<void> {
	return zvoid(`${BASE}/${id}`, { method: "DELETE" }, token);
}
