export const courseKeys = {
	all: ["academic", "course"] as const,
	list: () => [...courseKeys.all, "list"] as const,
	detail: (id: string) => [...courseKeys.all, "detail", id] as const,
	idleDetail: () => [...courseKeys.all, "detail", "idle"] as const,
};
