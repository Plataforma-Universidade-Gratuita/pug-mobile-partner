import { z } from "zod";

import { API_ROUTE_BASES } from "@/constants/api";
import { AdminResponseSchema } from "@/schemas/api/identity/admin";
import type {
	AdminCreateRequest,
	AdminResponse,
	AdminUpdateRequest,
} from "@/types/api";
import { zfetch, zvoid, qs } from "@/utils/api";

const BASE = API_ROUTE_BASES.identity.admins;

export async function get(id: string, token?: string): Promise<AdminResponse> {
	return zfetch(`${BASE}/${id}`, { method: "GET" }, AdminResponseSchema, token);
}

export async function getByEmail(
	email: string,
	token?: string,
): Promise<AdminResponse> {
	return zfetch(
		`${BASE}${qs({ email })}`,
		{ method: "GET" },
		AdminResponseSchema,
		token,
	);
}

export async function getMe(token?: string): Promise<AdminResponse> {
	return zfetch(`${BASE}/me`, { method: "GET" }, AdminResponseSchema, token);
}

export async function list(
	token?: string,
	q?: string,
): Promise<AdminResponse[]> {
	return zfetch(
		`${BASE}${qs({ q })}`,
		{ method: "GET" },
		z.array(AdminResponseSchema),
		token,
	);
}

export async function listByCpf(
	cpf: string,
	token?: string,
): Promise<AdminResponse[]> {
	return zfetch(
		`${BASE}${qs({ cpf })}`,
		{ method: "GET" },
		z.array(AdminResponseSchema),
		token,
	);
}

export async function create(
	body: AdminCreateRequest,
	token?: string,
): Promise<AdminResponse> {
	return zfetch(
		`${BASE}`,
		{ method: "POST", body: JSON.stringify(body) },
		AdminResponseSchema,
		token,
	);
}

export async function update(
	id: string,
	body: AdminUpdateRequest,
	token?: string,
): Promise<AdminResponse> {
	return zfetch(
		`${BASE}/${id}`,
		{ method: "PUT", body: JSON.stringify(body) },
		AdminResponseSchema,
		token,
	);
}

export async function deactivate(id: string, token?: string): Promise<void> {
	return zvoid(
		`${BASE}/${id}`,
		{ method: "PATCH", body: JSON.stringify({ active: false }) },
		token,
	);
}

export async function remove(id: string, token?: string): Promise<void> {
	return zvoid(`${BASE}/${id}`, { method: "DELETE" }, token);
}
