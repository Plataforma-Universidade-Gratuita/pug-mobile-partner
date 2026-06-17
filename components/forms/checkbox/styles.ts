import { StyleSheet } from "react-native";
import type { ViewStyle } from "react-native";

import type { AppResolvedTheme } from "@/types/client";

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		root: {
			alignItems: "flex-start",
			flexDirection: "row",
			gap: theme.space[3],
		},
		indicator: {
			alignItems: "center",
			backgroundColor: theme.colors.surface2,
			borderColor: theme.colors.border2,
			borderRadius: theme.radius.sm,
			borderWidth: 1,
			height: 20,
			justifyContent: "center",
			marginTop: 1,
			width: 20,
		},
		copy: {
			flex: 1,
			gap: 2,
			minWidth: 0,
		},
		label: {
			color: theme.colors.text,
			fontSize: theme.type.sm,
			fontWeight: theme.weight.medium,
			letterSpacing: 0,
			lineHeight: theme.type.sm * theme.lineHeight.snug,
		},
		description: {
			color: theme.colors.muted,
			fontSize: theme.type.xs,
			lineHeight: theme.type.xs * theme.lineHeight.relaxed,
		},
		disabled: {
			opacity: 0.6,
		},
	});
}

export function getIndicatorStyle(
	theme: AppResolvedTheme,
	checked: boolean,
): ViewStyle {
	if (!checked) {
		return {};
	}

	return {
		backgroundColor: theme.colors.brand,
		borderColor: theme.colors.brand,
	};
}
