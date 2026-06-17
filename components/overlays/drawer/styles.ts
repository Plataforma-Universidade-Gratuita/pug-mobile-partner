import { StyleSheet } from "react-native";

import type { AppResolvedTheme } from "@/types/client";

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		frame: {
			flex: 1,
			justifyContent: "flex-end",
		},
		overlay: {
			backgroundColor: theme.colors.overlay,
			bottom: 0,
			left: 0,
			position: "absolute",
			right: 0,
			top: 0,
		},
		sheet: {
			backgroundColor: theme.colors.surface3,
			borderColor: theme.colors.border2,
			borderTopLeftRadius: theme.radius.xl,
			borderTopRightRadius: theme.radius.xl,
			borderWidth: 1,
			borderBottomWidth: 0,
			maxHeight: "88%",
			paddingTop: theme.space[2],
			...theme.shadow.lg,
		},
		handle: {
			alignSelf: "center",
			backgroundColor: theme.colors.border1,
			borderRadius: theme.radius.circle,
			height: 4,
			marginBottom: theme.space[2],
			width: 40,
		},
		header: {
			alignItems: "flex-start",
			borderBottomColor: theme.colors.border3,
			borderBottomWidth: 1,
			flexDirection: "row",
			gap: theme.space[3],
			justifyContent: "space-between",
			paddingHorizontal: theme.space[5],
			paddingBottom: theme.space[4],
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
