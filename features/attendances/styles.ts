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
			flex: 1,
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
		panel: {
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			paddingHorizontal: theme.space[4],
			paddingVertical: theme.space[4],
			gap: theme.space[2],
			backgroundColor: spec.panelBackground,
			borderColor: spec.panelBorder,
		},
		title: {
			color: theme.colors.text,
		},
	});
}
