
import { StyleSheet } from "react-native";

import type { AppResolvedTheme } from "@/types/client";
import { withAlpha } from "@/utils";

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		actionButton: {
			alignItems: "center",
			alignSelf: "stretch",
			borderRadius: theme.radius.lg,
			justifyContent: "center",
			paddingHorizontal: theme.space[3],
			paddingVertical: theme.space[2],
		},
		actionButtonPressed: {
			backgroundColor: withAlpha(
				theme.colors.text,
				theme.mode === "dark" ? 0.08 : 0.05,
			),
		},
		actionLabel: {
			fontWeight: theme.weight.semibold,
		},
		content: {
			flex: 1,
			gap: theme.space[1],
		},
		description: {
			fontFamily: theme.font.sans,
			fontSize: theme.type.sm,
			lineHeight: theme.lineHeight.normal,
		},
		iconWrap: {
			alignItems: "center",
			borderRadius: theme.radius.circle,
			height: 28,
			justifyContent: "center",
			width: 28,
		},
		message: {
			alignItems: "center",
			flexDirection: "row",
			gap: theme.space[3],
		},
		snackbar: {
			borderRadius: theme.radius.xl,
			borderWidth: theme.mode === "dark" ? 1 : 0,
			paddingHorizontal: theme.space[4],
			paddingVertical: theme.space[3],
		},
		title: {
			fontFamily: theme.font.sans,
			fontSize: theme.type.sm,
			fontWeight: theme.weight.semibold,
			lineHeight: theme.lineHeight.normal,
		},
		wrapper: {
			left: 0,
			paddingHorizontal: theme.layout.screenPadding,
			position: "absolute",
			right: 0,
		},
	});
}
