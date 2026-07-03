/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { StyleSheet } from "react-native";

import type {
	AppResolvedTheme,
	PrimitiveSurfaceStyleSpec,
} from "@/types/client";

export function createStyles(
	theme: AppResolvedTheme,
	spec: PrimitiveSurfaceStyleSpec,
) {
	return StyleSheet.create({
		screen: {
			flex: 1,
		},
		content: {
			paddingHorizontal: theme.layout.screenPadding,
			paddingTop: theme.space[3],
			alignItems: "center",
		},
		shell: {
			width: "100%",
			maxWidth: theme.layout.contentMaxWidth,
			gap: theme.space[6],
		},
		stateCard: {
			gap: theme.space[3],
			paddingHorizontal: theme.space[4],
			paddingVertical: theme.space[4],
			borderWidth: 1,
			borderRadius: theme.radius.xl,
			backgroundColor: spec.panelBackground,
			borderColor: spec.panelBorder,
		},
		stateBadge: {
			alignSelf: "flex-start",
		},
		stateCopy: {
			gap: theme.space[1],
		},
	});
}
