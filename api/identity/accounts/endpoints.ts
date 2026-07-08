import { z } from "zod";

import { API_ROUTE_BASES } from "@/api/constants";
import { authFetch, qs } from "@/api/utils";
import {
	createPageResponseSchema,
	AccountComplexSearchRequestSchema,
	AccountResponseSchema,
	AccountComplexSearchResponseSchema,
} from "@/schemas/api";
import type {
	AccountComplexSearchRequest,
	AccountComplexSearchResponse,
	AccountResponse,
	PaginationRequest,
} from "@/types/api";

export async function get(id: string): Promise<AccountResponse> {
	return authFetch(
		`${API_ROUTE_BASES.identity.accounts}/${id}`,
		AccountResponseSchema,
	);
}

export async function getMe(): Promise<AccountResponse> {
	return authFetch(
		`${API_ROUTE_BASES.identity.accounts}/me`,
		AccountResponseSchema,
	);
}

export async function list(ids?: string[]): Promise<AccountResponse[]> {
	return authFetch(
		`${API_ROUTE_BASES.identity.accounts}${qs({
			ids,
		})}`,
		z.array(AccountResponseSchema),
	);
}

export async function search(
	pagination: PaginationRequest,
	body: AccountComplexSearchRequest,
): Promise<AccountComplexSearchResponse> {
	return authFetch(
		`${API_ROUTE_BASES.identity.accounts}/search${qs({
			page: String(pagination.page),
			size: String(pagination.size),
		})}`,
		createPageResponseSchema(AccountComplexSearchResponseSchema),
		{
			method: "POST",
			body: JSON.stringify(AccountComplexSearchRequestSchema.parse(body)),
		},
	);
}
