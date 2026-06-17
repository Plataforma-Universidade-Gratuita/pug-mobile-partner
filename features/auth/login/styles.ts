import { StyleSheet } from "react-native";

import type { AppResolvedTheme } from "@/types/client";

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: "center",
			backgroundColor: theme.colors.surface1,
			padding: theme.layout.screenPadding,
		},
		card: {
			width: "100%",
			maxWidth: 480,
			alignSelf: "center",
		},
		cardContent: {
			gap: theme.space[5],
		},
		brand: {
			fontSize: theme.type.xxl,
			fontWeight: theme.weight.bold,
			lineHeight: theme.type.xxl * theme.lineHeight.tight,
			color: theme.colors.text,
		},
		subtitle: {
			fontSize: theme.type.sm,
			lineHeight: theme.type.sm * theme.lineHeight.normal,
			color: theme.colors.muted,
			marginTop: theme.space[1],
		},
		header: {
			gap: theme.space[2],
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
		title: {
			fontSize: theme.type.xl,
			fontWeight: theme.weight.bold,
			lineHeight: theme.type.xl * theme.lineHeight.snug,
			color: theme.colors.text,
		},
		description: {
			fontSize: theme.type.sm,
			lineHeight: theme.type.sm * theme.lineHeight.relaxed,
			color: theme.colors.muted,
		},
		form: {
			gap: theme.space[4],
		},
		field: {
			gap: theme.space[2],
		},
		label: {
			fontSize: theme.type.sm,
			fontWeight: theme.weight.semibold,
			color: theme.colors.text,
		},
		errorText: {
			fontSize: theme.type.xs,
			lineHeight: theme.type.xs * theme.lineHeight.normal,
			color: theme.colors.danger,
		},
		submitButton: {
			width: "100%",
		},
	});
}
