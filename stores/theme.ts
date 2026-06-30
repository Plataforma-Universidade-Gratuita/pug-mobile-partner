import { Appearance } from "react-native";
import { create } from "zustand";

import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/constants";
import type { ThemeStoreState } from "@/types/client";
import {
	coerceResolvedTheme,
	coerceTheme,
	getStoredValue,
	resolveAppTheme,
	resolveThemeMode,
	setStoredValue,
} from "@/utils";

function buildThemeState(
	mode: ThemeStoreState["mode"],
	systemMode: ThemeStoreState["systemMode"],
	isHydrated: boolean,
) {
	const resolvedMode = resolveThemeMode(mode, systemMode);

	return {
		mode,
		systemMode,
		resolvedMode,
		theme: resolveAppTheme(mode, systemMode),
		isHydrated,
	};
}

const initialSystemMode = coerceResolvedTheme(Appearance.getColorScheme());

export const useThemeStore = create<ThemeStoreState>((set, get) => ({
	...buildThemeState(DEFAULT_THEME, initialSystemMode, false),

	hydrateTheme: async () => {
		if (get().isHydrated) {
			return;
		}

		const storedMode = coerceTheme(await getStoredValue(THEME_STORAGE_KEY));

		set(state => buildThemeState(storedMode, state.systemMode, true));
	},

	setMode: async mode => {
		const nextMode = coerceTheme(mode);

		await setStoredValue(THEME_STORAGE_KEY, nextMode);

		set(state => buildThemeState(nextMode, state.systemMode, true));
	},

	setSystemMode: mode => {
		const nextSystemMode = coerceResolvedTheme(mode);

		set(state => buildThemeState(state.mode, nextSystemMode, state.isHydrated));
	},
}));
