export const staffKeys = {
	all: ["partner", "staff"] as const,
	list: () => [...staffKeys.all, "list"] as const,
	searchRoot: () => [...staffKeys.all, "search"] as const,
	search: (page: number, size: number, filtersKey: string) =>
		[...staffKeys.searchRoot(), page, size, filtersKey] as const,
	detail: (id: string) => [...staffKeys.all, "detail", id] as const,
	idleDetail: () => [...staffKeys.all, "detail", "idle"] as const,
	linkedAccount: (id: string) =>
		[...staffKeys.all, "linked-account", id] as const,
	idleLinkedAccount: () =>
		[...staffKeys.all, "linked-account", "idle"] as const,
	linkedUser: (id: string) => [...staffKeys.all, "linked-user", id] as const,
	idleLinkedUser: () => [...staffKeys.all, "linked-user", "idle"] as const,
	supportingCities: () => [...staffKeys.all, "supporting-cities"] as const,
	supportingEntities: () => [...staffKeys.all, "supporting-entities"] as const,
};
