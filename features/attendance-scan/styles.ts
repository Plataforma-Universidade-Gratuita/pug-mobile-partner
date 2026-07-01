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
			paddingBottom: theme.space[4],
			paddingHorizontal: theme.layout.screenPadding,
			paddingTop: theme.space[2],
		},
		shell: {
			gap: theme.space[4],
		},
		cameraCard: {
			borderColor: spec.panelBorder,
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			gap: theme.space[3],
			overflow: "hidden",
			padding: theme.space[3],
			backgroundColor: spec.panelBackground,
		},
		cameraFrame: {
			borderRadius: theme.radius.lg,
			overflow: "hidden",
			aspectRatio: 3 / 4,
			backgroundColor: theme.colors.surface3,
		},
		camera: {
			flex: 1,
		},
		cameraCopy: {
			gap: theme.space[1],
		},
		stateCard: {
			borderColor: spec.panelBorder,
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			gap: theme.space[3],
			paddingHorizontal: theme.space[4],
			paddingVertical: theme.space[4],
			backgroundColor: spec.panelBackground,
		},
		stateBadge: {
			alignSelf: "flex-start",
		},
		stateBody: {
			gap: theme.space[1],
		},
		resultCard: {
			borderColor: spec.panelBorder,
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			gap: theme.space[4],
			paddingHorizontal: theme.space[4],
			paddingVertical: theme.space[4],
			backgroundColor: spec.panelBackground,
		},
		headerBlock: {
			gap: theme.space[2],
		},
		title: {
			color: theme.colors.text,
		},
		rowGroup: {
			gap: theme.space[3],
		},
		row: {
			gap: theme.space[1],
		},
		footer: {
			gap: theme.space[2],
		},
	});
}
