import { Platform, StyleSheet } from "react-native";

import type { AppResolvedTheme } from "@/types/client";

function getNativeShadowStyle(theme: AppResolvedTheme) {
	if (Platform.OS === "web") {
		return {};
	}

	return {
		shadowColor: theme.colors.brand,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: theme.mode === "dark" ? 0.2 : 0.12,
		shadowRadius: 24,
		elevation: 8,
	};
}

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.surface1,
		},
		centered: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: theme.colors.surface1,
			padding: theme.space[5],
		},
		bootIconStack: {
			width: 132,
			height: 132,
			alignItems: "center",
			justifyContent: "center",
		},
		bootHaloOuter: {
			position: "absolute",
			width: 132,
			height: 132,
			borderRadius: 42,
			backgroundColor: theme.colors.brand,
		},
		bootHaloMid: {
			position: "absolute",
			width: 122,
			height: 122,
			borderRadius: 39,
			backgroundColor: theme.colors.brand,
		},
		bootHaloInner: {
			position: "absolute",
			width: 112,
			height: 112,
			borderRadius: 36,
			backgroundColor: theme.colors.brand,
		},
		bootIconFrame: {
			width: 104,
			height: 104,
			borderRadius: 34,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: theme.colors.surface2,
			overflow: "hidden",
			...getNativeShadowStyle(theme),
		},
		bootIcon: {
			width: 104,
			height: 104,
			borderRadius: 34,
		},
		bootText: {
			marginTop: theme.space[4],
			fontSize: theme.type.md,
			color: theme.colors.text,
			fontWeight: theme.weight.medium,
			textAlign: "center",
		},
		bootstrapOverlay: {
			...StyleSheet.absoluteFillObject,
			backgroundColor: theme.colors.surface1,
		},
	});
}
