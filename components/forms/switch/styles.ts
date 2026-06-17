import { StyleSheet } from "react-native";

import type { AppResolvedTheme } from "@/types/client";

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		root: {
			alignItems: "center",
			flexDirection: "row",
			gap: theme.space[3],
			justifyContent: "space-between",
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

export function getTrackColor(theme: AppResolvedTheme, checked: boolean) {
	return checked ? theme.colors.brand : theme.colors.border1;
}

export function getThumbColor(theme: AppResolvedTheme, checked: boolean) {
	return checked ? theme.colors.chromeFg : theme.colors.surface2;
}
