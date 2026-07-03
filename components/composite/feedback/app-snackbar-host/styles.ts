import { StyleSheet } from "react-native";

import type { AppResolvedTheme } from "@/types/client";

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		content: {
			gap: theme.space[1],
		},
		description: {
			color: theme.colors.chromeMuted,
			fontFamily: theme.font.sans,
			fontSize: theme.type.sm,
			lineHeight: theme.lineHeight.normal,
		},
		message: {
			alignItems: "flex-start",
			flexDirection: "row",
			gap: theme.space[3],
		},
		snackbar: {
			backgroundColor: theme.colors.chromeBg,
			borderColor: theme.colors.border2,
			borderRadius: theme.radius.xl,
			borderWidth: 1,
		},
		title: {
			color: theme.colors.chromeFg,
			fontFamily: theme.font.sans,
			fontSize: theme.type.sm,
			fontWeight: theme.weight.semibold,
			lineHeight: theme.lineHeight.normal,
		},
		wrapper: {
			paddingHorizontal: theme.layout.screenPadding,
		},
	});
}
