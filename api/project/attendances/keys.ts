export const attendanceKeys = {
	all: ["project", "attendance"] as const,
	list: () => [...attendanceKeys.all, "list"] as const,
	search: (page: number, size: number, filtersKey: string) =>
		[...attendanceKeys.all, "search", page, size, filtersKey] as const,
	detail: (id: string) => [...attendanceKeys.all, "detail", id] as const,
	idleDetail: () => [...attendanceKeys.all, "detail", "idle"] as const,
};
