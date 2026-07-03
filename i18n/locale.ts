import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Platform } from "react-native";

import { DEFAULT_LANG } from "@/constants/locale";
import {
	I18N_NAMESPACE,
	LANG_COOKIE_MAX_AGE,
	LANG_COOKIE_NAME,
} from "@/i18n/constants";
import enUSCommon from "@/public/locales/en-US/common.json";
import enUSFeedback from "@/public/locales/en-US/feedback.json";
import ptBRCommon from "@/public/locales/pt-BR/common.json";
import ptBRFeedback from "@/public/locales/pt-BR/feedback.json";
import type { AppLang } from "@/types/client";

const resources = {
	"en-US": {
		[I18N_NAMESPACE]: {
			...enUSCommon,
			feedback: enUSFeedback,
		},
	},
	"pt-BR": {
		[I18N_NAMESPACE]: {
			...ptBRCommon,
			feedback: ptBRFeedback,
		},
	},
} as const;

export function initI18n(initial: AppLang) {
	if (i18n.isInitialized) {
		/* i18next exposes the shared singleton instance through the default export
		in this setup, so we intentionally call the instance method here. */
		// eslint-disable-next-line import/no-named-as-default-member
		void i18n.changeLanguage(initial);
		return i18n;
	}

	/* i18next exposes the shared singleton instance through the default export in
	this setup, so we intentionally chain the instance methods here. */
	// eslint-disable-next-line import/no-named-as-default-member
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

	if (Platform.OS !== "web" || typeof document === "undefined") {
		return;
	}

	document.cookie = `${LANG_COOKIE_NAME}=${lang}; Path=/; Max-Age=${LANG_COOKIE_MAX_AGE}; SameSite=Lax`;
	document.documentElement.lang = lang;
}
