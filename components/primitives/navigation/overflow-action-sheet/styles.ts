
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
		sheetModal: {
			flex: 1,
			justifyContent: "flex-end",
		},
		sheetBackdropPressable: {
			...StyleSheet.absoluteFillObject,
		},
		sheetBackdrop: {
			...StyleSheet.absoluteFillObject,
			backgroundColor: withAlpha(
				theme.colors.overlay,
				theme.mode === "dark" ? 0.84 : 0.48,
			),
		},
		sheetSurface: {
			gap: theme.space[4],
			paddingHorizontal: spec.panelPadding,
			paddingTop: theme.space[3],
			borderWidth: 1,
			borderTopLeftRadius: spec.panelRadius,
			borderTopRightRadius: spec.panelRadius,
		},
		sheetHandle: {
			alignSelf: "center",
			backgroundColor: withAlpha(
				theme.colors.muted,
				theme.mode === "dark" ? 0.52 : 0.24,
			),
			borderRadius: theme.radius.circle,
			height: 4,
			marginBottom: theme.space[1],
			width: 40,
		},
	});
}
