
import { z } from "zod";

import { API_ROUTE_BASES } from "@/api/constants";
import { authFetch, authVoid, qs } from "@/api/utils";
import {
	AttendanceComplexSearchRequestSchema,
	AttendanceComplexSearchResponseSchema,
	AttendanceCreateRequestSchema,
	AttendanceResponseSchema,
	AttendanceValidateRequestSchema,
	createPageResponseSchema,
} from "@/schemas/api";
import type {
	AttendanceComplexSearchRequest,
	AttendanceComplexSearchResponse,
	AttendanceCreateRequest,
	AttendanceResponse,
	AttendanceValidateRequest,
	PaginationRequest,
} from "@/types/api";

export async function get(id: string): Promise<AttendanceResponse> {
	return authFetch(
		`${API_ROUTE_BASES.project.attendances}/${id}`,
		AttendanceResponseSchema,
	);
}

export async function list(ids?: string[]): Promise<AttendanceResponse[]> {
	return authFetch(
		`${API_ROUTE_BASES.project.attendances}${qs({ ids })}`,
		z.array(AttendanceResponseSchema),
	);
}

export async function search(
	pagination: PaginationRequest,
	body: AttendanceComplexSearchRequest,
): Promise<AttendanceComplexSearchResponse> {
	return authFetch(
		`${API_ROUTE_BASES.project.attendances}/search${qs({
			page: String(pagination.page),
			size: String(pagination.size),
		})}`,
		createPageResponseSchema(AttendanceComplexSearchResponseSchema),
		{
			method: "POST",
			body: JSON.stringify(AttendanceComplexSearchRequestSchema.parse(body)),
		},
	);
}

export async function create(
	body: AttendanceCreateRequest,
): Promise<AttendanceResponse> {
	return authFetch(
		`${API_ROUTE_BASES.project.attendances}`,
		AttendanceResponseSchema,
		{
			method: "POST",
			body: JSON.stringify(AttendanceCreateRequestSchema.parse(body)),
		},
	);
}

export async function validate(
	id: string,
	body: AttendanceValidateRequest,
): Promise<AttendanceResponse> {
	return authFetch(
		`${API_ROUTE_BASES.project.attendances}/${id}/validate`,
		AttendanceResponseSchema,
		{
			method: "PATCH",
			body: JSON.stringify(AttendanceValidateRequestSchema.parse(body)),
		},
	);
}

export async function remove(id: string): Promise<void> {
	return authVoid(`${API_ROUTE_BASES.project.attendances}/${id}`, {
		method: "DELETE",
	});
}
