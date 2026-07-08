
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
		keyboard: {
			flex: 1,
		},
		content: {
			flexGrow: 1,
			justifyContent: "center",
			paddingHorizontal: theme.layout.screenPadding,
			paddingVertical: theme.space[6],
		},
		panel: {
			width: "100%",
			maxWidth: theme.form.formMaxWidth,
			alignSelf: "center",
			gap: theme.space[5],
			padding: spec.panelPadding,
			borderWidth: 1,
			borderColor: spec.panelBorder,
			borderRadius: spec.panelRadius,
			backgroundColor: spec.panelBackground,
			...theme.shadow.lg,
		},
		header: {
			gap: theme.form.headerGap,
		},
		form: {
			gap: theme.form.formGap,
		},
		field: {
			gap: theme.form.fieldGap,
		},
		requirementsCard: {
			gap: theme.space[2],
			paddingHorizontal: theme.space[3],
			paddingVertical: theme.space[3],
			borderWidth: 1,
			borderColor: spec.panelBorder,
			borderRadius: theme.radius.lg,
			backgroundColor: theme.colors.surface2,
		},
		requirementsHeader: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			gap: theme.space[3],
		},
		requirementsTitle: {
			color: theme.colors.text,
			flex: 1,
		},
		requirementsChevron: {
			color: theme.colors.muted,
		},
		requirementsList: {
			gap: theme.space[2],
		},
		requirementRow: {
			flexDirection: "row",
			alignItems: "center",
			gap: theme.space[2],
		},
		requirementIndicator: {
			width: 10,
			height: 10,
			borderRadius: theme.radius.circle,
			flexShrink: 0,
		},
		requirementIndicatorSatisfied: {
			backgroundColor: theme.colors.success,
		},
		requirementIndicatorPending: {
			backgroundColor: theme.colors.border2,
		},
		actions: {
			gap: theme.space[3],
		},
	});
}
