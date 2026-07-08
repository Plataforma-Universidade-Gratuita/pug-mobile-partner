export const areaOfExpertiseKeys = {
	all: ["academic", "area-of-expertise"] as const,
	list: () => [...areaOfExpertiseKeys.all, "list"] as const,
	detail: (id: string) => [...areaOfExpertiseKeys.all, "detail", id] as const,
	idleDetail: () => [...areaOfExpertiseKeys.all, "detail", "idle"] as const,
};
