import type { ButtonProps } from "react-native-paper";

import type {
	AppResolvedTheme,
	PrimitiveButtonProps,
	PrimitiveFormStyleSpec,
} from "@/types/client";
import { withAlpha } from "@/utils";

export function resolveButtonMode(
	variant: NonNullable<PrimitiveButtonProps["variant"]>,
): NonNullable<ButtonProps["mode"]> {
	switch (variant) {
		case "secondary":
			return "outlined";
		case "text":
			return "text";
		case "primary":
		default:
			return "contained";
	}
}

export function resolveButtonColors(
	variant: NonNullable<PrimitiveButtonProps["variant"]>,
	theme: AppResolvedTheme,
	spec: PrimitiveFormStyleSpec,
) {
	const isDark = theme.mode === "dark";
	const darkPrimaryButtonColor = withAlpha(theme.colors.brand, 0.14);
	const darkPrimaryBorderColor = withAlpha(theme.colors.brand, 0.24);
	const darkSecondaryButtonColor = withAlpha(theme.colors.surface2, 0.36);
	const darkSecondaryBorderColor = withAlpha(theme.colors.brand, 0.16);

	switch (variant) {
		case "secondary":
			return {
				buttonColor: isDark ? darkSecondaryButtonColor : theme.colors.surface3,
				textColor: isDark ? theme.colors.brandSoftText : theme.colors.text,
				borderColor: isDark ? darkSecondaryBorderColor : theme.colors.border1,
				borderWidth: 1,
			};
		case "text":
			return {
				buttonColor: "transparent",
				textColor: spec.textActionColor,
				borderColor: "transparent",
				borderWidth: 0,
			};
		case "primary":
		default:
			return {
				buttonColor: isDark ? darkPrimaryButtonColor : theme.colors.brand,
				textColor: isDark ? theme.colors.brandSoftText : theme.colors.chromeFg,
				borderColor: isDark ? darkPrimaryBorderColor : "transparent",
				borderWidth: isDark ? 1 : 0,
			};
	}
}
