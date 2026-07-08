"use client";


import { useQuery } from "@tanstack/react-query";

import { get, getMe, list } from "./endpoints";
import { formerStudentKeys as keys } from "./keys";

export function useFormerStudentsQuery() {
	return useQuery({
		queryKey: keys.list(),
		queryFn: () => list(),
	});
}

export function useFormerStudentDetailQuery(id: string | null) {
	return useQuery({
		queryKey: id === null ? keys.idleDetail() : keys.detail(id),
		queryFn: () => get(id!),
		enabled: id !== null,
	});
}

export function useCurrentFormerStudentQuery() {
	return useQuery({
		queryKey: keys.me(),
		queryFn: getMe,
	});
}
