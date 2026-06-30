export const cityKeys = {
	all: ["geo", "cities"] as const,
	list: () => [...cityKeys.all, "list"] as const,
	search: (page: number, size: number, name: string) =>
		[...cityKeys.all, "search", page, size, name] as const,
	detail: (id: string) => [...cityKeys.all, "detail", id] as const,
	idleDetail: () => [...cityKeys.all, "detail", "idle"] as const,
};
