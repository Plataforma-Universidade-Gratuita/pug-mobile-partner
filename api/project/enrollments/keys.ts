export const enrollmentKeys = {
	all: ["project", "enrollment"] as const,
	list: () => [...enrollmentKeys.all, "list"] as const,
	projectList: (projectId: string) =>
		[...enrollmentKeys.all, "list", "project", projectId] as const,
	idleProjectList: () =>
		[...enrollmentKeys.all, "list", "project", "idle"] as const,
	search: (page: number, size: number, filtersKey: string) =>
		[...enrollmentKeys.all, "search", page, size, filtersKey] as const,
	detail: (projectId: string, formerStudentId: string) =>
		[...enrollmentKeys.all, "detail", projectId, formerStudentId] as const,
	mineDetail: (projectId: string) =>
		[...enrollmentKeys.all, "detail", "mine", projectId] as const,
	idleDetail: () => [...enrollmentKeys.all, "detail", "idle", "idle"] as const,
	idleMineDetail: () =>
		[...enrollmentKeys.all, "detail", "mine", "idle"] as const,
};
