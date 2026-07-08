
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
		headerActions: {
			flexDirection: "row",
			alignItems: "center",
			gap: theme.space[2],
		},
		summarySection: {
			gap: theme.space[3],
		},
		focusCard: {
			gap: theme.space[2],
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			paddingHorizontal: theme.space[4],
			paddingVertical: theme.space[4],
			backgroundColor: spec.panelBackground,
			borderColor: spec.panelBorder,
		},
		focusTitle: {
			color: theme.colors.text,
		},
		chipRow: {
			flexDirection: "row",
			flexWrap: "wrap",
			gap: theme.space[2],
		},
		summaryStrip: {
			flexDirection: "row",
			gap: theme.space[2],
		},
		summaryCard: {
			flex: 1,
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			paddingHorizontal: theme.space[3],
			paddingVertical: theme.space[3],
			gap: theme.space[1],
			backgroundColor: spec.panelBackground,
			borderColor: spec.panelBorder,
		},
		summaryValue: {
			color: theme.colors.text,
		},
		createButtonRow: {
			flexDirection: "row",
		},
		stateCard: {
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			paddingHorizontal: theme.space[4],
			paddingVertical: theme.space[4],
			gap: theme.space[3],
			backgroundColor: spec.panelBackground,
			borderColor: spec.panelBorder,
		},
		stateBadge: {
			alignSelf: "flex-start",
		},
		stateBody: {
			gap: theme.space[1],
		},
		listSection: {
			gap: theme.space[3],
		},
		listHeader: {
			gap: theme.space[1],
		},
		listTitle: {
			color: theme.colors.text,
		},
		list: {
			gap: theme.space[3],
		},
		card: {
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			paddingHorizontal: theme.space[4],
			paddingVertical: theme.space[4],
			gap: theme.space[3],
			backgroundColor: spec.panelBackground,
			borderColor: spec.panelBorder,
		},
		cardPressed: {
			opacity: 0.92,
		},
		cardHeader: {
			flexDirection: "row",
			alignItems: "flex-start",
			justifyContent: "space-between",
			gap: theme.space[3],
		},
		cardHeaderCopy: {
			flex: 1,
			gap: theme.space[2],
		},
		cardBadge: {
			alignSelf: "flex-start",
		},
		cardTitle: {
			color: theme.colors.text,
		},
		cardDescription: {
			color: theme.colors.muted,
		},
		metaRow: {
			flexDirection: "row",
			flexWrap: "wrap",
			gap: theme.space[2],
		},
		metaCard: {
			flexGrow: 1,
			flexBasis: "30%",
			borderRadius: theme.radius.lg,
			borderWidth: 1,
			paddingHorizontal: theme.space[3],
			paddingVertical: theme.space[3],
			gap: theme.space[1],
			backgroundColor: theme.colors.surface2,
			borderColor: spec.panelBorder,
		},
		metaValue: {
			color: theme.colors.text,
		},
		metaAvailability: {
			alignSelf: "flex-start",
		},
		filterContent: {
			gap: theme.space[4],
		},
		filterScroll: {
			maxHeight: 360,
		},
		filterSection: {
			gap: theme.space[3],
		},
		filterSectionHeader: {
			gap: theme.space[1],
		},
		filterDivider: {
			paddingTop: theme.space[4],
			borderTopWidth: 1,
		},
		optionGroup: {
			flexDirection: "row",
			flexWrap: "wrap",
			gap: theme.space[2],
		},
		optionChip: {
			paddingHorizontal: theme.space[3],
			paddingVertical: theme.space[2],
			borderRadius: theme.radius.circle,
			borderWidth: 1,
		},
		footerActions: {
			flexDirection: "row",
			gap: theme.space[2],
		},
		footerAction: {
			flex: 1,
		},
	});
}
