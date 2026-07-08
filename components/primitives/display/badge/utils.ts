import type { ChipProps } from "react-native-paper";

import type {
	AppResolvedTheme,
	PrimitiveBadgeProps,
	PrimitiveFormStyleSpec,
} from "@/types/client";
import { withAlpha } from "@/utils";

export function resolveBadgeMode(
	variant: NonNullable<PrimitiveBadgeProps["variant"]>,
): NonNullable<ChipProps["mode"]> {
	return variant === "secondary" ? "outlined" : "flat";
}

export function resolveBadgeColors(
	tone: NonNullable<PrimitiveBadgeProps["tone"]>,
	variant: NonNullable<PrimitiveBadgeProps["variant"]>,
	theme: AppResolvedTheme,
	spec: PrimitiveFormStyleSpec,
) {
	const palette = {
		neutral: {
			primaryBackground: theme.colors.surface3,
			primaryText: theme.colors.text,
			secondaryBorder: theme.colors.border2,
			secondaryText: theme.colors.muted,
		},
		brand: {
			primaryBackground: spec.badgeBackground,
			primaryText: spec.badgeText,
			secondaryBorder: theme.colors.brand,
			secondaryText: theme.colors.brand,
		},
		success: {
			primaryBackground: withAlpha(
				theme.colors.success,
				theme.mode === "dark" ? 0.18 : 0.12,
			),
			primaryText: theme.colors.success,
			secondaryBorder: theme.colors.success,
			secondaryText: theme.colors.success,
		},
		info: {
			primaryBackground: withAlpha(
				theme.colors.info,
				theme.mode === "dark" ? 0.18 : 0.12,
			),
			primaryText: theme.colors.info,
			secondaryBorder: theme.colors.info,
			secondaryText: theme.colors.info,
		},
		warning: {
			primaryBackground: withAlpha(
				theme.colors.warning,
				theme.mode === "dark" ? 0.18 : 0.16,
			),
			primaryText: theme.colors.warningSoftText,
			secondaryBorder: theme.colors.warning,
			secondaryText: theme.colors.warningSoftText,
		},
		danger: {
			primaryBackground: withAlpha(
				theme.colors.danger,
				theme.mode === "dark" ? 0.18 : 0.12,
			),
			primaryText: theme.colors.danger,
			secondaryBorder: theme.colors.danger,
			secondaryText: theme.colors.danger,
		},
	} as const;

	const selected = palette[tone];

	if (variant === "secondary") {
		return {
			backgroundColor: "transparent",
			borderColor: selected.secondaryBorder,
			textColor: selected.secondaryText,
		};
	}

	return {
		backgroundColor: selected.primaryBackground,
		borderColor: "transparent",
		textColor: selected.primaryText,
	};
}
