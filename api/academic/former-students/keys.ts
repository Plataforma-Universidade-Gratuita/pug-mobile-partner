/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */

export const formerStudentKeys = {
	all: ["academic", "former-student"] as const,
	list: () => [...formerStudentKeys.all, "list"] as const,
	detail: (id: string) => [...formerStudentKeys.all, "detail", id] as const,
	idleDetail: () => [...formerStudentKeys.all, "detail", "idle"] as const,
	me: () => [...formerStudentKeys.all, "me"] as const,
};
