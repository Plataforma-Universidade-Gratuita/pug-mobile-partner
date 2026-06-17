import { StyleSheet } from "react-native";
import type { TextStyle, ViewStyle } from "react-native";

import type { AppResolvedTheme } from "@/types/client";

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		trigger: {
			alignItems: "center",
			backgroundColor: theme.colors.surface2,
			borderColor: theme.colors.border2,
			borderRadius: theme.radius.lg,
			borderWidth: 1,
			flexDirection: "row",
			gap: theme.space[3],
			justifyContent: "space-between",
			minHeight: 44,
			paddingHorizontal: theme.space[3],
			paddingVertical: theme.space[3],
		},
		triggerCopy: {
			flex: 1,
			minWidth: 0,
		},
		options: {
			gap: theme.space[2],
		},
		option: {
			alignItems: "center",
			backgroundColor: theme.colors.surface2,
			borderColor: theme.colors.border2,
			borderRadius: theme.radius.lg,
			borderWidth: 1,
			flexDirection: "row",
			gap: theme.space[3],
			justifyContent: "space-between",
			paddingHorizontal: theme.space[4],
			paddingVertical: theme.space[3],
		},
		optionSelected: {
			borderColor: theme.colors.brand,
		},
		optionPressed: {
			backgroundColor: theme.colors.surface1,
		},
		optionDisabled: {
			opacity: 0.5,
		},
		optionCopy: {
			flex: 1,
			gap: 2,
			minWidth: 0,
		},
		optionLabel: {
			color: theme.colors.text,
			fontSize: theme.type.sm,
			fontWeight: theme.weight.medium,
			letterSpacing: 0,
			lineHeight: theme.type.sm * theme.lineHeight.snug,
		},
		optionDescription: {
			color: theme.colors.muted,
			fontSize: theme.type.xs,
			lineHeight: theme.type.xs * theme.lineHeight.relaxed,
		},
		emptyState: {
			alignItems: "center",
			paddingVertical: theme.space[4],
		},
		emptyStateText: {
			color: theme.colors.muted,
			fontSize: theme.type.sm,
			lineHeight: theme.type.sm * theme.lineHeight.relaxed,
			textAlign: "center",
		},
	});
}

export function getTriggerStyle(
	theme: AppResolvedTheme,
	pressed: boolean,
	disabled: boolean,
): ViewStyle {
	if (disabled) {
		return {
			opacity: 0.6,
		};
	}

	return {
		backgroundColor: pressed ? theme.colors.surface1 : theme.colors.surface2,
	};
}

export function getValueTextStyle(
	theme: AppResolvedTheme,
	hasValue: boolean,
): TextStyle {
	return {
		color: hasValue ? theme.colors.text : theme.colors.muted,
		fontSize: theme.type.md,
		lineHeight: theme.type.md * theme.lineHeight.normal,
	};
}
