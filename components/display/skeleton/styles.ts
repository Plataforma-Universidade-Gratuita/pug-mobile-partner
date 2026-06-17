import { StyleSheet } from "react-native";
import type { DimensionValue, ViewStyle } from "react-native";

import type { AppResolvedTheme } from "@/types/client";

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		root: {
			backgroundColor:
				theme.mode === "dark"
					? theme.colors.surfaceHighlight
					: theme.colors.surfaceLowlight,
		},
	});
}

export function getSkeletonStyle(
	theme: AppResolvedTheme,
	width: DimensionValue,
	height?: DimensionValue,
	borderRadius?: number,
): ViewStyle {
	return {
		borderRadius: borderRadius ?? theme.radius.lg,
		height: height ?? 16,
		width,
	};
}
