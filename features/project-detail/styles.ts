import { StyleSheet } from "react-native";

import type { AppResolvedTheme } from "@/types/client";

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		screen: {
			flex: 1,
		},
		content: {
			paddingHorizontal: theme.layout.screenPadding,
			paddingTop: theme.space[3],
			paddingBottom: theme.space[5],
			alignItems: "center",
		},
		shell: {
			width: "100%",
			maxWidth: theme.layout.contentMaxWidth,
			gap: theme.space[4],
		},
		stateCard: {
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			paddingHorizontal: theme.space[4],
			paddingVertical: theme.space[4],
			gap: theme.space[3],
		},
		stateBadge: {
			alignSelf: "flex-start",
		},
		stateBody: {
			gap: theme.space[1],
		},
	});
}
