"use client";

import { useQuery } from "@tanstack/react-query";

import { get, list } from "./endpoints";
import { courseKeys as keys } from "./keys";

export function useCoursesQuery() {
	return useQuery({
		queryKey: keys.list(),
		queryFn: () => list(),
	});
}

export function useCourseDetailQuery(id: string | null) {
	return useQuery({
		queryKey: id === null ? keys.idleDetail() : keys.detail(id),
		queryFn: () => get(id!),
		enabled: id !== null,
	});
}
