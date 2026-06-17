import { StyleSheet } from "react-native";

import type { AppResolvedTheme } from "@/types/client";

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		frame: {
			alignItems: "center",
			flex: 1,
			justifyContent: "center",
			padding: theme.space[5],
		},
		overlay: {
			backgroundColor: theme.colors.overlay,
			bottom: 0,
			left: 0,
			position: "absolute",
			right: 0,
			top: 0,
		},
		panel: {
			backgroundColor: theme.colors.surface3,
			borderColor: theme.colors.border2,
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			maxHeight: "85%",
			maxWidth: 560,
			width: "100%",
			...theme.shadow.lg,
		},
		header: {
			alignItems: "flex-start",
			borderBottomColor: theme.colors.border3,
			borderBottomWidth: 1,
			flexDirection: "row",
			gap: theme.space[3],
			justifyContent: "space-between",
			padding: theme.space[5],
		},
		copy: {
			flex: 1,
			gap: theme.space[1],
			minWidth: 0,
		},
		title: {
			color: theme.colors.text,
			fontSize: theme.type.xl,
			fontWeight: theme.weight.bold,
			letterSpacing: 0,
			lineHeight: theme.type.xl * theme.lineHeight.snug,
		},
		description: {
			color: theme.colors.muted,
			fontSize: theme.type.sm,
			lineHeight: theme.type.sm * theme.lineHeight.relaxed,
		},
		body: {
			gap: theme.space[4],
			padding: theme.space[5],
		},
		footer: {
			alignItems: "center",
			borderTopColor: theme.colors.border3,
			borderTopWidth: 1,
			flexDirection: "row",
			flexWrap: "wrap",
			gap: theme.space[3],
			justifyContent: "flex-end",
			padding: theme.space[5],
		},
	});
}
