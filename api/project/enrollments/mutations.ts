"use client";


import {
	useMutation,
	useQueryClient,
	type QueryClient,
} from "@tanstack/react-query";

import type { EnrollmentResponse } from "@/types/api";
import type {
	EnrollmentCreateMutationVariables,
	EnrollmentDeleteMutationVariables,
	EnrollmentMyStatusMutationVariables,
	EnrollmentStatusMutationVariables,
} from "@/types/client";

import {
	create,
	deleteEnrollment,
	updateMyStatus,
	updateStatus,
} from "./endpoints";
import { enrollmentKeys as keys } from "./keys";

function upsertListItem<TItem>(
	items: TItem[] | undefined,
	nextItem: TItem,
	matches: (item: TItem) => boolean,
) {
	if (!items) {
		return [nextItem];
	}

	const existingIndex = items.findIndex(matches);

	if (existingIndex === -1) {
		return [nextItem, ...items];
	}

	return items.map((item, index) =>
		index === existingIndex ? nextItem : item,
	);
}

function removeListItem<TItem>(
	items: TItem[] | undefined,
	matches: (item: TItem) => boolean,
) {
	return items?.filter(item => !matches(item)) ?? items;
}

function isSameEnrollment(
	item: Pick<EnrollmentResponse, "projectId" | "formerStudentId">,
	projectId: string,
	formerStudentId: string,
) {
	return (
		item.projectId === projectId && item.formerStudentId === formerStudentId
	);
}

function writeEnrollmentCaches(
	queryClient: QueryClient,
	enrollment: EnrollmentResponse,
	options: {
		includeMineDetail?: boolean;
	} = {},
) {
	queryClient.setQueryData(
		keys.detail(enrollment.projectId, enrollment.formerStudentId),
		enrollment,
	);
	queryClient.setQueryData<EnrollmentResponse[]>(keys.list(), current =>
		upsertListItem(current, enrollment, item =>
			isSameEnrollment(item, enrollment.projectId, enrollment.formerStudentId),
		),
	);
	queryClient.setQueryData<EnrollmentResponse[]>(
		keys.projectList(enrollment.projectId),
		current =>
			upsertListItem(current, enrollment, item =>
				isSameEnrollment(
					item,
					enrollment.projectId,
					enrollment.formerStudentId,
				),
			),
	);

	if (options.includeMineDetail) {
		queryClient.setQueryData(keys.mineDetail(enrollment.projectId), enrollment);
	}

	queryClient.invalidateQueries({ queryKey: keys.all });
}

function removeEnrollmentCaches(
	queryClient: QueryClient,
	projectId: string,
	formerStudentId: string,
) {
	queryClient.setQueryData<EnrollmentResponse[]>(keys.list(), current =>
		removeListItem(current, item =>
			isSameEnrollment(item, projectId, formerStudentId),
		),
	);
	queryClient.setQueryData<EnrollmentResponse[]>(
		keys.projectList(projectId),
		current =>
			removeListItem(current, item =>
				isSameEnrollment(item, projectId, formerStudentId),
			),
	);
	queryClient.removeQueries({
		queryKey: keys.detail(projectId, formerStudentId),
	});
	queryClient.removeQueries({
		queryKey: keys.mineDetail(projectId),
	});
	queryClient.invalidateQueries({ queryKey: keys.all });
}

function resolveNextStatus(
	action: EnrollmentStatusMutationVariables["action"],
) {
	switch (action) {
		case "accept":
			return "APPROVED" as const;
		case "cancel":
			return "CANCELED" as const;
		case "complete":
			return "COMPLETED" as const;
		case "reject":
			return "REJECTED" as const;
		case "remove":
		default:
			return "REMOVED" as const;
	}
}

async function runEnrollmentStatusAction({
	action,
	projectId,
	formerStudentId,
}: EnrollmentStatusMutationVariables) {
	return updateStatus(projectId, formerStudentId, resolveNextStatus(action));
}

export function useCreateEnrollmentMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			projectId,
			formerStudentId,
		}: EnrollmentCreateMutationVariables) => create(projectId, formerStudentId),
		onSuccess: enrollment => {
			writeEnrollmentCaches(queryClient, enrollment);
		},
	});
}

export function useEnrollmentStatusMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: runEnrollmentStatusAction,
		onSuccess: enrollment => {
			writeEnrollmentCaches(queryClient, enrollment);
		},
	});
}

export function useMyEnrollmentStatusMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ projectId, status }: EnrollmentMyStatusMutationVariables) =>
			updateMyStatus(projectId, status),
		onSuccess: enrollment => {
			writeEnrollmentCaches(queryClient, enrollment, {
				includeMineDetail: true,
			});
		},
	});
}

export function useDeleteEnrollmentMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			projectId,
			formerStudentId,
		}: EnrollmentDeleteMutationVariables) =>
			deleteEnrollment(projectId, formerStudentId),
		onSuccess: (_data, variables) => {
			removeEnrollmentCaches(
				queryClient,
				variables.projectId,
				variables.formerStudentId,
			);
		},
	});
}
