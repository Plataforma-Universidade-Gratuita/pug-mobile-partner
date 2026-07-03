/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import type { AppResolvedTheme } from "@/types/client";

export function getTabScreenContentBottomPadding(
	theme: AppResolvedTheme,
	bottomInset: number,
) {
	return (
		theme.space[8] + theme.space[4] + Math.max(bottomInset, theme.space[4])
	);
}
