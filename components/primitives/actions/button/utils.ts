import type { ButtonProps } from "react-native-paper";

import type {
	AppResolvedTheme,
	PrimitiveButtonProps,
	PrimitiveFormStyleSpec,
} from "@/types/client";

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
	switch (variant) {
		case "secondary":
			return {
				buttonColor: theme.colors.surface3,
				textColor: theme.colors.text,
				borderColor: theme.colors.border1,
			};
		case "text":
			return {
				buttonColor: "transparent",
				textColor: spec.textActionColor,
				borderColor: "transparent",
			};
		case "primary":
		default:
			return {
				buttonColor: theme.colors.brand,
				textColor: theme.colors.chromeFg,
				borderColor: "transparent",
			};
	}
}
