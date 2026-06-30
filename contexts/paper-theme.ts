import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from "react-native-paper";

import type { AppResolvedTheme } from "@/types/client";

export function createPaperTheme(appTheme: AppResolvedTheme): MD3Theme {
	const baseTheme = appTheme.mode === "dark" ? MD3DarkTheme : MD3LightTheme;

	return {
		...baseTheme,
		roundness: appTheme.form.controlRadius,
		colors: {
			...baseTheme.colors,
			primary: appTheme.colors.brand,
			onPrimary: appTheme.colors.chromeFg,
			primaryContainer: appTheme.colors.surface3,
			onPrimaryContainer: appTheme.colors.text,
			secondary: appTheme.colors.info,
			onSecondary: appTheme.colors.chromeFg,
			secondaryContainer: appTheme.colors.surface3,
			onSecondaryContainer: appTheme.colors.text,
			tertiary: appTheme.colors.success,
			onTertiary: appTheme.colors.chromeFg,
			tertiaryContainer: appTheme.colors.surface3,
			onTertiaryContainer: appTheme.colors.text,
			error: appTheme.colors.danger,
			onError: appTheme.colors.chromeFg,
			errorContainer: appTheme.colors.surface3,
			onErrorContainer: appTheme.colors.text,
			background: appTheme.colors.surface1,
			onBackground: appTheme.colors.text,
			surface: appTheme.colors.surface2,
			onSurface: appTheme.colors.text,
			surfaceVariant: appTheme.colors.surface3,
			onSurfaceVariant: appTheme.colors.muted,
			outline: appTheme.colors.border1,
			outlineVariant: appTheme.colors.border2,
			inverseSurface: appTheme.colors.chromeBg,
			inverseOnSurface: appTheme.colors.chromeFg,
			inversePrimary: appTheme.colors.brandPressed,
			surfaceDisabled: appTheme.colors.surfaceLowlight,
			onSurfaceDisabled: appTheme.colors.muted,
			backdrop: appTheme.colors.overlay,
			elevation: {
				...baseTheme.colors.elevation,
				level1: appTheme.colors.surface1,
				level2: appTheme.colors.surface2,
				level3: appTheme.colors.surface3,
				level4: appTheme.colors.surface3,
				level5: appTheme.colors.surface3,
			},
		},
	};
}
