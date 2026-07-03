/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { Platform, StyleSheet } from "react-native";

import type { AppResolvedTheme } from "@/types/client";

function getNativeShadowStyle(config: {
	color: string;
	opacity: number;
	radius: number;
	offsetY: number;
	elevation: number;
}) {
	if (Platform.OS === "web") {
		return {};
	}

	return {
		shadowColor: config.color,
		shadowOpacity: config.opacity,
		shadowRadius: config.radius,
		shadowOffset: { width: 0, height: config.offsetY },
		elevation: config.elevation,
	};
}

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		brandHeader: {
			paddingHorizontal: theme.layout.screenPadding,
			paddingBottom: theme.space[2],
			position: "relative",
			zIndex: 2,
		},
		brandHeaderRow: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			gap: theme.space[3],
		},
		brandHeaderSlot: {
			width: 40,
			height: 40,
			alignItems: "center",
			justifyContent: "center",
		},
		brandHeaderCenter: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
		},
		brandHeaderTitle: {
			fontSize: theme.type.lg,
			lineHeight: theme.type.lg * theme.lineHeight.tight,
			fontWeight: theme.weight.semibold,
		},
		headerShadowEdge: {
			backgroundColor: theme.colors.surface1,
			bottom: 0,
			height: 1,
			left: 0,
			position: "absolute",
			right: 0,
			...(theme.mode === "dark"
				? getNativeShadowStyle({
						color: theme.colors.overlay,
						opacity: 0.26,
						radius: 22,
						offsetY: 12,
						elevation: 2,
					})
				: getNativeShadowStyle({
						color: theme.colors.text,
						opacity: 0.07,
						radius: 20,
						offsetY: 10,
						elevation: 1,
					})),
		},
		pointerEventsNone: {
			pointerEvents: "none",
		},
	});
}
