import { z } from "zod";

import { API_ROUTE_BASES } from "@/api/constants";
import { authFetch, qs } from "@/api/utils";
import {
	createPageResponseSchema,
	UserComplexSearchRequestSchema,
	UserResponseSchema,
} from "@/schemas/api";
import type {
	PaginationRequest,
	UserComplexSearchRequest,
	UserComplexSearchResponse,
	UserResponse,
} from "@/types/api";

export async function get(id: string): Promise<UserResponse> {
	return authFetch(
		`${API_ROUTE_BASES.identity.users}/${id}`,
		UserResponseSchema,
	);
}

export async function getMe(): Promise<UserResponse> {
	return authFetch(`${API_ROUTE_BASES.identity.users}/me`, UserResponseSchema);
}

export async function list(ids?: string[]): Promise<UserResponse[]> {
	return authFetch(
		`${API_ROUTE_BASES.identity.users}${qs({
			ids,
		})}`,
		z.array(UserResponseSchema),
	);
}

export async function search(
	pagination: PaginationRequest,
	body: UserComplexSearchRequest,
): Promise<UserComplexSearchResponse> {
	return authFetch(
		`${API_ROUTE_BASES.identity.users}/search${qs({
			page: String(pagination.page),
			size: String(pagination.size),
		})}`,
		createPageResponseSchema(UserResponseSchema),
		{
			method: "POST",
			body: JSON.stringify(UserComplexSearchRequestSchema.parse(body)),
		},
	);
}
