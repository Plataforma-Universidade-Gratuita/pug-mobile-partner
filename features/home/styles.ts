import { StyleSheet } from "react-native";

import type { AppResolvedTheme } from "@/types/client";

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.surface1,
			padding: theme.layout.screenPadding,
			justifyContent: "center",
		},
		card: {
			width: "100%",
			maxWidth: theme.layout.contentMaxWidth,
			alignSelf: "center",
		},
		content: {
			gap: theme.space[5],
		},
		devControls: {
			gap: theme.space[3],
		},
		controlGroup: {
			gap: theme.space[2],
		},
		controlLabel: {
			fontSize: theme.type.xs,
			fontWeight: theme.weight.semibold,
			color: theme.colors.muted,
			textTransform: "uppercase",
		},
		controlOptions: {
			flexDirection: "row",
			flexWrap: "wrap",
			gap: theme.space[2],
		},
		detailList: {
			gap: theme.space[3],
		},
		detailItem: {
			gap: theme.space[1],
			borderWidth: 1,
			borderColor: theme.colors.border3,
			borderRadius: theme.radius.lg,
			backgroundColor: theme.colors.surface3,
			padding: theme.space[4],
		},
		detailLabel: {
			fontSize: theme.type.xs,
			fontWeight: theme.weight.semibold,
			color: theme.colors.muted,
			textTransform: "uppercase",
		},
		detailValue: {
			fontSize: theme.type.md,
			lineHeight: theme.type.md * theme.lineHeight.normal,
			color: theme.colors.text,
		},
	});
}
