import type { AppLang, AppTheme } from "@/types/client";

export const DEV_THEME_OPTION_LABEL_KEYS: Record<AppTheme, string> = {
	system: "mobile.dev.theme.options.system",
	light: "mobile.dev.theme.options.light",
	dark: "mobile.dev.theme.options.dark",
};

export const DEV_LANGUAGE_OPTION_LABEL_KEYS: Record<AppLang, string> = {
	"pt-BR": "mobile.dev.language.options.ptBR",
	"en-US": "mobile.dev.language.options.enUS",
};
