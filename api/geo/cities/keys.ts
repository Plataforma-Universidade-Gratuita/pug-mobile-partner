/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */

export const cityKeys = {
	all: ["geo", "cities"] as const,
	list: () => [...cityKeys.all, "list"] as const,
	search: (page: number, size: number, name: string) =>
		[...cityKeys.all, "search", page, size, name] as const,
	detail: (id: string) => [...cityKeys.all, "detail", id] as const,
	idleDetail: () => [...cityKeys.all, "detail", "idle"] as const,
};
