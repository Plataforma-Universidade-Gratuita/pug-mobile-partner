
import type {
	AppResolvedTheme,
	PrimitiveLabelProps,
	PrimitiveFormStyleSpec,
} from "@/types/client";

export function resolveLabelVariant(
	role: NonNullable<PrimitiveLabelProps["role"]>,
) {
	switch (role) {
		case "title":
			return "headlineMedium" as const;
		case "subtitle":
			return "bodyMedium" as const;
		case "helper":
			return "bodySmall" as const;
		case "caption":
			return "labelSmall" as const;
		case "field":
		default:
			return "labelMedium" as const;
	}
}

export function resolveLabelColor(
	role: NonNullable<PrimitiveLabelProps["role"]>,
	tone: NonNullable<PrimitiveLabelProps["tone"]>,
	theme: AppResolvedTheme,
	spec: PrimitiveFormStyleSpec,
) {
	switch (tone) {
		case "muted":
			return spec.helperText;
		case "brand":
			return theme.colors.brand;
		case "danger":
			return theme.colors.danger;
		case "success":
			return theme.colors.success;
		case "default":
		default:
			if (role === "field" || role === "helper" || role === "caption") {
				return spec.labelText;
			}

			return theme.colors.text;
	}
}

export function resolveLabelRoleStyle(
	role: NonNullable<PrimitiveLabelProps["role"]>,
	theme: AppResolvedTheme,
	spec: PrimitiveFormStyleSpec,
) {
	switch (role) {
		case "title":
			return {
				fontFamily: theme.font.display,
				fontSize: spec.titleSize,
				lineHeight: spec.titleLineHeight,
				fontWeight: theme.weight.semibold,
				letterSpacing: 0,
			};
		case "subtitle":
			return {
				fontFamily: theme.font.sans,
				fontSize: spec.subtitleSize,
				lineHeight: spec.subtitleLineHeight,
				fontWeight: theme.weight.regular,
				letterSpacing: 0,
			};
		case "helper":
			return {
				fontFamily: theme.font.sans,
				fontSize: theme.type.sm,
				lineHeight: theme.type.sm * theme.lineHeight.normal,
				fontWeight: theme.weight.regular,
				letterSpacing: 0,
			};
		case "caption":
			return {
				fontFamily: theme.font.sans,
				fontSize: theme.type.xs,
				lineHeight: theme.type.xs * theme.lineHeight.snug,
				fontWeight: theme.weight.medium,
				letterSpacing: 0,
				textTransform: "uppercase" as const,
			};
		case "field":
		default:
			return {
				fontFamily: theme.font.sans,
				fontSize: theme.type.sm,
				lineHeight: theme.type.sm * theme.lineHeight.snug,
				fontWeight: theme.weight.semibold,
				letterSpacing: 0,
			};
	}
}
