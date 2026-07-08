
import type { ViewStyle } from "react-native";

export type AppThemeShadowStyle = ViewStyle & {
	boxShadow?: string;
};

export type AppTheme = "light" | "dark" | "system";
export type ResolvedThemeMode = Exclude<AppTheme, "system">;

export interface AppThemeColors {
	brand: string;
	brandPressed: string;
	text: string;
	muted: string;
	surface1: string;
	surface2: string;
	surface3: string;
	border1: string;
	border2: string;
	border3: string;
	overlay: string;
	success: string;
	info: string;
	warning: string;
	danger: string;
	dangerPressed: string;
	focusRing: string;
	focusHalo: string;
	surfaceHighlight: string;
	surfaceLowlight: string;
	chromeBg: string;
	chromeBgHover: string;
	chromeFg: string;
	chromeMuted: string;
	brandSoftText: string;
	warningSoftText: string;
	tabFgActive: string;
	tabFgInactive: string;
	tabBgActive: string;
	tabBgPressed: string;
}

export interface AppThemeRadius {
	square: number;
	sm: number;
	md: number;
	lg: number;
	xl: number;
	circle: number;
}

export interface AppThemeSpace {
	1: number;
	2: number;
	3: number;
	4: number;
	5: number;
	6: number;
	7: number;
	8: number;
}

export interface AppThemeTypeScale {
	xs: number;
	sm: number;
	md: number;
	lg: number;
	xl: number;
	xxl: number;
	xxxl: number;
	xxxxl: number;
}

export interface AppThemeFontScale {
	sans: string;
	display: string;
	mono: string;
}

export interface AppThemeWeightScale {
	regular: "400";
	medium: "500";
	semibold: "600";
	bold: "700";
}

export interface AppThemeLineHeightScale {
	tight: number;
	snug: number;
	normal: number;
	relaxed: number;
}

export interface AppThemeMotionScale {
	fast: number;
	normal: number;
	slow: number;
}

export interface AppThemeLayoutScale {
	screenPadding: number;
	screenPaddingWide: number;
	contentGap: number;
	sectionGap: number;
	contentMaxWidth: number;
}

export interface AppThemeSurfaceScale {
	panelRadius: number;
	panelPadding: number;
	panelPaddingWide: number;
}

export interface AppThemeFormScale {
	formMaxWidth: number;
	headerGap: number;
	formGap: number;
	fieldGap: number;
	controlHeight: number;
	controlRadius: number;
	buttonHeight: number;
	badgeHeight: number;
}

export interface AppThemeShadowScale {
	sm: AppThemeShadowStyle;
	md: AppThemeShadowStyle;
	lg: AppThemeShadowStyle;
}

export interface AppResolvedTheme {
	mode: ResolvedThemeMode;
	colors: AppThemeColors;
	radius: AppThemeRadius;
	space: AppThemeSpace;
	type: AppThemeTypeScale;
	font: AppThemeFontScale;
	weight: AppThemeWeightScale;
	lineHeight: AppThemeLineHeightScale;
	motion: AppThemeMotionScale;
	layout: AppThemeLayoutScale;
	surface: AppThemeSurfaceScale;
	form: AppThemeFormScale;
	shadow: AppThemeShadowScale;
}
