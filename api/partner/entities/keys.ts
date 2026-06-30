export const entityKeys = {
	all: ["partner", "entity"] as const,
	list: () => [...entityKeys.all, "list"] as const,
	searchRoot: () => [...entityKeys.all, "search"] as const,
	search: (page: number, size: number, filtersKey: string) =>
		[...entityKeys.searchRoot(), page, size, filtersKey] as const,
	cities: () => [...entityKeys.all, "cities"] as const,
	detail: (id: string) => [...entityKeys.all, "detail", id] as const,
	idleDetail: () => [...entityKeys.all, "detail", "idle"] as const,
};
