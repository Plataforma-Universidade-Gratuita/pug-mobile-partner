"use client";

/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { useQuery } from "@tanstack/react-query";

import * as accountApi from "@/api/identity/accounts";
import * as userApi from "@/api/identity/users";
import { buildStaffComplexSearchRequest } from "@/api/utils";
import type { StaffComplexSearchFilters } from "@/types/client";

import * as entities from "../entities";
import { get, list, search } from "./endpoints";
import { staffKeys as keys } from "./keys";

const { get: getAccount } = accountApi;
const { list: listEntities, listCities } = entities;
const { get: getUser } = userApi;

export function useStaffQuery(enabled = true) {
	return useQuery({
		queryKey: keys.list(),
		queryFn: () => list(),
		enabled,
	});
}

export function useStaffSearchQuery(
	page: number,
	size: number,
	filters: StaffComplexSearchFilters,
	enabled = true,
) {
	const complexSearchRequest = buildStaffComplexSearchRequest(filters);
	const filtersKey = JSON.stringify(complexSearchRequest);

	return useQuery({
		queryKey: keys.search(page, size, filtersKey),
		queryFn: () =>
			search(
				{
					page,
					size,
				},
				complexSearchRequest,
			),
		enabled,
	});
}

export function useStaffDetailQuery(id: string | null) {
	return useQuery({
		queryKey: id === null ? keys.idleDetail() : keys.detail(id),
		queryFn: () => get(id!),
		enabled: id !== null,
	});
}

export function useLinkedStaffAccountQuery(accountId: string | null) {
	return useQuery({
		queryKey:
			accountId === null
				? keys.idleLinkedAccount()
				: keys.linkedAccount(accountId),
		queryFn: () => getAccount(accountId!),
		enabled: accountId !== null,
	});
}

export function useLinkedStaffUserQuery(userId: string | null) {
	return useQuery({
		queryKey: userId === null ? keys.idleLinkedUser() : keys.linkedUser(userId),
		queryFn: () => getUser(userId!),
		enabled: userId !== null,
	});
}

export function useStaffCitiesQuery() {
	return useQuery({
		queryKey: keys.supportingCities(),
		queryFn: listCities,
	});
}

export function useStaffEntitiesQuery() {
	return useQuery({
		queryKey: keys.supportingEntities(),
		queryFn: () => listEntities(),
	});
}
