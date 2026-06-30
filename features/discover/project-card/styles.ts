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
		card: {
			gap: theme.space[3],
			padding: spec.panelPadding,
			borderWidth: 1,
			borderRadius: spec.panelRadius,
			...theme.shadow.sm,
		},
		badgeRow: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			gap: theme.space[2],
		},
		badgeGroup: {
			flexDirection: "row",
			alignItems: "center",
			flexWrap: "wrap",
			gap: theme.space[2],
		},
		titleRow: {
			flexDirection: "row",
			alignItems: "flex-start",
			gap: theme.space[3],
		},
		titleCopy: {
			flex: 1,
			gap: theme.space[1],
		},
		title: {
			fontSize: theme.type.lg,
			lineHeight: theme.type.lg * theme.lineHeight.tight,
		},
		description: {
			lineHeight: theme.type.sm * theme.lineHeight.normal,
		},
		chevron: {
			marginTop: 2,
		},
		metricsRow: {
			flexDirection: "row",
			alignItems: "stretch",
			gap: theme.space[3],
		},
		metricCard: {
			flex: 1,
			gap: theme.space[1],
			paddingHorizontal: theme.space[3],
			paddingVertical: theme.space[3],
			borderWidth: 1,
			borderRadius: theme.radius.lg,
		},
		metricValue: {
			fontSize: theme.type.md,
			lineHeight: theme.type.md * theme.lineHeight.normal,
		},
	});
}
