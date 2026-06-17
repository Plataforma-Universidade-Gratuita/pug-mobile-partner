import { StyleSheet } from "react-native";

import type { AppResolvedTheme } from "@/types/client";

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
		bootText: {
			marginTop: theme.space[4],
			fontSize: theme.type.md,
			color: theme.colors.text,
		},
		bootstrapOverlay: {
			...StyleSheet.absoluteFillObject,
			backgroundColor: theme.colors.surface1,
		},
	});
}
