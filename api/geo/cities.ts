import { z } from "zod";

import { API_ROUTE_BASES } from "@/constants/api";
import { CityResponseSchema } from "@/schemas/api/geo/city";
import type { CityResponse } from "@/types/api";
import { zfetch, qs } from "@/utils/api";

const BASE = API_ROUTE_BASES.geo.cities;

export async function get(id: string, token?: string): Promise<CityResponse> {
	return zfetch(`${BASE}/${id}`, { method: "GET" }, CityResponseSchema, token);
}

export async function getByIbge(
	ibgeCode: string,
	token?: string,
): Promise<CityResponse> {
	return zfetch(
		`${BASE}/by-ibge/${ibgeCode}`,
		{ method: "GET" },
		CityResponseSchema,
		token,
	);
}

export async function list(
	token?: string,
	q?: string,
): Promise<CityResponse[]> {
	return zfetch(
		`${BASE}${qs({ q })}`,
		{ method: "GET" },
		z.array(CityResponseSchema),
		token,
	);
}
