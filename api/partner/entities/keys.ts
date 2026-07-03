/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */

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
