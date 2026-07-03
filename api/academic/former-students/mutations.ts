"use client";

/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import {
	useMutation,
	useQueryClient,
	type QueryClient,
} from "@tanstack/react-query";

import * as accountApi from "@/api/identity/accounts";
import * as userApi from "@/api/identity/users";
import type {
	AccountResponse,
	FormerStudentResponse,
	UserResponse,
} from "@/types/api";
import type {
	FormerStudentCreateMutationVariables,
	FormerStudentSetActiveMutationVariables,
	FormerStudentUpdateMutationVariables,
	RemoveFormerStudentMutationVariables,
} from "@/types/client";

import { create, remove, setActive, update } from "./endpoints";
import { formerStudentKeys as keys } from "./keys";

const { accountKeys } = accountApi;
const { userKeys } = userApi;

function formatCpf(value: string) {
	const digits = value.replace(/\D+/g, "").slice(0, 11);

	if (digits.length !== 11) {
		return value;
	}

	return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function createAuditInfo<
	TAuditInfo extends AccountResponse["auditInfo"] | UserResponse["auditInfo"],
>(existing?: TAuditInfo) {
	const now = new Date();
	const timestamp = now.toISOString();
	const formattedTimestamp = now.toLocaleString("en-US");

	if (!existing) {
		return {
			createdAt: timestamp,
			createdAtFormatted: formattedTimestamp,
			updatedAt: timestamp,
			updatedAtFormatted: formattedTimestamp,
		} as TAuditInfo;
	}

	return {
		...existing,
		updatedAt: timestamp,
		updatedAtFormatted: formattedTimestamp,
	} as TAuditInfo;
}

function upsertListItem<TItem>(
	items: TItem[] | undefined,
	nextItem: TItem,
	getId: (item: TItem) => string,
) {
	if (!items) {
		return [nextItem];
	}

	const nextId = getId(nextItem);
	const existingIndex = items.findIndex(item => getId(item) === nextId);

	if (existingIndex === -1) {
		return [nextItem, ...items];
	}

	return items.map((item, index) =>
		index === existingIndex ? nextItem : item,
	);
}

function removeListItem<TItem>(
	items: TItem[] | undefined,
	id: string,
	getId: (item: TItem) => string,
) {
	return items?.filter(item => getId(item) !== id) ?? items;
}

function writeFormerStudentCaches(
	queryClient: QueryClient,
	formerStudent: FormerStudentResponse,
) {
	queryClient.setQueryData(keys.detail(formerStudent.accountId), formerStudent);
	queryClient.setQueryData<FormerStudentResponse[]>(keys.list(), current =>
		upsertListItem(current, formerStudent, item => item.accountId),
	);
}

function patchLinkedAccountCaches(
	queryClient: QueryClient,
	accountId: string,
	email: string,
) {
	queryClient.setQueryData<AccountResponse | undefined>(
		accountKeys.detail(accountId),
		current =>
			current
				? {
						...current,
						email,
						auditInfo: createAuditInfo(current.auditInfo),
					}
				: current,
	);
	queryClient.setQueryData<AccountResponse[]>(
		accountKeys.list(),
		current =>
			current?.map(account =>
				account.id === accountId
					? {
							...account,
							email,
							auditInfo: createAuditInfo(account.auditInfo),
						}
					: account,
			) ?? current,
	);
}

function getLinkedUserId(queryClient: QueryClient, accountId: string) {
	const directAccount = queryClient.getQueryData<AccountResponse>(
		accountKeys.detail(accountId),
	);

	if (directAccount) {
		return directAccount.userId;
	}

	const accounts = queryClient.getQueryData<AccountResponse[]>(
		accountKeys.list(),
	);
	return accounts?.find(account => account.id === accountId)?.userId;
}

function patchLinkedUserCaches(
	queryClient: QueryClient,
	userId: string,
	options: {
		cpf: string;
		name: string;
	},
) {
	queryClient.setQueryData<UserResponse | undefined>(
		userKeys.detail(userId),
		current =>
			current
				? {
						...current,
						cpf: options.cpf,
						cpfFormatted: formatCpf(options.cpf),
						name: options.name,
						auditInfo: createAuditInfo(current.auditInfo),
					}
				: current,
	);
	queryClient.setQueryData<UserResponse[]>(
		userKeys.list(),
		current =>
			current?.map(user =>
				user.id === userId
					? {
							...user,
							cpf: options.cpf,
							cpfFormatted: formatCpf(options.cpf),
							name: options.name,
							auditInfo: createAuditInfo(user.auditInfo),
						}
					: user,
			) ?? current,
	);
}

function refreshFormerStudentDirectoryCaches(queryClient: QueryClient) {
	void queryClient.invalidateQueries({
		queryKey: keys.list(),
	});
	void queryClient.invalidateQueries({
		queryKey: accountKeys.list(),
	});
	void queryClient.invalidateQueries({
		queryKey: userKeys.list(),
	});
}

function patchAccountCaches(
	queryClient: QueryClient,
	accountId: string,
	active: boolean,
) {
	queryClient.setQueryData<AccountResponse[]>(
		accountKeys.list(),
		current =>
			current?.map(account =>
				account.id === accountId ? { ...account, active } : account,
			) ?? current,
	);
	queryClient.setQueryData<AccountResponse | undefined>(
		accountKeys.detail(accountId),
		current => (current ? { ...current, active } : current),
	);
}

function hasRemainingAccountsForUser(
	queryClient: QueryClient,
	userId: string,
	removedAccountId: string,
) {
	const accounts = queryClient.getQueryData<AccountResponse[]>(
		accountKeys.list(),
	);

	return (
		accounts?.some(
			account => account.id !== removedAccountId && account.userId === userId,
		) ?? false
	);
}

function removeFormerStudentCaches(
	queryClient: QueryClient,
	{ accountId, userId }: RemoveFormerStudentMutationVariables,
) {
	queryClient.setQueryData<FormerStudentResponse[]>(keys.list(), current =>
		removeListItem(current, accountId, item => item.accountId),
	);
	queryClient.removeQueries({
		queryKey: keys.detail(accountId),
	});
	queryClient.setQueryData<AccountResponse[]>(accountKeys.list(), current =>
		removeListItem(current, accountId, item => item.id),
	);
	queryClient.removeQueries({ queryKey: accountKeys.detail(accountId) });

	if (!hasRemainingAccountsForUser(queryClient, userId, accountId)) {
		queryClient.setQueryData<UserResponse[]>(userKeys.list(), current =>
			removeListItem(current, userId, item => item.id),
		);
		queryClient.removeQueries({ queryKey: userKeys.detail(userId) });
	}
}

export function useCreateFormerStudentMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ body }: FormerStudentCreateMutationVariables) => {
			const formerStudent = await create(body);
			return { body, formerStudent };
		},
		onSuccess: ({ body, formerStudent }) => {
			writeFormerStudentCaches(queryClient, formerStudent);
			patchLinkedAccountCaches(
				queryClient,
				formerStudent.accountId,
				body.email,
			);
			const userId = getLinkedUserId(queryClient, formerStudent.accountId);
			if (userId) {
				patchLinkedUserCaches(queryClient, userId, {
					cpf: body.cpf,
					name: body.name,
				});
			}
			refreshFormerStudentDirectoryCaches(queryClient);
		},
	});
}

export function useUpdateFormerStudentMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, body }: FormerStudentUpdateMutationVariables) =>
			update(id, body),
		onSuccess: (formerStudent, variables) => {
			writeFormerStudentCaches(queryClient, formerStudent);
			patchLinkedAccountCaches(
				queryClient,
				formerStudent.accountId,
				variables.body.email,
			);
			const userId = getLinkedUserId(queryClient, formerStudent.accountId);
			if (userId) {
				patchLinkedUserCaches(queryClient, userId, {
					cpf: variables.body.cpf,
					name: variables.body.name,
				});
			}
			refreshFormerStudentDirectoryCaches(queryClient);
		},
	});
}

export function useSetFormerStudentActiveMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ active, id }: FormerStudentSetActiveMutationVariables) =>
			setActive(id, active),
		onSuccess: (_data, variables) => {
			patchAccountCaches(queryClient, variables.id, variables.active);
		},
	});
}

export function useRemoveFormerStudentMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ accountId }: RemoveFormerStudentMutationVariables) =>
			remove(accountId),
		onSuccess: (_data, variables) => {
			removeFormerStudentCaches(queryClient, variables);
		},
	});
}
