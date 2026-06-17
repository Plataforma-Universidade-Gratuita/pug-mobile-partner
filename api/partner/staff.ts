import { z } from "zod";

import { API_ROUTE_BASES } from "@/constants/api";
import { StaffResponseSchema } from "@/schemas/api/partner/staff";
import type {
	StaffCreateRequest,
	StaffResponse,
	StaffUpdateRequest,
} from "@/types/api";
import { zfetch, zvoid, qs } from "@/utils/api";

const BASE = API_ROUTE_BASES.partner.staff;

export async function get(id: string, token?: string): Promise<StaffResponse> {
	return zfetch(`${BASE}/${id}`, { method: "GET" }, StaffResponseSchema, token);
}

export async function getByEmail(
	email: string,
	token?: string,
): Promise<StaffResponse> {
	return zfetch(
		`${BASE}${qs({ email })}`,
		{ method: "GET" },
		StaffResponseSchema,
		token,
	);
}

export async function getMe(token?: string): Promise<StaffResponse> {
	return zfetch(`${BASE}/me`, { method: "GET" }, StaffResponseSchema, token);
}

export async function list(
	token?: string,
	q?: string,
): Promise<StaffResponse[]> {
	return zfetch(
		`${BASE}${qs({ q })}`,
		{ method: "GET" },
		z.array(StaffResponseSchema),
		token,
	);
}

export async function listByCpf(
	cpf: string,
	token?: string,
): Promise<StaffResponse[]> {
	return zfetch(
		`${BASE}${qs({ cpf })}`,
		{ method: "GET" },
		z.array(StaffResponseSchema),
		token,
	);
}

export async function listByEntity(
	entityId: string,
	token?: string,
): Promise<StaffResponse[]> {
	return zfetch(
		`${BASE}${qs({ entityId })}`,
		{ method: "GET" },
		z.array(StaffResponseSchema),
		token,
	);
}

export async function create(
	body: StaffCreateRequest,
	token?: string,
): Promise<StaffResponse> {
	return zfetch(
		`${BASE}`,
		{ method: "POST", body: JSON.stringify(body) },
		StaffResponseSchema,
		token,
	);
}

export async function update(
	id: string,
	body: StaffUpdateRequest,
	token?: string,
): Promise<StaffResponse> {
	return zfetch(
		`${BASE}/${id}`,
		{ method: "PUT", body: JSON.stringify(body) },
		StaffResponseSchema,
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
