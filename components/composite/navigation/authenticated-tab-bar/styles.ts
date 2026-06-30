import { StyleSheet } from "react-native";

import type { AppResolvedTheme } from "@/types/client";
import { withAlpha } from "@/utils";

import {
	TAB_BAR_ACTION_GAP,
	TAB_BAR_ACTION_SIZE,
	TAB_BAR_DOCK_PADDING,
} from "./constants";

export function createStyles(theme: AppResolvedTheme, bottomInset: number) {
	const bottomPadding = Math.max(bottomInset, theme.space[2]) + theme.space[2];

	return StyleSheet.create({
		container: {
			backgroundColor: "transparent",
			bottom: 0,
			left: 0,
			paddingBottom: bottomPadding,
			paddingHorizontal: theme.layout.screenPadding,
			paddingTop: theme.space[2],
			position: "absolute",
			right: 0,
		},
		shellRow: {
			alignItems: "center",
			alignSelf: "center",
			flexDirection: "row",
			gap: TAB_BAR_ACTION_GAP,
			maxWidth: 392,
			width: "100%",
		},
		dock: {
			backgroundColor: withAlpha(theme.colors.surface1, 0.5),
			borderColor: withAlpha(
				theme.colors.border1,
				theme.mode === "dark" ? 0.34 : 0.58,
			),
			borderRadius: theme.radius.circle,
			borderWidth: 1,
			flex: 1,
			overflow: "visible",
			padding: TAB_BAR_DOCK_PADDING,
			position: "relative",
			...(theme.mode === "dark"
				? {
						shadowColor: theme.colors.overlay,
						shadowOpacity: 0.18,
						shadowRadius: 16,
						shadowOffset: { width: 0, height: 8 },
						elevation: 4,
					}
				: {
						shadowColor: theme.colors.text,
						shadowOpacity: 0.05,
						shadowRadius: 12,
						shadowOffset: { width: 0, height: 6 },
						elevation: 2,
					}),
		},
		actionButton: {
			alignItems: "center",
			backgroundColor: theme.colors.brand,
			borderRadius: theme.radius.circle,
			height: TAB_BAR_ACTION_SIZE,
			justifyContent: "center",
			width: TAB_BAR_ACTION_SIZE,
			...(theme.mode === "dark"
				? {
						shadowColor: theme.colors.overlay,
						shadowOpacity: 0.24,
						shadowRadius: 16,
						shadowOffset: { width: 0, height: 8 },
						elevation: 4,
					}
				: {
						shadowColor: theme.colors.text,
						shadowOpacity: 0.12,
						shadowRadius: 12,
						shadowOffset: { width: 0, height: 6 },
						elevation: 3,
					}),
		},
		actionButtonPressed: {
			opacity: 0.84,
		},
		activePill: {
			backgroundColor: theme.colors.surface3,
			borderColor:
				theme.mode === "dark" ? theme.colors.border2 : theme.colors.border1,
			borderRadius: theme.radius.circle,
			borderWidth: 1,
			bottom: TAB_BAR_DOCK_PADDING,
			position: "absolute",
			top: TAB_BAR_DOCK_PADDING,
			...(theme.mode === "dark"
				? {
						shadowColor: theme.colors.overlay,
						shadowOpacity: 0.18,
						shadowRadius: 14,
						shadowOffset: { width: 0, height: 6 },
						elevation: 2,
					}
				: {
						shadowColor: theme.colors.text,
						shadowOpacity: 0.06,
						shadowRadius: 10,
						shadowOffset: { width: 0, height: 4 },
						elevation: 1,
					}),
		},
		rail: {
			alignItems: "center",
			flexDirection: "row",
			justifyContent: "center",
			width: "100%",
			zIndex: 1,
		},
		item: {
			alignItems: "center",
			flex: 1,
			height: 52,
			justifyContent: "center",
		},
		itemPressed: {
			opacity: 0.84,
		},
		iconSlot: {
			alignItems: "center",
			height: 24,
			justifyContent: "center",
			width: 24,
		},
	});
}
