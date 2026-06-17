import { SUPPORTED_LANGS } from "@/constants/locale";

export type AppLang = (typeof SUPPORTED_LANGS)[number];

export interface LocaleContextValue {
	lang: AppLang;
	setLang: (lang: AppLang) => void;
}
