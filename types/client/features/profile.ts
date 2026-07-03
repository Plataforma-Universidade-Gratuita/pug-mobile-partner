/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import type { BadgeTone } from "../components/primitives/display/badge";
import type { AppLang } from "../context";
import type { AppTheme } from "../theme";

export interface ProfileStudentCardProps {
	badgeLabel: string;
	name: string;
	cpfLabel: string;
	cpfValue: string;
	isLoading: boolean;
}

export interface ProfileInfoCardProps {
	sectionTitle: string;
	detailsLabel: string;
	emailLabel: string;
	emailValue: string;
	activeStatusLabel: string;
	activeTone: BadgeTone;
	entityLabel: string;
	entityValue: string;
	onOpenDetails: () => void;
	errorMessage?: string | undefined;
	isLoading: boolean;
}

export interface ProfilePreferencesCardProps {
	sectionTitle: string;
	themeLabel: string;
	themeHelper: string;
	themeMode: AppTheme;
	onThemeModeChange: (mode: AppTheme) => void;
	languageLabel: string;
	languageHelper: string;
	language: AppLang;
	onLanguageChange: (language: AppLang) => void;
}

export interface ProfileLogoutSheetProps {
	visible: boolean;
	isBusy: boolean;
	onDismiss: () => void;
	onSignOut: () => void;
	onSignOutAll: () => void;
}
