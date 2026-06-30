import { StyleSheet } from "react-native";

import type {
	AppResolvedTheme,
	PrimitiveSurfaceStyleSpec,
} from "@/types/client";

export function createStyles(
	theme: AppResolvedTheme,
	_spec: PrimitiveSurfaceStyleSpec,
) {
	return StyleSheet.create({
		scroll: {
			marginTop: theme.space[3],
		},
		content: {
			gap: theme.space[4],
			paddingBottom: theme.space[2],
		},
		section: {
			gap: theme.space[2],
		},
		sectionDivider: {
			borderTopWidth: 1,
			paddingTop: theme.space[4],
		},
		sectionHeader: {
			gap: theme.space[1],
		},
		optionGroup: {
			flexDirection: "row",
			flexWrap: "wrap",
			gap: theme.space[2],
		},
		optionChip: {
			minHeight: 38,
			paddingHorizontal: theme.space[4],
			borderWidth: 1,
			borderRadius: theme.radius.circle,
			alignItems: "center",
			justifyContent: "center",
		},
		footerActions: {
			flexDirection: "row",
			gap: theme.space[3],
		},
		footerAction: {
			flex: 1,
		},
	});
}
