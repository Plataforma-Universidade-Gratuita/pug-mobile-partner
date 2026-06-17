export const SUPPORTED_LANGS = ["pt-BR", "en-US"] as const;
export const DEFAULT_LANG = "pt-BR";

export const LANG_COOKIE_NAME = "lang";
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const I18N_NAMESPACE = "common";
export const I18N_LOAD_PATH = "/locales/{{lng}}/{{ns}}.json";

export const LANG_ALIASES = {
	en: "en-US",
	pt: "pt-BR",
} as const;
