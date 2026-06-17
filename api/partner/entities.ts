import { z } from "zod";

import { API_ROUTE_BASES } from "@/constants/api";
import { CityResponseSchema } from "@/schemas/api/geo/city";
import { EntityResponseSchema } from "@/schemas/api/partner/entity";
import type {
	CityResponse,
	EntityCreateRequest,
	EntityResponse,
	EntityUpdateRequest,
} from "@/types/api";
import { zfetch, zvoid, qs } from "@/utils/api";

const BASE = API_ROUTE_BASES.partner.entities;

export async function get(id: string, token?: string): Promise<EntityResponse> {
	return zfetch(
		`${BASE}/${id}`,
		{ method: "GET" },
		EntityResponseSchema,
		token,
	);
}

export async function getByCnpj(
	cnpj: string,
	token?: string,
): Promise<EntityResponse> {
	return zfetch(
		`${BASE}${qs({ cnpj })}`,
		{ method: "GET" },
		EntityResponseSchema,
		token,
	);
}

export async function list(
	token?: string,
	q?: string,
	cityId?: string,
): Promise<EntityResponse[]> {
	return zfetch(
		`${BASE}${qs({ q, cityId })}`,
		{ method: "GET" },
		z.array(EntityResponseSchema),
		token,
	);
}

export async function listCities(token?: string): Promise<CityResponse[]> {
	return zfetch(
		`${BASE}/cities`,
		{ method: "GET" },
		z.array(CityResponseSchema),
		token,
	);
}

export async function create(
	body: EntityCreateRequest,
	token?: string,
): Promise<EntityResponse> {
	return zfetch(
		`${BASE}`,
		{ method: "POST", body: JSON.stringify(body) },
		EntityResponseSchema,
		token,
	);
}

export async function update(
	id: string,
	body: EntityUpdateRequest,
	token?: string,
): Promise<EntityResponse> {
	return zfetch(
		`${BASE}/${id}`,
		{ method: "PUT", body: JSON.stringify(body) },
		EntityResponseSchema,
		token,
	);
}

export async function remove(id: string, token?: string): Promise<void> {
	return zvoid(`${BASE}/${id}`, { method: "DELETE" }, token);
}
