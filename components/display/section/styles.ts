import { StyleSheet } from "react-native";

import type { AppResolvedTheme } from "@/types/client";

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		root: {
			gap: theme.space[4],
		},
		header: {
			alignItems: "flex-start",
			flexDirection: "row",
			flexWrap: "wrap",
			gap: theme.space[3],
			justifyContent: "space-between",
		},
		copy: {
			flex: 1,
			gap: theme.space[1],
			minWidth: 0,
		},
		title: {
			color: theme.colors.text,
			fontSize: theme.type.lg,
			fontWeight: theme.weight.bold,
			letterSpacing: 0,
			lineHeight: theme.type.lg * theme.lineHeight.snug,
		},
		description: {
			color: theme.colors.muted,
			fontSize: theme.type.sm,
			lineHeight: theme.type.sm * theme.lineHeight.relaxed,
			maxWidth: 560,
		},
		actions: {
			alignItems: "center",
			flexDirection: "row",
			flexWrap: "wrap",
			gap: theme.space[2],
		},
		content: {
			gap: theme.space[4],
		},
	});
}
