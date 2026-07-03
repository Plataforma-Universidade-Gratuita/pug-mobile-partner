/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import type { AppLang, AppTheme } from "@/types/client";

export const PROFILE_THEME_OPTIONS: readonly {
	labelKey: string;
	value: AppTheme;
}[] = [
	{
		labelKey: "profile.options.theme.light",
		value: "light",
	},
	{
		labelKey: "profile.options.theme.system",
		value: "system",
	},
	{
		labelKey: "profile.options.theme.dark",
		value: "dark",
	},
];

export const PROFILE_LANGUAGE_OPTIONS: readonly {
	label: string;
	value: AppLang;
}[] = [
	{
		label: "PT-BR",
		value: "pt-BR",
	},
	{
		label: "EN-US",
		value: "en-US",
	},
];
