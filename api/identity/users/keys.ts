/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */

export const userKeys = {
	all: ["identity", "user"] as const,
	list: () => [...userKeys.all, "list"] as const,
	search: (page: number, size: number, filtersKey: string) =>
		[...userKeys.all, "search", page, size, filtersKey] as const,
	detail: (id: string) => [...userKeys.all, "detail", id] as const,
	idleDetail: () => [...userKeys.all, "detail", "idle"] as const,
	me: () => [...userKeys.all, "me"] as const,
};
