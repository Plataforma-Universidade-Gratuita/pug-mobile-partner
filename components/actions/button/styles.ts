import { StyleSheet } from "react-native";
import type { TextStyle, ViewStyle } from "react-native";

import type {
	AppResolvedTheme,
	ButtonSize,
	ButtonVariant,
	ButtonUsage,
} from "@/types/client";

import { buildAccentPalette, withAlpha } from "./utils";

interface ButtonPalette {
	accent: string;
	accentPressed: string;
	contrast: string;
	tint: string;
	soft: string;
	outline: string;
}

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		base: {
			alignItems: "center",
			flexDirection: "row",
			flexShrink: 0,
			gap: theme.space[2],
			justifyContent: "center",
			borderRadius: theme.radius.lg,
		},
		iconShape: {
			borderRadius: theme.radius.circle,
		},
		iconSlot: {
			alignItems: "center",
			justifyContent: "center",
		},
		label: {
			fontWeight: theme.weight.semibold,
			letterSpacing: 0,
		},
		disabled: {
			opacity: 0.7,
		},
	});
}

export function getButtonPalette(
	theme: AppResolvedTheme,
	usage: ButtonUsage,
): ButtonPalette {
	switch (usage) {
		case "secondary":
			return {
				accent: theme.colors.text,
				accentPressed: theme.colors.text,
				contrast:
					theme.mode === "dark" ? theme.colors.surface1 : theme.colors.chromeFg,
				tint: withAlpha(theme.colors.text, theme.mode === "dark" ? 0.12 : 0.08),
				soft: withAlpha(theme.colors.text, theme.mode === "dark" ? 0.14 : 0.1),
				outline: withAlpha(
					theme.colors.text,
					theme.mode === "dark" ? 0.2 : 0.14,
				),
			};
		case "success":
			return buildAccentPalette(theme.colors.success, theme.colors.chromeFg);
		case "info":
			return buildAccentPalette(theme.colors.info, theme.colors.chromeFg);
		case "warning":
			return buildAccentPalette(theme.colors.warning, theme.colors.text);
		case "danger":
			return buildAccentPalette(
				theme.colors.danger,
				theme.colors.chromeFg,
				theme.colors.dangerPressed,
			);
		case "primary":
		default:
			return buildAccentPalette(
				theme.colors.brand,
				theme.colors.chromeFg,
				theme.colors.brandPressed,
			);
	}
}

export function getContainerStyle(
	theme: AppResolvedTheme,
	palette: ButtonPalette,
	variant: ButtonVariant,
	pressed: boolean,
): ViewStyle {
	const isSolidVariant = variant === "primary";

	if (isSolidVariant) {
		const useSoftSurface = theme.mode === "dark";

		return {
			backgroundColor: pressed
				? useSoftSurface
					? palette.tint
					: palette.accentPressed
				: useSoftSurface
					? palette.soft
					: palette.accent,
			borderColor: useSoftSurface ? palette.outline : "transparent",
			borderWidth: 1,
            transform: pressed ? [{ translateY: 1 }] : [],
			...(useSoftSurface ? theme.shadow.sm : {}),
		};
	}

	return {
		backgroundColor: pressed ? palette.tint : "transparent",
		borderColor: "transparent",
		borderWidth: 1,
        transform: pressed ? [{ translateY: 1 }] : [],
	};
}

export function getLabelStyle(
	theme: AppResolvedTheme,
	palette: ButtonPalette,
	variant: ButtonVariant,
	size: ButtonSize,
): TextStyle {
	const isSolidVariant = variant === "primary";
	const fontSize = getFontSize(theme, size);

	return {
		color: isSolidVariant
			? theme.mode === "dark"
				? palette.accent
				: palette.contrast
			: palette.accent,
		fontSize,
		lineHeight: fontSize * theme.lineHeight.tight,
	};
}

export function getSizeStyle(
	theme: AppResolvedTheme,
	size: ButtonSize,
): ViewStyle {
	switch (size) {
		case "sm":
			return {
				minHeight: 36,
				paddingHorizontal: theme.space[3],
				paddingVertical: theme.space[2],
			};
		case "lg":
			return {
				minHeight: 48,
				paddingHorizontal: theme.space[5],
				paddingVertical: theme.space[4],
			};
		case "icon":
			return {
				height: 44,
				padding: 0,
				width: 44,
			};
		case "md":
		default:
			return {
				minHeight: 44,
				paddingHorizontal: theme.space[4],
				paddingVertical: theme.space[3],
			};
	}
}

function getFontSize(theme: AppResolvedTheme, size: ButtonSize) {
	switch (size) {
		case "sm":
			return theme.type.xs;
		case "md":
		case "lg":
		case "icon":
		default:
			return theme.type.sm;
	}
}
