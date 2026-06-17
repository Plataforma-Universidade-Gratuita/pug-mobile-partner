import { z } from "zod";

import { API_ROUTE_BASES } from "@/constants/api";
import { SchoolResponseSchema } from "@/schemas/api/academic/school";
import type {
	SchoolCreateRequest,
	SchoolResponse,
	SchoolUpdateRequest,
} from "@/types/api";
import { zfetch, zvoid, qs } from "@/utils/api";

const BASE = API_ROUTE_BASES.academic.schools;

export async function get(id: string, token?: string): Promise<SchoolResponse> {
	return zfetch(
		`${BASE}/${id}`,
		{ method: "GET" },
		SchoolResponseSchema,
		token,
	);
}

export async function list(
	token?: string,
	q?: string,
): Promise<SchoolResponse[]> {
	return zfetch(
		`${BASE}${qs({ q })}`,
		{ method: "GET" },
		z.array(SchoolResponseSchema),
		token,
	);
}

export async function create(
	body: SchoolCreateRequest,
	token?: string,
): Promise<SchoolResponse> {
	return zfetch(
		`${BASE}`,
		{ method: "POST", body: JSON.stringify(body) },
		SchoolResponseSchema,
		token,
	);
}

export async function update(
	id: string,
	body: SchoolUpdateRequest,
	token?: string,
): Promise<SchoolResponse> {
	return zfetch(
		`${BASE}/${id}`,
		{ method: "PUT", body: JSON.stringify(body) },
		SchoolResponseSchema,
		token,
	);
}

export async function remove(id: string, token?: string): Promise<void> {
	return zvoid(`${BASE}/${id}`, { method: "DELETE" }, token);
}
