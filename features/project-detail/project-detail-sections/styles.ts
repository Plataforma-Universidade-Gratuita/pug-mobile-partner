
import { StyleSheet } from "react-native";

import type {
	AppResolvedTheme,
	PrimitiveSurfaceStyleSpec,
} from "@/types/client";
import { withAlpha } from "@/utils";

export function createStyles(
	theme: AppResolvedTheme,
	spec: PrimitiveSurfaceStyleSpec,
) {
	return StyleSheet.create({
		overviewSection: {
			gap: theme.space[4],
		},
		entitySection: {
			gap: theme.space[4],
		},
		cardHeader: {
			gap: theme.space[3],
		},
		titleRow: {
			alignItems: "flex-start",
			gap: theme.space[2],
		},
		titleCopy: {
			flex: 1,
			gap: theme.space[1],
		},
		loadingDescription: {
			gap: theme.space[1],
		},
		title: {
			color: theme.colors.text,
			flex: 1,
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
			borderRadius: theme.radius.lg,
			borderWidth: 1,
			paddingHorizontal: theme.space[3],
			paddingVertical: theme.space[3],
			gap: theme.space[1],
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
		sectionTitle: {
			color: theme.colors.text,
		},
		entityHeaderBlock: {
			gap: theme.space[3],
		},
		entityTitle: {
			color: theme.colors.text,
			fontSize: theme.type.lg,
			lineHeight: theme.type.lg * theme.lineHeight.tight,
		},
		entityMetaGrid: {
			flexDirection: "row",
			flexWrap: "wrap",
			gap: theme.space[2],
		},
		entityMetaCard: {
			borderRadius: theme.radius.lg,
			borderWidth: 1,
			gap: theme.space[1],
			minWidth: 0,
			paddingHorizontal: theme.space[3],
			paddingVertical: theme.space[3],
		},
		entityCityCard: {
			flexBasis: "38%",
			flexGrow: 0,
			flexShrink: 1,
		},
		entityCnpjCard: {
			flexBasis: "58%",
			flexGrow: 0,
			flexShrink: 0,
		},
		entityAddressCard: {
			borderRadius: theme.radius.lg,
			borderWidth: 1,
			gap: theme.space[1],
			paddingHorizontal: theme.space[3],
			paddingVertical: theme.space[3],
		},
		staffBlock: {
			gap: theme.space[3],
		},
		staffTitle: {
			color: theme.colors.text,
		},
		staffList: {
			gap: theme.space[2],
		},
		staffItem: {
			alignItems: "center",
			borderRadius: theme.radius.lg,
			borderWidth: 1,
			flexDirection: "row",
			gap: theme.space[3],
			paddingHorizontal: theme.space[3],
			paddingVertical: theme.space[3],
		},
		staffAvatar: {
			alignItems: "center",
			borderRadius: theme.radius.circle,
			borderWidth: 1,
			height: 40,
			justifyContent: "center",
			width: 40,
		},
		staffAvatarText: {
			color: theme.colors.brand,
			fontSize: theme.type.sm,
		},
		staffCopy: {
			flex: 1,
			gap: theme.space[1],
		},
		staffEmail: {
			color: withAlpha(theme.colors.text, theme.mode === "dark" ? 0.76 : 0.64),
		},
		sheetContent: {
			gap: theme.space[4],
		},
		sheetHeader: {
			gap: theme.space[1],
		},
		sheetOptions: {
			gap: theme.space[2],
		},
		sheetOption: {
			gap: theme.space[1],
			minHeight: 80,
			justifyContent: "center",
			paddingHorizontal: theme.space[4],
			paddingVertical: theme.space[4],
			borderRadius: theme.radius.xl,
			borderWidth: 1,
		},
		sheetOptionCopy: {
			gap: theme.space[1],
		},
		sheetDangerTitle: {
			color: theme.colors.danger,
		},
	});
}
