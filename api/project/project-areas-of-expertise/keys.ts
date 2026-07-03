/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */

export const projectAreaOfExpertiseKeys = {
	all: ["project", "project-areas-of-expertise"] as const,
	projects: (areaOfExpertiseId: string) =>
		[...projectAreaOfExpertiseKeys.all, "projects", areaOfExpertiseId] as const,
	idleProjects: () =>
		[...projectAreaOfExpertiseKeys.all, "projects", "idle"] as const,
};
