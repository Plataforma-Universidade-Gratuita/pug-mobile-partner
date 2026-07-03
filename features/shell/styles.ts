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
			backgroundColor: spec.screenBackground,
		},
		content: {
			flex: 1,
			paddingHorizontal: theme.layout.screenPadding,
			paddingVertical: theme.space[6],
			gap: theme.space[5],
		},
		panel: {
			gap: theme.space[4],
			padding: spec.panelPadding,
			borderWidth: 1,
			borderColor: spec.panelBorder,
			borderRadius: spec.panelRadius,
			backgroundColor: spec.panelBackground,
			...theme.shadow.lg,
		},
		badge: {
			alignSelf: "flex-start",
		},
		body: {
			gap: theme.space[2],
		},
	});
}
