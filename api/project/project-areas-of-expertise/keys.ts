export const projectAreaOfExpertiseKeys = {
	all: ["project", "project-areas-of-expertise"] as const,
	projects: (areaOfExpertiseId: string) =>
		[...projectAreaOfExpertiseKeys.all, "projects", areaOfExpertiseId] as const,
	idleProjects: () =>
		[...projectAreaOfExpertiseKeys.all, "projects", "idle"] as const,
};
