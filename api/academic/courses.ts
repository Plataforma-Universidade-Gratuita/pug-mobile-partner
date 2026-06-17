import { z } from "zod";

import { API_ROUTE_BASES } from "@/constants/api";
import { CourseResponseSchema } from "@/schemas/api/academic/course";
import type {
	CourseCreateRequest,
	CourseResponse,
	CourseUpdateRequest,
} from "@/types/api";
import { zfetch, zvoid, qs } from "@/utils/api";

const BASE = API_ROUTE_BASES.academic.courses;

export async function get(id: string, token?: string): Promise<CourseResponse> {
	return zfetch(
		`${BASE}/${id}`,
		{ method: "GET" },
		CourseResponseSchema,
		token,
	);
}

export async function list(
	token?: string,
	q?: string,
	schoolId?: string,
): Promise<CourseResponse[]> {
	return zfetch(
		`${BASE}${qs({ q, schoolId })}`,
		{ method: "GET" },
		z.array(CourseResponseSchema),
		token,
	);
}

export async function create(
	body: CourseCreateRequest,
	token?: string,
): Promise<CourseResponse> {
	return zfetch(
		`${BASE}`,
		{ method: "POST", body: JSON.stringify(body) },
		CourseResponseSchema,
		token,
	);
}

export async function update(
	id: string,
	body: CourseUpdateRequest,
	token?: string,
): Promise<CourseResponse> {
	return zfetch(
		`${BASE}/${id}`,
		{ method: "PUT", body: JSON.stringify(body) },
		CourseResponseSchema,
		token,
	);
}

export async function remove(id: string, token?: string): Promise<void> {
	return zvoid(`${BASE}/${id}`, { method: "DELETE" }, token);
}
