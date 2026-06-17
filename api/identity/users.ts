import { z } from "zod";

import { API_ROUTE_BASES } from "@/constants/api";
import { UserResponseSchema } from "@/schemas/api/identity/user";
import type { UserResponse } from "@/types/api";
import { zfetch, qs } from "@/utils/api";

const BASE = API_ROUTE_BASES.identity.users;

export async function get(id: string, token?: string): Promise<UserResponse> {
	return zfetch(`${BASE}/${id}`, { method: "GET" }, UserResponseSchema, token);
}

export async function getByCpf(
	cpf: string,
	token?: string,
): Promise<UserResponse> {
	return zfetch(
		`${BASE}${qs({ cpf })}`,
		{ method: "GET" },
		UserResponseSchema,
		token,
	);
}

export async function getMe(token?: string): Promise<UserResponse> {
	return zfetch(`${BASE}/me`, { method: "GET" }, UserResponseSchema, token);
}

export async function list(
	token?: string,
	q?: string,
): Promise<UserResponse[]> {
	return zfetch(
		`${BASE}${qs({ q })}`,
		{ method: "GET" },
		z.array(UserResponseSchema),
		token,
	);
}
