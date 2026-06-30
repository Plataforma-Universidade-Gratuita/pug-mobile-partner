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
			flexGrow: 1,
			justifyContent: "center",
			paddingHorizontal: theme.layout.screenPadding,
			paddingTop: theme.space[3],
			paddingBottom: theme.space[6],
		},
		shell: {
			width: "100%",
			maxWidth: theme.layout.contentMaxWidth,
			alignSelf: "center",
			gap: theme.space[4],
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
		qrCard: {
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			paddingHorizontal: theme.space[4],
			paddingVertical: theme.space[4],
			gap: theme.space[4],
		},
		heroCopy: {
			gap: theme.space[1],
		},
		heroTitle: {
			color: theme.colors.text,
		},
		qrFrame: {
			alignSelf: "center",
			borderRadius: theme.radius.lg,
			padding: theme.space[2],
			backgroundColor: theme.colors.chromeFg,
		},
		qrRows: {
			gap: 0,
		},
		qrRow: {
			flexDirection: "row",
		},
		qrCell: {
			margin: 0,
		},
		footerContent: {
			marginBottom: -theme.space[2],
			marginTop: -theme.space[2],
		},
		footerButton: {
			width: "100%",
		},
	});
}
