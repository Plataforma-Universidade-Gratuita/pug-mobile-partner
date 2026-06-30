import { StyleSheet } from "react-native";

import type {
	AppResolvedTheme,
	PrimitiveSurfaceStyleSpec,
} from "@/types/client";

export function createStyles(
	theme: AppResolvedTheme,
	spec: PrimitiveSurfaceStyleSpec,
) {
	return StyleSheet.create({
		screen: {
			flex: 1,
			backgroundColor: spec.screenBackground,
		},
		content: {
			paddingHorizontal: theme.layout.screenPadding,
			paddingTop: theme.space[5],
			alignItems: "center",
		},
		shell: {
			width: "100%",
			maxWidth: theme.layout.contentMaxWidth,
			gap: theme.space[4],
		},
		summarySection: {
			gap: theme.space[3],
		},
		summaryTop: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			gap: theme.space[2],
		},
		summaryCopy: {
			gap: theme.space[1],
		},
		summaryTitle: {
			fontSize: theme.type.lg,
			lineHeight: theme.type.lg * theme.lineHeight.tight,
		},
		resultsSection: {
			gap: theme.space[3],
		},
		resultsHeader: {
			gap: theme.space[1],
		},
		resultsTitle: {
			fontSize: theme.type.md,
			lineHeight: theme.type.md * theme.lineHeight.tight,
		},
		projectList: {
			gap: theme.space[3],
		},
		stateCard: {
			gap: theme.space[2],
			padding: spec.panelPadding,
			borderWidth: 1,
			borderRadius: spec.panelRadius,
			...theme.shadow.sm,
		},
		stateBadge: {
			alignSelf: "flex-start",
		},
		stateBody: {
			gap: theme.space[1],
		},
	});
}
