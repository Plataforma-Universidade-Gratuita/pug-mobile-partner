import { StyleSheet } from "react-native";

import type { AppResolvedTheme } from "@/types/client";

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		label: {
			color: theme.colors.text,
			fontSize: theme.type.sm,
			fontWeight: theme.weight.medium,
			letterSpacing: 0,
			lineHeight: theme.type.sm * theme.lineHeight.snug,
		},
	});
}
