"use client";

import {
	useMutation,
	useQueryClient,
	type QueryClient,
} from "@tanstack/react-query";

import type { AttendanceResponse } from "@/types/api";
import type {
	AttendanceCreateMutationVariables,
	AttendanceRemoveMutationVariables,
	AttendanceValidateMutationVariables,
} from "@/types/client";

import { create, remove, validate } from "./endpoints";
import { attendanceKeys as keys } from "./keys";

function upsertListItem<TItem>(
	items: TItem[] | undefined,
	nextItem: TItem,
	getId: (item: TItem) => string,
) {
	if (!items) return [nextItem];
	const nextId = getId(nextItem);
	const existingIndex = items.findIndex(item => getId(item) === nextId);
	if (existingIndex === -1) return [nextItem, ...items];
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

function writeAttendanceCaches(
	queryClient: QueryClient,
	attendance: AttendanceResponse,
) {
	queryClient.setQueryData(keys.detail(attendance.id), attendance);
	queryClient.setQueryData<AttendanceResponse[]>(keys.list(), current =>
		upsertListItem(current, attendance, item => item.id),
	);
	queryClient.invalidateQueries({ queryKey: keys.all });
}

function removeAttendanceCaches(
	queryClient: QueryClient,
	attendanceId: string,
) {
	queryClient.setQueryData<AttendanceResponse[]>(keys.list(), current =>
		removeListItem(current, attendanceId, item => item.id),
	);
	queryClient.removeQueries({
		queryKey: keys.detail(attendanceId),
	});
	queryClient.invalidateQueries({ queryKey: keys.all });
}

export function useCreateAttendanceMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ body }: AttendanceCreateMutationVariables) => create(body),
		onSuccess: attendance => {
			writeAttendanceCaches(queryClient, attendance);
		},
	});
}

export function useValidateAttendanceMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ body, id }: AttendanceValidateMutationVariables) =>
			validate(id, body),
		onSuccess: attendance => {
			writeAttendanceCaches(queryClient, attendance);
		},
	});
}

export function useRemoveAttendanceMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id }: AttendanceRemoveMutationVariables) => remove(id),
		onSuccess: (_data, variables) => {
			removeAttendanceCaches(queryClient, variables.id);
		},
	});
}
