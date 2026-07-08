"use client";


import { useQuery } from "@tanstack/react-query";

import { buildAttendanceComplexSearchRequest } from "@/api/utils";
import type { AttendanceComplexSearchFilters } from "@/types/client";

import { get, list, search } from "./endpoints";
import { attendanceKeys as keys } from "./keys";

export function useAttendancesQuery(enabled = true) {
	return useQuery({
		queryKey: keys.list(),
		queryFn: () => list(),
		enabled,
	});
}

export function useAttendancesByFormerStudentQuery(
	formerStudentId: string | null,
) {
	const filters: AttendanceComplexSearchFilters = {
		projectIds: [],
		formerStudentIds: formerStudentId ? [formerStudentId] : [],
		statuses: [],
		validatedByIds: [],
		durationFrom: "",
		durationTo: "",
		dateFrom: "",
		dateTo: "",
	};
	const complexSearchRequest = buildAttendanceComplexSearchRequest(filters);
	const filtersKey = JSON.stringify(complexSearchRequest);

	return useQuery({
		queryKey:
			formerStudentId === null
				? keys.search(0, 100, "idle")
				: keys.search(0, 100, filtersKey),
		queryFn: async () => {
			const response = await search(
				{
					page: 0,
					size: 100,
				},
				complexSearchRequest,
			);

			return response.content;
		},
		enabled: formerStudentId !== null,
	});
}

export function useAttendancesSearchQuery(
	page: number,
	size: number,
	filters: AttendanceComplexSearchFilters,
	enabled = true,
) {
	const complexSearchRequest = buildAttendanceComplexSearchRequest(filters);
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

export function useAttendanceDetailQuery(id: string | null) {
	return useQuery({
		queryKey: id === null ? keys.idleDetail() : keys.detail(id),
		queryFn: () => get(id!),
		enabled: id !== null,
	});
}
