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
		keyboard: {
			flex: 1,
		},
		content: {
			paddingBottom: theme.space[4],
		},
		contentShell: {
			gap: theme.space[5],
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
		formCard: {
			gap: theme.space[5],
		},
		section: {
			gap: theme.space[2],
		},
		sectionHeader: {
			gap: theme.space[1],
		},
		projectOptionList: {
			gap: theme.space[2],
		},
		projectOptionListContainer: {
			maxHeight: 320,
		},
		projectOptionCard: {
			borderRadius: theme.radius.lg,
			borderWidth: 1,
			paddingHorizontal: theme.space[4],
			paddingVertical: theme.space[4],
			gap: theme.space[2],
		},
		projectOptionHeader: {
			gap: theme.space[1],
		},
		projectOptionTitle: {
			color: theme.colors.text,
		},
		projectOptionMeta: {
			color: theme.colors.muted,
		},
		projectOptionSelectedMeta: {
			color: theme.colors.brand,
		},
		field: {
			gap: theme.space[2],
		},
		errorText: {
			color: theme.colors.danger,
		},
		footerButton: {
			marginBottom: theme.space[2],
		},
	});
}
