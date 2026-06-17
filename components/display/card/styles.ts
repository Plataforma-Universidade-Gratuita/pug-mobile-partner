import { StyleSheet } from "react-native";

import type { AppResolvedTheme } from "@/types/client";

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		root: {
			backgroundColor: theme.colors.surface3,
			borderColor: theme.colors.border2,
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			...theme.shadow.sm,
		},
		header: {
			alignItems: "flex-start",
			flexDirection: "row",
			gap: theme.space[2],
			paddingHorizontal: theme.space[5],
			paddingTop: theme.space[5],
		},
		headerCopy: {
			flex: 1,
			gap: theme.space[2],
			minWidth: 0,
		},
		headerIcon: {
			alignItems: "center",
			backgroundColor: theme.colors.surface2,
			borderRadius: theme.radius.lg,
			height: 40,
			justifyContent: "center",
			width: 40,
		},
		title: {
			color: theme.colors.text,
			fontSize: theme.type.sm,
			fontWeight: theme.weight.bold,
			letterSpacing: 0,
			lineHeight: theme.type.sm * theme.lineHeight.snug,
		},
		description: {
			color: theme.colors.muted,
			fontSize: theme.type.sm,
			letterSpacing: 0,
			lineHeight: theme.type.sm * theme.lineHeight.relaxed,
			maxWidth: 480,
		},
		content: {
			minWidth: 0,
			padding: theme.space[5],
		},
		footer: {
			alignItems: "center",
			flexDirection: "row",
			flexWrap: "wrap",
			gap: theme.space[3],
			justifyContent: "flex-end",
			paddingHorizontal: theme.space[5],
			paddingBottom: theme.space[5],
			paddingTop: theme.space[1],
		},
	});
}
