import {
	APP_THEME_MAP,
	APP_THEMES,
	DEFAULT_THEME,
	DEFAULT_RESOLVED_THEME,
} from "@/constants/theme";
import type {
	AppResolvedTheme,
	AppTheme,
	ResolvedThemeMode,
} from "@/types/client";

export function isAppTheme(x: unknown): x is AppTheme {
	return typeof x === "string" && APP_THEMES.includes(x as AppTheme);
}

export function coerceTheme(x: unknown): AppTheme {
	return isAppTheme(x) ? x : DEFAULT_THEME;
}

export function isResolvedThemeMode(x: unknown): x is ResolvedThemeMode {
	return x === "light" || x === "dark";
}

export function coerceResolvedTheme(x: unknown): ResolvedThemeMode {
	return isResolvedThemeMode(x) ? x : DEFAULT_RESOLVED_THEME;
}

export function resolveThemeMode(
	mode: AppTheme,
	systemMode: ResolvedThemeMode,
): ResolvedThemeMode {
	return mode === "system" ? systemMode : mode;
}

export function resolveAppTheme(
	mode: AppTheme,
	systemMode: ResolvedThemeMode,
): AppResolvedTheme {
	return APP_THEME_MAP[resolveThemeMode(mode, systemMode)];
}

export function getStatusBarStyle(mode: ResolvedThemeMode): "dark" | "light" {
	return mode === "dark" ? "light" : "dark";
}
