import type {
	AppResolvedTheme,
	PrimitiveSurfaceStyleSpec,
} from "@/types/client";
import { withAlpha } from "@/utils";

export function getProjectStaffInitials(name: string) {
	return name
		.trim()
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map(part => part[0]?.toUpperCase() ?? "")
		.join("");
}

export function createExitProjectOptionStyle(
	theme: AppResolvedTheme,
	isBusy: boolean,
	pressed: boolean,
) {
	return {
		backgroundColor: pressed
			? withAlpha(theme.colors.danger, theme.mode === "dark" ? 0.24 : 0.18)
			: withAlpha(theme.colors.danger, theme.mode === "dark" ? 0.16 : 0.12),
		borderColor: withAlpha(
			theme.colors.danger,
			theme.mode === "dark" ? 0.28 : 0.2,
		),
		opacity: isBusy ? 0.6 : 1,
	};
}

export function createCloseSheetOptionStyle(
	theme: AppResolvedTheme,
	spec: PrimitiveSurfaceStyleSpec,
	isBusy: boolean,
	pressed: boolean,
) {
	return {
		backgroundColor: pressed
			? withAlpha(theme.colors.text, theme.mode === "dark" ? 0.08 : 0.04)
			: theme.colors.surface3,
		borderColor: spec.panelBorder,
		opacity: isBusy ? 0.6 : 1,
	};
}

export function createApplyEnrollmentOptionStyle(
	theme: AppResolvedTheme,
	isBusy: boolean,
	pressed: boolean,
) {
	return {
		backgroundColor: pressed
			? withAlpha(theme.colors.brand, theme.mode === "dark" ? 0.18 : 0.12)
			: withAlpha(theme.colors.brand, theme.mode === "dark" ? 0.1 : 0.06),
		borderColor: withAlpha(
			theme.colors.brand,
			theme.mode === "dark" ? 0.5 : 0.36,
		),
		opacity: isBusy ? 0.72 : 1,
	};
}
