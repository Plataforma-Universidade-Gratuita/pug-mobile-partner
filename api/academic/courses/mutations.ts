"use client";

import {
	useMutation,
	useQueryClient,
	type QueryClient,
} from "@tanstack/react-query";

import type { CourseResponse } from "@/types/api";
import type {
	CourseCreateMutationVariables,
	CourseUpdateMutationVariables,
	RemoveCourseMutationVariables,
} from "@/types/client";

import { create, remove, update } from "./endpoints";
import { courseKeys as keys } from "./keys";

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

function writeCourseCaches(queryClient: QueryClient, course: CourseResponse) {
	queryClient.setQueryData(keys.detail(course.id), course);
	queryClient.setQueryData<CourseResponse[]>(keys.list(), current =>
		upsertListItem(current, course, item => item.id),
	);
}

function removeCourseCaches(queryClient: QueryClient, courseId: string) {
	queryClient.setQueryData<CourseResponse[]>(keys.list(), current =>
		removeListItem(current, courseId, item => item.id),
	);
	queryClient.removeQueries({ queryKey: keys.detail(courseId) });
}

export function useCreateCourseMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ body }: CourseCreateMutationVariables) => create(body),
		onSuccess: course => {
			writeCourseCaches(queryClient, course);
		},
	});
}

export function useUpdateCourseMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, body }: CourseUpdateMutationVariables) =>
			update(id, body),
		onSuccess: course => {
			writeCourseCaches(queryClient, course);
		},
	});
}

export function useRemoveCourseMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id }: RemoveCourseMutationVariables) => remove(id),
		onSuccess: (_data, variables) => {
			removeCourseCaches(queryClient, variables.id);
		},
	});
}
