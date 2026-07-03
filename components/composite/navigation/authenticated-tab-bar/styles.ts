/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { Platform, StyleSheet } from "react-native";

import type { AppResolvedTheme } from "@/types/client";
import { withAlpha } from "@/utils";

import {
	TAB_BAR_ACTION_GAP,
	TAB_BAR_ACTION_SIZE,
	TAB_BAR_DOCK_PADDING,
} from "./constants";

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

export function createStyles(theme: AppResolvedTheme, bottomInset: number) {
	const bottomPadding = Math.max(bottomInset, theme.space[2]) + theme.space[2];

	return StyleSheet.create({
		container: {
			backgroundColor: "transparent",
			bottom: 0,
			left: 0,
			paddingBottom: bottomPadding,
			paddingHorizontal: theme.layout.screenPadding,
			paddingTop: theme.space[2],
			position: "absolute",
			right: 0,
		},
		shellRow: {
			alignItems: "center",
			alignSelf: "center",
			flexDirection: "row",
			gap: TAB_BAR_ACTION_GAP,
			maxWidth: 392,
			width: "100%",
		},
		dock: {
			backgroundColor: withAlpha(theme.colors.surface1, 0.5),
			borderColor: withAlpha(
				theme.colors.border1,
				theme.mode === "dark" ? 0.34 : 0.58,
			),
			borderRadius: theme.radius.circle,
			borderWidth: 1,
			flex: 1,
			overflow: "visible",
			padding: TAB_BAR_DOCK_PADDING,
			position: "relative",
			...(theme.mode === "dark"
				? getNativeShadowStyle({
						color: theme.colors.overlay,
						opacity: 0.18,
						radius: 16,
						offsetY: 8,
						elevation: 4,
					})
				: getNativeShadowStyle({
						color: theme.colors.text,
						opacity: 0.05,
						radius: 12,
						offsetY: 6,
						elevation: 2,
					})),
		},
		actionButton: {
			alignItems: "center",
			backgroundColor:
				theme.mode === "dark"
					? withAlpha(theme.colors.brand, 0.28)
					: theme.colors.brand,
			borderColor:
				theme.mode === "dark"
					? withAlpha(theme.colors.brand, 0.32)
					: "transparent",
			borderWidth: theme.mode === "dark" ? 1 : 0,
			borderRadius: theme.radius.circle,
			height: TAB_BAR_ACTION_SIZE,
			justifyContent: "center",
			width: TAB_BAR_ACTION_SIZE,
			...(theme.mode === "dark"
				? getNativeShadowStyle({
						color: theme.colors.overlay,
						opacity: 0.24,
						radius: 16,
						offsetY: 8,
						elevation: 4,
					})
				: getNativeShadowStyle({
						color: theme.colors.text,
						opacity: 0.12,
						radius: 12,
						offsetY: 6,
						elevation: 3,
					})),
		},
		actionButtonPressed: {
			opacity: 0.84,
		},
		activePill: {
			backgroundColor: theme.colors.surface3,
			borderColor:
				theme.mode === "dark" ? theme.colors.border2 : theme.colors.border1,
			borderRadius: theme.radius.circle,
			borderWidth: 1,
			bottom: TAB_BAR_DOCK_PADDING,
			position: "absolute",
			top: TAB_BAR_DOCK_PADDING,
			...(theme.mode === "dark"
				? getNativeShadowStyle({
						color: theme.colors.overlay,
						opacity: 0.18,
						radius: 14,
						offsetY: 6,
						elevation: 2,
					})
				: getNativeShadowStyle({
						color: theme.colors.text,
						opacity: 0.06,
						radius: 10,
						offsetY: 4,
						elevation: 1,
					})),
		},
		pointerEventsNone: {
			pointerEvents: "none",
		},
		rail: {
			alignItems: "center",
			flexDirection: "row",
			justifyContent: "center",
			width: "100%",
			zIndex: 1,
		},
		item: {
			alignItems: "center",
			flex: 1,
			height: 52,
			justifyContent: "center",
		},
		itemPressed: {
			opacity: 0.84,
		},
		iconSlot: {
			alignItems: "center",
			height: 24,
			justifyContent: "center",
			width: 24,
		},
	});
}
