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
		},
		content: {
			paddingHorizontal: theme.layout.screenPadding,
			paddingTop: theme.space[3],
			alignItems: "center",
		},
		shell: {
			width: "100%",
			maxWidth: theme.layout.contentMaxWidth,
			gap: theme.space[6],
		},
		section: {
			gap: theme.space[3],
		},
		sectionHeader: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			gap: theme.space[3],
		},
		sectionTitle: {
			color: theme.colors.text,
		},
		badge: {
			alignSelf: "flex-start",
		},
		metricsGrid: {
			flexDirection: "row",
			flexWrap: "wrap",
			gap: theme.space[2],
		},
		metricCard: {
			flexBasis: "48%",
			flexGrow: 1,
			minWidth: 0,
			gap: theme.space[1],
			paddingHorizontal: theme.space[3],
			paddingVertical: theme.space[3],
			borderWidth: 1,
			borderRadius: theme.radius.lg,
			backgroundColor: theme.colors.surface2,
			borderColor: spec.panelBorder,
		},
		metricValue: {
			color: theme.colors.text,
		},
		progressBlock: {
			gap: theme.space[2],
		},
		progressHeader: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			gap: theme.space[3],
		},
		progressTrack: {
			height: 10,
			borderRadius: theme.radius.circle,
			overflow: "hidden",
			backgroundColor: theme.colors.surface3,
			borderWidth: 1,
			borderColor: spec.panelBorder,
		},
		progressFill: {
			height: "100%",
			borderRadius: theme.radius.circle,
			backgroundColor: theme.colors.brand,
		},
		rows: {
			gap: theme.space[1],
		},
		row: {
			gap: theme.space[1],
			paddingVertical: theme.space[3],
		},
		rowDivider: {
			borderTopWidth: 1,
			borderTopColor: spec.panelBorder,
		},
		rowValue: {
			color: theme.colors.text,
			fontSize: theme.type.md,
			lineHeight: theme.type.md * theme.lineHeight.normal,
		},
		stateCard: {
			gap: theme.space[3],
			paddingHorizontal: theme.space[4],
			paddingVertical: theme.space[4],
			borderWidth: 1,
			borderRadius: theme.radius.xl,
			backgroundColor: spec.panelBackground,
			borderColor: spec.panelBorder,
		},
		stateBadge: {
			alignSelf: "flex-start",
		},
		stateCopy: {
			gap: theme.space[1],
		},
	});
}
