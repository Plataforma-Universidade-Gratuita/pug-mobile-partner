/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { Platform } from "react-native";

import type {
	AppResolvedTheme,
	AppTheme,
	AppThemeShadowStyle,
	ResolvedThemeMode,
} from "@/types/client/theme";

export const APP_THEMES = ["system", "light", "dark"] as const;
export const DEFAULT_THEME: AppTheme = "system";
export const DEFAULT_RESOLVED_THEME: ResolvedThemeMode = "light";
export const THEME_STORAGE_KEY = "theme";

function createShadow(
	shadowColor: string,
	shadowOpacity: number,
	shadowRadius: number,
	shadowHeight: number,
	elevation: number,
	webBoxShadow: string,
): AppThemeShadowStyle {
	if (Platform.OS === "web") {
		return {
			boxShadow: webBoxShadow,
		};
	}

	return {
		shadowColor,
		shadowOpacity,
		shadowRadius,
		shadowOffset: { width: 0, height: shadowHeight },
		elevation,
	};
}

const radius = {
	square: 0,
	sm: 6,
	md: 8,
	lg: 12,
	xl: 16,
	circle: 999,
} as const;

const space = {
	1: 4,
	2: 8,
	3: 12,
	4: 16,
	5: 24,
	6: 32,
	7: 48,
	8: 64,
} as const;

const type = {
	xs: 12,
	sm: 14,
	md: 16,
	lg: 18,
	xl: 20,
	xxl: 24,
	xxxl: 32,
	xxxxl: 40,
} as const;

const font = {
	sans: Platform.select({
		ios: "System",
		android: "sans-serif",
		default: '"Inter", "Segoe UI", sans-serif',
	}),
	display: Platform.select({
		ios: "System",
		android: "sans-serif-medium",
		default: '"Inter", "Segoe UI", sans-serif',
	}),
	mono: Platform.select({
		ios: "Menlo",
		android: "monospace",
		default: '"JetBrains Mono", "Fira Code", monospace',
	}),
} as const;

const weight = {
	regular: "400",
	medium: "500",
	semibold: "600",
	bold: "700",
} as const;

const lineHeight = {
	tight: 1.2,
	snug: 1.35,
	normal: 1.5,
	relaxed: 1.65,
} as const;

const motion = {
	fast: 120,
	normal: 180,
	slow: 280,
} as const;

const layout = {
	screenPadding: 20,
	screenPaddingWide: 24,
	contentGap: 24,
	sectionGap: 24,
	contentMaxWidth: 720,
} as const;

const surface = {
	panelRadius: 28,
	panelPadding: 24,
	panelPaddingWide: 28,
} as const;

const form = {
	formMaxWidth: 440,
	headerGap: 12,
	formGap: 16,
	fieldGap: 8,
	controlHeight: 56,
	controlRadius: 18,
	buttonHeight: 56,
	badgeHeight: 32,
} as const;

const lightTheme: AppResolvedTheme = {
	mode: "light",
	colors: {
		brand: "#9b2234",
		brandPressed: "#872231",
		text: "#1c2024",
		muted: "#60646c",
		surface1: "#eef1f5",
		surface2: "#ffffff",
		surface3: "#f7f9fc",
		border1: "#e0e1e6",
		border2: "#e8e8ec",
		border3: "#f0f0f3",
		overlay: "rgba(0, 0, 0, 0.6)",
		success: "#46a758",
		info: "#0090ff",
		warning: "#ffc53d",
		danger: "#e5484d",
		dangerPressed: "#dc3e42",
		focusRing: "#9b2234",
		focusHalo: "rgba(155, 34, 52, 0.24)",
		surfaceHighlight: "rgba(15, 23, 42, 0.03)",
		surfaceLowlight: "rgba(15, 23, 42, 0.08)",
		chromeBg: "#912233",
		chromeBgHover: "#872231",
		chromeFg: "rgba(255, 255, 255, 0.95)",
		chromeMuted: "rgba(255, 255, 255, 0.9)",
		brandSoftText: "#9b2234",
		warningSoftText: "#8a6200",
		tabFgActive: "#9b2234",
		tabFgInactive: "rgba(155, 34, 52, 0.56)",
		tabBgActive: "rgba(155, 34, 52, 0.08)",
		tabBgPressed: "rgba(155, 34, 52, 0.14)",
	},
	radius,
	space,
	type,
	font,
	weight,
	lineHeight,
	motion,
	layout,
	surface,
	form,
	shadow: {
		sm: createShadow(
			"#0f172a",
			0.08,
			2,
			1,
			1,
			"0 1px 2px rgba(15, 23, 42, 0.08)",
		),
		md: createShadow(
			"#0f172a",
			0.12,
			24,
			8,
			4,
			"0 8px 24px rgba(15, 23, 42, 0.12)",
		),
		lg: createShadow(
			"#0f172a",
			0.18,
			40,
			16,
			8,
			"0 16px 40px rgba(15, 23, 42, 0.18)",
		),
	},
};

const darkTheme: AppResolvedTheme = {
	mode: "dark",
	colors: {
		brand: "#af4e5d",
		brandPressed: "#c06573",
		text: "#edeef0",
		muted: "#b0b4ba",
		surface1: "#0b0a0d",
		surface2: "#17131b",
		surface3: "#221d27",
		border1: "#363a3f",
		border2: "#2e3135",
		border3: "#272a2d",
		overlay: "rgba(0, 0, 0, 0.8)",
		success: "#46a758",
		info: "#0090ff",
		warning: "#ffc53d",
		danger: "#e5484d",
		dangerPressed: "#ec5d5e",
		focusRing: "#af4e5d",
		focusHalo: "rgba(175, 78, 93, 0.3)",
		surfaceHighlight: "rgba(255, 255, 255, 0.08)",
		surfaceLowlight: "rgba(0, 0, 0, 0.22)",
		chromeBg: "#502931",
		chromeBgHover: "#5d2e37",
		chromeFg: "rgba(255, 255, 255, 0.95)",
		chromeMuted: "rgba(255, 255, 255, 0.9)",
		brandSoftText: "#f2d0d6",
		warningSoftText: "#f6d98f",
		tabFgActive: "#af4e5d",
		tabFgInactive: "rgba(175, 78, 93, 0.62)",
		tabBgActive: "rgba(175, 78, 93, 0.16)",
		tabBgPressed: "rgba(175, 78, 93, 0.24)",
	},
	radius,
	space,
	type,
	font,
	weight,
	lineHeight,
	motion,
	layout,
	surface,
	form,
	shadow: {
		sm: createShadow(
			"#000000",
			0.34,
			2,
			1,
			2,
			"0 1px 2px rgba(0, 0, 0, 0.34), 0 8px 20px rgba(0, 0, 0, 0.18)",
		),
		md: createShadow(
			"#000000",
			0.34,
			32,
			12,
			8,
			"0 12px 32px rgba(0, 0, 0, 0.34), 0 2px 8px rgba(0, 0, 0, 0.2)",
		),
		lg: createShadow(
			"#000000",
			0.42,
			48,
			20,
			12,
			"0 20px 48px rgba(0, 0, 0, 0.42), 0 4px 14px rgba(0, 0, 0, 0.24)",
		),
	},
};

export const APP_THEME_MAP: Record<ResolvedThemeMode, AppResolvedTheme> = {
	light: lightTheme,
	dark: darkTheme,
};
