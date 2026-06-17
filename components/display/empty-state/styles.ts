import { StyleSheet } from "react-native";

import type { AppResolvedTheme } from "@/types/client";

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		root: {
			alignItems: "center",
			backgroundColor: theme.colors.surface3,
			borderColor: theme.colors.border2,
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			gap: theme.space[4],
			paddingHorizontal: theme.space[5],
			paddingVertical: theme.space[6],
			...theme.shadow.sm,
		},
		iconShell: {
			alignItems: "center",
			backgroundColor: theme.colors.surface2,
			borderRadius: theme.radius.xl,
			height: 56,
			justifyContent: "center",
			width: 56,
		},
		copy: {
			alignItems: "center",
			gap: theme.space[2],
			maxWidth: 420,
		},
		title: {
			color: theme.colors.text,
			fontSize: theme.type.lg,
			fontWeight: theme.weight.bold,
			letterSpacing: 0,
			lineHeight: theme.type.lg * theme.lineHeight.snug,
			textAlign: "center",
		},
		description: {
			color: theme.colors.muted,
			fontSize: theme.type.sm,
			lineHeight: theme.type.sm * theme.lineHeight.relaxed,
			textAlign: "center",
		},
		content: {
			alignSelf: "stretch",
			width: "100%",
		},
		actions: {
			alignItems: "center",
			flexDirection: "row",
			flexWrap: "wrap",
			gap: theme.space[3],
			justifyContent: "center",
		},
	});
}
