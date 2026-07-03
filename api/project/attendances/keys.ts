/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */

export const attendanceKeys = {
	all: ["project", "attendance"] as const,
	list: () => [...attendanceKeys.all, "list"] as const,
	search: (page: number, size: number, filtersKey: string) =>
		[...attendanceKeys.all, "search", page, size, filtersKey] as const,
	detail: (id: string) => [...attendanceKeys.all, "detail", id] as const,
	idleDetail: () => [...attendanceKeys.all, "detail", "idle"] as const,
};
