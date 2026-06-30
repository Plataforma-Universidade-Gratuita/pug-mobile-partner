export const accountKeys = {
	all: ["identity", "account"] as const,
	list: () => [...accountKeys.all, "list"] as const,
	search: (page: number, size: number, filtersKey: string) =>
		[...accountKeys.all, "search", page, size, filtersKey] as const,
	detail: (id: string) => [...accountKeys.all, "detail", id] as const,
	idleDetail: () => [...accountKeys.all, "detail", "idle"] as const,
	me: () => [...accountKeys.all, "me"] as const,
};
