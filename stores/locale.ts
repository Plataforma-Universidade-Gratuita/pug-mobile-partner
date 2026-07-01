import { create } from "zustand";

import { DEFAULT_LANG, LANG_STORAGE_KEY, SUPPORTED_LANGS } from "@/constants";
import { applyClientLanguage } from "@/i18n";
import type { AppLang, LocaleStoreState } from "@/types/client";
import { getStoredValue, setStoredValue } from "@/utils";

function coerceLanguage(value: string | null): AppLang {
	if (value && SUPPORTED_LANGS.includes(value as AppLang)) {
		return value as AppLang;
	}

	return DEFAULT_LANG;
}

export const useLocaleStore = create<LocaleStoreState>((set, get) => ({
	language: DEFAULT_LANG,
	isHydrated: false,

	hydrateLanguage: async () => {
		if (get().isHydrated) {
			return;
		}

		const nextLanguage = coerceLanguage(await getStoredValue(LANG_STORAGE_KEY));
		applyClientLanguage(nextLanguage);

		set({
			language: nextLanguage,
			isHydrated: true,
		});
	},

	setLanguage: async language => {
		const nextLanguage = coerceLanguage(language);

		applyClientLanguage(nextLanguage);
		set({
			language: nextLanguage,
			isHydrated: true,
		});

		void setStoredValue(LANG_STORAGE_KEY, nextLanguage);
	},
}));
