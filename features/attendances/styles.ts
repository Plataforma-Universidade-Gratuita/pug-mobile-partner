
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
		card: {
			borderRadius: theme.radius.xl,
			borderWidth: 1,
			paddingHorizontal: theme.space[4],
			paddingVertical: theme.space[4],
			gap: theme.space[2],
		},
		cardBadge: {
			alignSelf: "flex-start",
		},
		cardBodyRow: {
			flexDirection: "row",
			alignItems: "flex-start",
			justifyContent: "space-between",
			gap: theme.space[3],
		},
		cardCopy: {
			flex: 1,
			gap: theme.space[1],
		},
		cardTitle: {
			color: theme.colors.text,
		},
		cardMetaRow: {
			flexDirection: "row",
			flexWrap: "wrap",
			alignItems: "center",
			gap: theme.space[2],
		},
	});
}
