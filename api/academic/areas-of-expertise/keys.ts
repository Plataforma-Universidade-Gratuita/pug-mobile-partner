/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */

export const areaOfExpertiseKeys = {
	all: ["academic", "area-of-expertise"] as const,
	list: () => [...areaOfExpertiseKeys.all, "list"] as const,
	detail: (id: string) => [...areaOfExpertiseKeys.all, "detail", id] as const,
	idleDetail: () => [...areaOfExpertiseKeys.all, "detail", "idle"] as const,
};
