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
		summarySection: {
			gap: theme.space[4],
		},
		badge: {
			alignSelf: "flex-start",
		},
		header: {
			gap: theme.space[3],
		},
		headerCopy: {
			gap: theme.space[1],
		},
		title: {
			fontSize: theme.type.xxl,
			lineHeight: theme.type.xxl * theme.lineHeight.tight,
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
		metricsGrid: {
			flexDirection: "row",
			gap: theme.space[2],
		},
		metricCard: {
			flex: 1,
			minWidth: 0,
			borderRadius: theme.radius.lg,
			borderWidth: 1,
			paddingHorizontal: theme.space[3],
			paddingVertical: theme.space[3],
			gap: theme.space[1],
		},
		metricValue: {
			color: theme.colors.text,
		},
		metaRow: {
			flexDirection: "row",
			gap: theme.space[3],
		},
		metaItem: {
			flex: 1,
			gap: theme.space[1],
		},
		section: {
			gap: theme.space[3],
		},
		sectionHeader: {
			gap: theme.space[1],
		},
		actionsGrid: {
			flexDirection: "row",
			flexWrap: "wrap",
			gap: theme.space[2],
		},
		actionCard: {
			flexBasis: "48%",
			flexGrow: 1,
			minWidth: 0,
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			paddingHorizontal: theme.space[4],
			paddingVertical: theme.space[4],
			gap: theme.space[3],
		},
		actionIcon: {
			width: 36,
			height: 36,
			borderRadius: theme.radius.lg,
			alignItems: "center",
			justifyContent: "center",
		},
		actionCopy: {
			gap: theme.space[1],
		},
		snapshotCard: {
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			paddingHorizontal: theme.space[4],
			paddingVertical: theme.space[4],
			gap: theme.space[4],
		},
		snapshotHeader: {
			flexDirection: "row",
			alignItems: "flex-start",
			gap: theme.space[2],
		},
		snapshotCopy: {
			flex: 1,
			gap: theme.space[1],
		},
		snapshotTitle: {
			color: theme.colors.text,
		},
		snapshotAction: {
			marginTop: theme.space[1],
		},
		stateCard: {
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			paddingHorizontal: theme.space[4],
			paddingVertical: theme.space[4],
			gap: theme.space[3],
		},
		stateBody: {
			gap: theme.space[1],
		},
	});
}
