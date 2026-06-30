"use client";

import {
	useMutation,
	useQueryClient,
	type QueryClient,
} from "@tanstack/react-query";

import * as accountApi from "@/api/identity/accounts";
import * as userApi from "@/api/identity/users";
import type { AccountResponse, StaffResponse, UserResponse } from "@/types/api";
import type {
	PatchStaffCachesArgs,
	StaffCreateMutationVariables,
	StaffRemoveMutationVariables,
	StaffSetActiveMutationVariables,
	StaffUpdateMutationVariables,
} from "@/types/client";

import { create, remove, setActive, update } from "./endpoints";
import { staffKeys as keys } from "./keys";

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

function writeStaffCaches(queryClient: QueryClient, staff: StaffResponse) {
	queryClient.setQueryData(keys.detail(staff.account.id), staff);
	queryClient.setQueryData<StaffResponse[]>(keys.list(), current =>
		upsertListItem(current, staff, item => item.account.id),
	);
	queryClient.invalidateQueries({ queryKey: keys.searchRoot() });
}

function patchStaffCaches(
	queryClient: QueryClient,
	{ accountId, accountActive }: PatchStaffCachesArgs,
) {
	queryClient.setQueryData<StaffResponse | undefined>(
		keys.detail(accountId),
		current =>
			current
				? {
						...current,
						account: {
							...current.account,
							active: accountActive,
						},
					}
				: current,
	);
	queryClient.setQueryData<StaffResponse[]>(
		keys.list(),
		current =>
			current?.map(staff =>
				staff.account.id === accountId
					? {
							...staff,
							account: {
								...staff.account,
								active: accountActive,
							},
						}
					: staff,
			) ?? current,
	);
	queryClient.invalidateQueries({ queryKey: keys.searchRoot() });
}

function writeAccountCaches(
	queryClient: QueryClient,
	account: AccountResponse,
) {
	queryClient.setQueryData(accountKeys.detail(account.id), account);
	queryClient.setQueryData(keys.linkedAccount(account.id), account);
	queryClient.setQueryData<AccountResponse[]>(accountKeys.list(), current =>
		upsertListItem(current, account, item => item.id),
	);
	queryClient.setQueryData<AccountResponse | undefined>(
		accountKeys.me(),
		current => (current?.id === account.id ? account : current),
	);
}

function writeUserCaches(queryClient: QueryClient, user: UserResponse) {
	queryClient.setQueryData(userKeys.detail(user.id), user);
	queryClient.setQueryData(keys.linkedUser(user.id), user);
	queryClient.setQueryData<UserResponse[]>(userKeys.list(), current =>
		upsertListItem(current, user, item => item.id),
	);
	queryClient.setQueryData<UserResponse | undefined>(userKeys.me(), current =>
		current?.id === user.id ? user : current,
	);
}

function getCachedUser(queryClient: QueryClient, userId: string) {
	const directUser = queryClient.getQueryData<UserResponse>(
		userKeys.detail(userId),
	);

	if (directUser) {
		return directUser;
	}

	const linkedUser = queryClient.getQueryData<UserResponse>(
		keys.linkedUser(userId),
	);

	if (linkedUser) {
		return linkedUser;
	}

	const users = queryClient.getQueryData<UserResponse[]>(userKeys.list());
	return users?.find(user => user.id === userId);
}

function removeStaffCaches(
	queryClient: QueryClient,
	{ accountId, userId }: StaffRemoveMutationVariables,
) {
	queryClient.setQueryData<StaffResponse[]>(keys.list(), current =>
		removeListItem(current, accountId, item => item.account.id),
	);
	queryClient.removeQueries({ queryKey: keys.detail(accountId) });
	queryClient.removeQueries({
		queryKey: keys.linkedAccount(accountId),
	});
	queryClient.removeQueries({ queryKey: keys.linkedUser(userId) });
	queryClient.invalidateQueries({ queryKey: keys.searchRoot() });

	queryClient.setQueryData<AccountResponse[]>(accountKeys.list(), current =>
		removeListItem(current, accountId, item => item.id),
	);
	queryClient.removeQueries({ queryKey: accountKeys.detail(accountId) });
	queryClient.setQueryData<AccountResponse | undefined>(
		accountKeys.me(),
		current => (current?.id === accountId ? undefined : current),
	);

	queryClient.setQueryData<UserResponse[]>(userKeys.list(), current =>
		removeListItem(current, userId, item => item.id),
	);
	queryClient.removeQueries({ queryKey: userKeys.detail(userId) });
	queryClient.setQueryData<UserResponse | undefined>(userKeys.me(), current =>
		current?.id === userId ? undefined : current,
	);
}

export function useCreateStaffMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ body }: StaffCreateMutationVariables) => {
			const staff = await create(body);
			return { body, staff };
		},
		onSuccess: ({ body, staff }) => {
			writeStaffCaches(queryClient, staff);
			writeAccountCaches(queryClient, staff.account);

			const existingUser = getCachedUser(queryClient, staff.account.userId);
			writeUserCaches(queryClient, {
				id: staff.account.userId,
				cpf: body.cpf,
				cpfFormatted: formatCpf(body.cpf),
				name: body.name,
				auditInfo: createAuditInfo(existingUser?.auditInfo),
			});
		},
	});
}

export function useUpdateStaffMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, body }: StaffUpdateMutationVariables) =>
			update(id, body),
		onSuccess: (staff, variables) => {
			writeStaffCaches(queryClient, staff);
			writeAccountCaches(queryClient, {
				...staff.account,
				email: variables.body.email,
				auditInfo: createAuditInfo(staff.account.auditInfo),
			});

			const existingUser = getCachedUser(queryClient, staff.account.userId);

			if (!existingUser) {
				return;
			}

			writeUserCaches(queryClient, {
				...existingUser,
				name: variables.body.name,
				auditInfo: createAuditInfo(existingUser.auditInfo),
			});
		},
	});
}

export function useSetStaffActiveMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ active, id }: StaffSetActiveMutationVariables) =>
			setActive(id, active),
		onSuccess: (_data, variables) => {
			patchStaffCaches(queryClient, {
				accountId: variables.id,
				accountActive: variables.active,
			});

			queryClient.setQueryData<AccountResponse | undefined>(
				accountKeys.detail(variables.id),
				current =>
					current
						? {
								...current,
								active: variables.active,
								auditInfo: createAuditInfo(current.auditInfo),
							}
						: current,
			);
			queryClient.setQueryData<AccountResponse | undefined>(
				keys.linkedAccount(variables.id),
				current =>
					current
						? {
								...current,
								active: variables.active,
								auditInfo: createAuditInfo(current.auditInfo),
							}
						: current,
			);
			queryClient.setQueryData<AccountResponse[]>(
				accountKeys.list(),
				current =>
					current?.map(account =>
						account.id === variables.id
							? {
									...account,
									active: variables.active,
									auditInfo: createAuditInfo(account.auditInfo),
								}
							: account,
					) ?? current,
			);
		},
	});
}

export function useRemoveStaffMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ accountId }: StaffRemoveMutationVariables) =>
			remove(accountId),
		onSuccess: (_data, variables) => {
			removeStaffCaches(queryClient, variables);
		},
	});
}
