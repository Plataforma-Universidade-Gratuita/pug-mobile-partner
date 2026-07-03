/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */

export const SUPPORTED_LANGS = ["pt-BR", "en-US"] as const;

export const DEFAULT_LANG = "pt-BR";
export const LANG_STORAGE_KEY = "lang";

export const LANG_ALIASES = {
	en: "en-US",
	pt: "pt-BR",
} as const;
