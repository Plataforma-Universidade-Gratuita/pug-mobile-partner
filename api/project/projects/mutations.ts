"use client";

import {
	useMutation,
	useQueryClient,
	type QueryClient,
} from "@tanstack/react-query";

import type { ProjectResponse } from "@/types/api";
import type {
	ProjectCreateMutationVariables,
	ProjectRemoveMutationVariables,
	ProjectStatusMutationVariables,
	ProjectUpdateMutationVariables,
} from "@/types/client";

import * as projectAreasOfExpertise from "../project-areas-of-expertise";
import { create, remove, update, updateStatus } from "./endpoints";
import { projectKeys as keys } from "./keys";

const { createAssociations, deleteAllByProject } = projectAreasOfExpertise;

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

function writeProjectCaches(
	queryClient: QueryClient,
	project: ProjectResponse,
) {
	queryClient.setQueryData(keys.detail(project.id), project);
	queryClient.setQueryData<ProjectResponse[]>(keys.list(), current =>
		upsertListItem(current, project, item => item.id),
	);
	queryClient.invalidateQueries({ queryKey: keys.all });
}

function removeProjectCaches(queryClient: QueryClient, projectId: string) {
	queryClient.setQueryData<ProjectResponse[]>(keys.list(), current =>
		removeListItem(current, projectId, item => item.id),
	);
	queryClient.removeQueries({ queryKey: keys.detail(projectId) });
	queryClient.removeQueries({
		queryKey: keys.areasOfExpertise(projectId),
	});
	queryClient.invalidateQueries({ queryKey: keys.all });
}

async function runProjectStatusAction({
	action,
	id,
}: ProjectStatusMutationVariables) {
	switch (action) {
		case "cancel":
			return updateStatus(id, "CANCELED");
		case "complete":
			return updateStatus(id, "COMPLETED");
		case "hold":
			return updateStatus(id, "ON_HOLD");
		case "retake":
			return updateStatus(id, "IN_PROGRESS");
		case "start":
		default:
			return updateStatus(id, "IN_PROGRESS");
	}
}

export function useCreateProjectMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ body }: ProjectCreateMutationVariables) => create(body),
		onSuccess: project => {
			writeProjectCaches(queryClient, project);
		},
	});
}

export function useUpdateProjectMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ body, id }: ProjectUpdateMutationVariables) =>
			update(id, body),
		onSuccess: project => {
			writeProjectCaches(queryClient, project);
		},
	});
}

export function useSetProjectAreasOfExpertiseMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			areaOfExpertiseIds,
			projectId,
		}: {
			areaOfExpertiseIds: string[];
			projectId: string;
		}) => {
			await deleteAllByProject(projectId);

			if (areaOfExpertiseIds.length > 0) {
				await createAssociations(projectId, { areaOfExpertiseIds });
			}
		},
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({
				queryKey: keys.areasOfExpertise(variables.projectId),
			});
		},
	});
}

export function useRemoveProjectMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id }: ProjectRemoveMutationVariables) => remove(id),
		onSuccess: (_data, variables) => {
			removeProjectCaches(queryClient, variables.id);
		},
	});
}

export function useProjectStatusMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: runProjectStatusAction,
		onSuccess: project => {
			writeProjectCaches(queryClient, project);
		},
	});
}
