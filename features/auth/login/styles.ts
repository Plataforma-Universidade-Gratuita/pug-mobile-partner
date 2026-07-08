
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
		badge: {
			alignSelf: "flex-start",
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
	});
}
