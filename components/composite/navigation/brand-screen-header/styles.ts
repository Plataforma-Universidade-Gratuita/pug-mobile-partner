import { StyleSheet } from "react-native";

import type { AppResolvedTheme } from "@/types/client";

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		brandHeader: {
			paddingHorizontal: theme.layout.screenPadding,
			paddingBottom: theme.space[2],
			position: "relative",
			zIndex: 2,
		},
		brandHeaderRow: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			gap: theme.space[3],
		},
		brandHeaderSlot: {
			width: 40,
			height: 40,
			alignItems: "center",
			justifyContent: "center",
		},
		brandHeaderCenter: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
		},
		brandHeaderTitle: {
			fontSize: theme.type.lg,
			lineHeight: theme.type.lg * theme.lineHeight.tight,
			fontWeight: theme.weight.semibold,
		},
		headerShadowEdge: {
			backgroundColor: theme.colors.surface1,
			bottom: 0,
			height: 1,
			left: 0,
			position: "absolute",
			right: 0,
			...(theme.mode === "dark"
				? {
						shadowColor: theme.colors.overlay,
						shadowOpacity: 0.26,
						shadowRadius: 22,
						shadowOffset: { width: 0, height: 12 },
						elevation: 2,
					}
				: {
						shadowColor: theme.colors.text,
						shadowOpacity: 0.07,
						shadowRadius: 20,
						shadowOffset: { width: 0, height: 10 },
						elevation: 1,
					}),
		},
	});
}
