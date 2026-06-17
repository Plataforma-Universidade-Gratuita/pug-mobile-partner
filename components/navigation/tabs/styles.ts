import { StyleSheet } from "react-native";
import type { TextStyle, ViewStyle } from "react-native";

import type { AppResolvedTheme, TabsVariant } from "@/types/client";

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		root: {
			gap: theme.space[4],
		},
		trigger: {
			alignItems: "center",
			borderRadius: theme.radius.lg,
			flexDirection: "row",
			gap: theme.space[2],
			justifyContent: "center",
			minHeight: 40,
			paddingHorizontal: theme.space[3],
			paddingVertical: theme.space[2],
		},
		icon: {
			alignItems: "center",
			justifyContent: "center",
		},
		content: {
			backgroundColor: theme.colors.surface3,
			borderColor: theme.colors.border2,
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			padding: theme.space[4],
		},
	});
}

export function getListStyle(
	theme: AppResolvedTheme,
	variant: TabsVariant,
): ViewStyle {
	return {
		alignItems: "center",
		backgroundColor: theme.colors.surface1,
		borderColor: theme.colors.border2,
		borderRadius: theme.radius.xl,
		borderWidth: 1,
		gap: theme.space[2],
		padding: theme.space[2],
	};
}

export function getTriggerStyle(
	theme: AppResolvedTheme,
	variant: TabsVariant,
	selected: boolean,
	pressed: boolean,
	disabled?: boolean,
): ViewStyle {
	return {
		backgroundColor: selected
			? theme.colors.surface2
			: pressed
				? theme.colors.surfaceHighlight
				: "transparent",
		minWidth: variant === "icon" ? 72 : undefined,
		opacity: disabled ? 0.55 : 1,
		...(selected ? theme.shadow.sm : {}),
	};
}

export function getLabelStyle(
	theme: AppResolvedTheme,
	selected: boolean,
	disabled?: boolean,
): TextStyle {
	return {
		color: disabled
			? theme.colors.muted
			: selected
				? theme.colors.text
				: theme.colors.muted,
		fontSize: theme.type.sm,
		fontWeight: selected ? theme.weight.semibold : theme.weight.medium,
		letterSpacing: 0,
		lineHeight: theme.type.sm * theme.lineHeight.snug,
	};
}
