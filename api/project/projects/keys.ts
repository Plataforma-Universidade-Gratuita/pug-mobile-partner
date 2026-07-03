/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */

export const projectKeys = {
	all: ["project", "project"] as const,
	list: () => [...projectKeys.all, "list"] as const,
	search: (page: number, size: number, filtersKey: string) =>
		[...projectKeys.all, "search", page, size, filtersKey] as const,
	detail: (id: string) => [...projectKeys.all, "detail", id] as const,
	idleDetail: () => [...projectKeys.all, "detail", "idle"] as const,
	areasOfExpertise: (id: string) =>
		[...projectKeys.all, "areas-of-expertise", id] as const,
	idleAreasOfExpertise: () =>
		[...projectKeys.all, "areas-of-expertise", "idle"] as const,
};
