/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { StyleSheet } from "react-native";

import type { AppResolvedTheme } from "@/types/client";

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		header: {
			gap: theme.space[3],
		},
		headerRow: {
			flexDirection: "row",
			alignItems: "center",
			gap: theme.space[3],
		},
		headerCopy: {
			flex: 1,
			gap: theme.space[1],
		},
		rightAccessory: {
			alignItems: "flex-end",
			justifyContent: "center",
		},
	});
}
