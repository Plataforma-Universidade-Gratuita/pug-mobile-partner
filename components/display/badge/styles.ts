import { StyleSheet } from "react-native";
import type { TextStyle, ViewStyle } from "react-native";

import type { AppResolvedTheme, BadgeTone, BadgeVariant } from "@/types/client";

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		root: {
			alignItems: "center",
			alignSelf: "flex-start",
			borderRadius: theme.radius.circle,
			borderWidth: 1,
			flexDirection: "row",
			gap: theme.space[1],
			minHeight: 24,
			paddingHorizontal: 10,
			paddingVertical: 4,
		},
		label: {
			fontSize: theme.type.xs,
			fontWeight: theme.weight.semibold,
			letterSpacing: 0,
			lineHeight: theme.type.xs * theme.lineHeight.tight,
		},
		removeButton: {
			alignItems: "center",
			borderRadius: theme.radius.circle,
			height: 16,
			justifyContent: "center",
			marginLeft: -2,
			width: 16,
		},
		removeButtonPressed: {
			opacity: 0.8,
		},
	});
}

export function getContainerStyle(
	theme: AppResolvedTheme,
	tone: BadgeTone,
	variant: BadgeVariant,
): ViewStyle {
	const palette = getTonePalette(theme, tone);

	if (variant === "secondary") {
		return {
			backgroundColor: palette.soft,
			borderColor: palette.border,
		};
	}

	return {
		backgroundColor: palette.fill,
		borderColor: palette.fill,
	};
}

export function getLabelStyle(
	theme: AppResolvedTheme,
	tone: BadgeTone,
	variant: BadgeVariant,
): TextStyle {
	const palette = getTonePalette(theme, tone);

	return {
		color: variant === "secondary" ? palette.text : palette.contrast,
	};
}

function getTonePalette(theme: AppResolvedTheme, tone: BadgeTone) {
	const baseMap = {
		neutral: theme.colors.text,
		brand: theme.colors.brand,
		success: theme.colors.success,
		info: theme.colors.info,
		warning: theme.colors.warning,
		danger: theme.colors.danger,
	} satisfies Record<BadgeTone, string>;
	const accent = baseMap[tone];
	const contrast =
		tone === "warning" ? theme.colors.text : theme.colors.chromeFg;

	return {
		border: withAlpha(accent, theme.mode === "dark" ? 0.34 : 0.18),
		fill: tone === "neutral" ? theme.colors.text : accent,
		contrast,
		soft:
			tone === "neutral"
				? theme.colors.surface1
				: withAlpha(accent, theme.mode === "dark" ? 0.18 : 0.12),
		text: tone === "neutral" ? theme.colors.text : accent,
	};
}

function withAlpha(color: string, alpha: number) {
	if (!color.startsWith("#")) {
		return color;
	}

	const normalized =
		color.length === 4
			? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
			: color;
	const red = Number.parseInt(normalized.slice(1, 3), 16);
	const green = Number.parseInt(normalized.slice(3, 5), 16);
	const blue = Number.parseInt(normalized.slice(5, 7), 16);

	return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
