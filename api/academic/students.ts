import { z } from "zod";

import { API_ROUTE_BASES } from "@/constants/api";
import { StudentResponseSchema } from "@/schemas/api/academic/student";
import type {
	StudentCreateRequest,
	StudentResponse,
	StudentUpdateRequest,
} from "@/types/api";
import { zfetch, zvoid, qs } from "@/utils/api";

const BASE = API_ROUTE_BASES.academic.students;

export async function get(
	id: string,
	token?: string,
): Promise<StudentResponse> {
	return zfetch(
		`${BASE}/${id}`,
		{ method: "GET" },
		StudentResponseSchema,
		token,
	);
}

export async function getByCpf(
	cpf: string,
	token?: string,
): Promise<StudentResponse> {
	return zfetch(
		`${BASE}${qs({ cpf })}`,
		{ method: "GET" },
		StudentResponseSchema,
		token,
	);
}

export async function getByEmail(
	email: string,
	token?: string,
): Promise<StudentResponse> {
	return zfetch(
		`${BASE}${qs({ email })}`,
		{ method: "GET" },
		StudentResponseSchema,
		token,
	);
}

export async function getByRegistration(
	registration: string,
	token?: string,
): Promise<StudentResponse> {
	return zfetch(
		`${BASE}${qs({ registration })}`,
		{ method: "GET" },
		StudentResponseSchema,
		token,
	);
}

export async function getMe(token?: string): Promise<StudentResponse> {
	return zfetch(`${BASE}/me`, { method: "GET" }, StudentResponseSchema, token);
}

export async function list(
	token?: string,
	q?: string,
	courseId?: string,
): Promise<StudentResponse[]> {
	return zfetch(
		`${BASE}${qs({ q, courseId })}`,
		{ method: "GET" },
		z.array(StudentResponseSchema),
		token,
	);
}

export async function create(
	body: StudentCreateRequest,
	token?: string,
): Promise<StudentResponse> {
	return zfetch(
		`${BASE}`,
		{ method: "POST", body: JSON.stringify(body) },
		StudentResponseSchema,
		token,
	);
}

export async function createBulk(
	body: StudentCreateRequest[],
	token?: string,
): Promise<StudentResponse[]> {
	return zfetch(
		`${BASE}/bulk`,
		{ method: "POST", body: JSON.stringify(body) },
		z.array(StudentResponseSchema),
		token,
	);
}

export async function update(
	id: string,
	body: StudentUpdateRequest,
	token?: string,
): Promise<StudentResponse> {
	return zfetch(
		`${BASE}/${id}`,
		{ method: "PUT", body: JSON.stringify(body) },
		StudentResponseSchema,
		token,
	);
}

export async function remove(id: string, token?: string): Promise<void> {
	return zvoid(`${BASE}/${id}`, { method: "DELETE" }, token);
}
