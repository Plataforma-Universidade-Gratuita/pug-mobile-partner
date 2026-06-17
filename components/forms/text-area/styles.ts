import { StyleSheet } from "react-native";
import type { ViewStyle } from "react-native";

import type { AppResolvedTheme } from "@/types/client";

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		shell: {
			backgroundColor: theme.colors.surface2,
			borderColor: theme.colors.border2,
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			minHeight: 132,
			paddingHorizontal: theme.space[3],
			paddingVertical: theme.space[3],
		},
		input: {
			color: theme.colors.text,
			fontSize: theme.type.md,
			lineHeight: theme.type.md * theme.lineHeight.normal,
			minHeight: 96,
			padding: 0,
		},
	});
}

export function getShellStateStyle(
	theme: AppResolvedTheme,
	isFocused: boolean,
	error: boolean,
	isDisabled: boolean,
): ViewStyle {
	if (isDisabled) {
		return {
			opacity: 0.6,
		};
	}

	if (error) {
		return {
			borderColor: theme.colors.danger,
			boxShadow:
				theme.mode === "light"
					? `0 0 0 1px ${theme.colors.danger}, 0 0 0 4px rgba(229, 72, 77, 0.18)`
					: `0 0 0 1px ${theme.colors.danger}, 0 0 0 4px rgba(229, 72, 77, 0.26)`,
		};
	}

	if (isFocused) {
		return {
			borderColor: theme.colors.focusRing,
			boxShadow: `0 0 0 1px ${theme.colors.focusRing}, 0 0 0 4px ${theme.colors.focusHalo}`,
		};
	}

	return {};
}
