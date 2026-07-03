/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
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
			: withAlpha(theme.colors.danger, theme.mode === "dark" ? 0.16 : 0.1),
		borderColor: withAlpha(
			theme.colors.danger,
			theme.mode === "dark" ? 0.28 : 0.18,
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
			? withAlpha(theme.colors.text, theme.mode === "dark" ? 0.08 : 0.06)
			: theme.mode === "dark"
				? theme.colors.surface3
				: withAlpha(theme.colors.text, 0.03),
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
			? withAlpha(theme.colors.brand, theme.mode === "dark" ? 0.18 : 0.18)
			: withAlpha(theme.colors.brand, theme.mode === "dark" ? 0.1 : 0.1),
		borderColor: withAlpha(
			theme.colors.brand,
			theme.mode === "dark" ? 0.5 : 0.22,
		),
		opacity: isBusy ? 0.72 : 1,
	};
}
