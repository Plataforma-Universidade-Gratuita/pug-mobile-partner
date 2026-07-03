/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */

export const accountKeys = {
	all: ["identity", "account"] as const,
	list: () => [...accountKeys.all, "list"] as const,
	search: (page: number, size: number, filtersKey: string) =>
		[...accountKeys.all, "search", page, size, filtersKey] as const,
	detail: (id: string) => [...accountKeys.all, "detail", id] as const,
	idleDetail: () => [...accountKeys.all, "detail", "idle"] as const,
	me: () => [...accountKeys.all, "me"] as const,
};
