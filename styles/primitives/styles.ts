import type {
	AppResolvedTheme,
	PrimitiveFormStyleSpec,
	PrimitiveSurfaceStyleSpec,
} from "@/types/client";
import { withAlpha } from "@/utils";

export function createPrimitiveSurfaceStyleSpec(
	theme: AppResolvedTheme,
): PrimitiveSurfaceStyleSpec {
	const isDark = theme.mode === "dark";

	return {
		screenBackground: theme.colors.surface1,
		screenGlow: withAlpha(theme.colors.brand, isDark ? 0.16 : 0.1),
		panelBackground: withAlpha(theme.colors.surface2, isDark ? 0.96 : 0.92),
		panelBorder: isDark
			? withAlpha(theme.colors.text, 0.08)
			: theme.colors.border2,
		panelRadius: theme.surface.panelRadius,
		panelPadding: theme.surface.panelPadding,
	};
}

export function createPrimitiveFormStyleSpec(
	theme: AppResolvedTheme,
): PrimitiveFormStyleSpec {
	const isDark = theme.mode === "dark";

	return {
		formMaxWidth: theme.form.formMaxWidth,
		headerGap: theme.form.headerGap,
		formGap: theme.form.formGap,
		fieldGap: theme.form.fieldGap,
		titleSize: theme.type.xxxl,
		titleLineHeight: theme.type.xxxl * 1.05,
		subtitleSize: theme.type.md,
		subtitleLineHeight: theme.type.md * theme.lineHeight.normal,
		labelText: theme.colors.muted,
		helperText: theme.colors.muted,
		inputBackground: isDark
			? withAlpha(theme.colors.text, 0.04)
			: theme.colors.surface3,
		inputBorder: isDark
			? withAlpha(theme.colors.text, 0.08)
			: theme.colors.border2,
		inputText: theme.colors.text,
		inputPlaceholder: theme.colors.muted,
		inputRadius: theme.form.controlRadius,
		inputHeight: theme.form.controlHeight,
		buttonHeight: theme.form.buttonHeight,
		buttonRadius: theme.form.controlRadius,
		buttonShadowColor: theme.colors.brand,
		buttonShadowOpacity: isDark ? 0.34 : 0.22,
		textActionColor: theme.colors.brandSoftText,
		badgeHeight: theme.form.badgeHeight,
		badgeBackground: withAlpha(theme.colors.brand, isDark ? 0.12 : 0.1),
		badgeText: theme.colors.brandSoftText,
	};
}
