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
			paddingBottom: theme.space[5],
			alignItems: "center",
		},
		shell: {
			width: "100%",
			maxWidth: theme.layout.contentMaxWidth,
			gap: theme.space[4],
		},
		heroSection: {
			gap: theme.space[3],
		},
		heroHeader: {
			gap: theme.space[3],
		},
		heroCopy: {
			flex: 1,
			gap: theme.space[1],
		},
		titleRow: {
			alignItems: "flex-start",
			flexDirection: "row",
			gap: theme.space[2],
		},
		heroTitle: {
			color: theme.colors.text,
			flex: 1,
		},
		metricGrid: {
			flexDirection: "row",
			gap: theme.space[2],
		},
		metricCard: {
			flex: 1,
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			paddingHorizontal: theme.space[3],
			paddingVertical: theme.space[3],
			gap: theme.space[1],
		},
		metricValue: {
			color: theme.colors.text,
		},
		validationSection: {
			gap: theme.space[3],
		},
		sectionTitle: {
			color: theme.colors.text,
		},
		rowGroup: {
			gap: theme.space[3],
		},
		row: {
			gap: theme.space[1],
		},
		actions: {
			gap: theme.space[2],
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
