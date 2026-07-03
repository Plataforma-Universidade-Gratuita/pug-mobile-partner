/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */

export const courseKeys = {
	all: ["academic", "course"] as const,
	list: () => [...courseKeys.all, "list"] as const,
	detail: (id: string) => [...courseKeys.all, "detail", id] as const,
	idleDetail: () => [...courseKeys.all, "detail", "idle"] as const,
};
