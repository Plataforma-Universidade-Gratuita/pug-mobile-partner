
import {
	APP_THEME_MAP,
	APP_THEMES,
	DEFAULT_RESOLVED_THEME,
	DEFAULT_THEME,
} from "@/constants";
import type {
	AppResolvedTheme,
	AppTheme,
	ResolvedThemeMode,
} from "@/types/client";

function clampAlpha(alpha: number) {
	return Math.min(1, Math.max(0, alpha));
}

function formatAlpha(alpha: number) {
	return clampAlpha(alpha).toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
}

function parseHexColor(color: string) {
	const normalized = color.replace("#", "");

	if (normalized.length === 3) {
		return normalized
			.split("")
			.map(value => value + value)
			.join("");
	}

	if (normalized.length === 6) {
		return normalized;
	}

	return null;
}

function parseRgbColor(color: string) {
	const match = color.match(
		/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*[\d.]+\s*)?\)$/,
	);

	if (!match) {
		return null;
	}

	return {
		red: Number(match[1]),
		green: Number(match[2]),
		blue: Number(match[3]),
	};
}

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

export function withAlpha(color: string, alpha: number) {
	const hex = parseHexColor(color);

	if (hex) {
		const red = Number.parseInt(hex.slice(0, 2), 16);
		const green = Number.parseInt(hex.slice(2, 4), 16);
		const blue = Number.parseInt(hex.slice(4, 6), 16);

		return `rgba(${red}, ${green}, ${blue}, ${formatAlpha(alpha)})`;
	}

	const rgb = parseRgbColor(color);

	if (rgb) {
		return `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, ${formatAlpha(alpha)})`;
	}

	return color;
}
