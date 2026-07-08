import type {
	AppResolvedTheme,
	PrimitiveSurfaceStyleSpec,
} from "@/types/client";
import { withAlpha } from "@/utils";

export function createStaySignedInOptionStyle(
	theme: AppResolvedTheme,
	spec: PrimitiveSurfaceStyleSpec,
	isBusy: boolean,
	pressed: boolean,
) {
	return {
		backgroundColor: pressed
			? withAlpha(theme.colors.text, theme.mode === "dark" ? 0.08 : 0.06)
			: theme.mode === "dark"
				? theme.colors.surface3
				: withAlpha(theme.colors.text, 0.03),
		borderColor: spec.panelBorder,
		opacity: isBusy ? 0.6 : 1,
	};
}

export function createSignOutEverywhereOptionStyle(
	theme: AppResolvedTheme,
	isBusy: boolean,
	pressed: boolean,
) {
	return {
		backgroundColor: pressed
			? withAlpha(theme.colors.warning, theme.mode === "dark" ? 0.22 : 0.18)
			: withAlpha(theme.colors.warning, theme.mode === "dark" ? 0.16 : 0.1),
		borderColor: withAlpha(
			theme.colors.warning,
			theme.mode === "dark" ? 0.24 : 0.18,
		),
		opacity: isBusy ? 0.6 : 1,
	};
}

export function createSignOutDeviceOptionStyle(
	theme: AppResolvedTheme,
	isBusy: boolean,
	pressed: boolean,
) {
	return {
		backgroundColor: pressed
			? withAlpha(theme.colors.danger, theme.mode === "dark" ? 0.24 : 0.18)
			: withAlpha(theme.colors.danger, theme.mode === "dark" ? 0.16 : 0.1),
		borderColor: withAlpha(
			theme.colors.danger,
			theme.mode === "dark" ? 0.28 : 0.18,
		),
		opacity: isBusy ? 0.6 : 1,
	};
}
