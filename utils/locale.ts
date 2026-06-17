import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";

import { DEFAULT_LANG, I18N_NAMESPACE } from "@/constants/locale";
import enUSCommon from "@/public/locales/en-US/common.json";
import ptBRCommon from "@/public/locales/pt-BR/common.json";
import type { AppLang } from "@/types/client";

const i18n = createInstance();

const resources = {
	"en-US": {
		[I18N_NAMESPACE]: enUSCommon,
	},
	"pt-BR": {
		[I18N_NAMESPACE]: ptBRCommon,
	},
} as const;

export function initI18n(initial: AppLang) {
	if (i18n.isInitialized) {
		void i18n.changeLanguage(initial);
		return i18n;
	}

	i18n.use(initReactI18next).init({
		lng: initial,
		fallbackLng: DEFAULT_LANG,
		resources,
		load: "currentOnly",
		ns: [I18N_NAMESPACE],
		defaultNS: I18N_NAMESPACE,
		interpolation: { escapeValue: false },
		initAsync: false,
		react: { useSuspense: false },
	});

	return i18n;
}

export function applyClientLanguage(lang: AppLang, instance = initI18n(lang)) {
	void instance.changeLanguage(lang);
}
