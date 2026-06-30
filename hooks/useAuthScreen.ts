import { useMemo } from "react";

import { useAuthStore, useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type {
	AppResolvedTheme,
	PrimitiveSurfaceStyleSpec,
} from "@/types/client";

export function useAuthScreen<TStyles>(
	createStyles: (
		theme: AppResolvedTheme,
		surfaceSpec: PrimitiveSurfaceStyleSpec,
	) => TStyles,
) {
	const theme = useThemeStore(state => state.theme);
	const isMutatingSession = useAuthStore(state => state.isMutatingSession);
	const surfaceSpec = useMemo(
		() => createPrimitiveSurfaceStyleSpec(theme),
		[theme],
	);
	const styles = useMemo(
		() => createStyles(theme, surfaceSpec),
		[createStyles, surfaceSpec, theme],
	);

	return {
		isMutatingSession,
		styles,
	};
}
