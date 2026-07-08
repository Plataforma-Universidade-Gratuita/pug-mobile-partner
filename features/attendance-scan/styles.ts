
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
			paddingBottom: theme.space[2],
			paddingHorizontal: 0,
			paddingTop: 0,
		},
		shell: {
			gap: theme.space[3],
			width: "100%",
		},
		cameraCard: {
			borderColor: spec.panelBorder,
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			gap: theme.space[2],
			overflow: "hidden",
			padding: theme.space[2],
			backgroundColor: spec.panelBackground,
		},
		cameraFrame: {
			borderRadius: theme.radius.lg,
			overflow: "hidden",
			aspectRatio: 4 / 5,
			backgroundColor: theme.colors.surface3,
			position: "relative",
		},
		camera: {
			flex: 1,
		},
		cameraControls: {
			position: "absolute",
			left: theme.space[2],
			right: theme.space[2],
			bottom: theme.space[2],
			flexDirection: "row",
			alignItems: "flex-end",
			justifyContent: "space-between",
			gap: theme.space[2],
		},
		cameraControlButton: {
			width: 40,
			height: 40,
			alignItems: "center",
			justifyContent: "center",
			borderWidth: 1,
			borderRadius: theme.radius.circle,
			padding: 0,
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
		headerMetaRow: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			gap: theme.space[2],
		},
		headerBadge: {
			alignSelf: "flex-start",
		},
		headerBadgeRight: {
			alignSelf: "flex-start",
			marginLeft: "auto",
		},
		title: {
			color: theme.colors.text,
			fontSize: theme.type.xl,
			lineHeight: theme.type.xl * theme.lineHeight.tight,
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
		footerActions: {
			gap: theme.space[2],
		},
	});
}
