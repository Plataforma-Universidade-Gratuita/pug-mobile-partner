import type { BadgeTone } from "../components/primitives/display/badge";
import type { AppLang } from "../context";
import type { AppTheme } from "../theme";

export interface ProfileStudentCardProps {
	badgeLabel: string;
	name: string;
	cpfLabel: string;
	cpfValue: string;
}

export interface ProfileInfoCardProps {
	sectionTitle: string;
	detailsLabel: string;
	emailLabel: string;
	emailValue: string;
	activeStatusLabel: string;
	activeTone: BadgeTone;
	academicRegistrationLabel: string;
	academicRegistrationValue: string;
	campusValue: string;
	courseLabel: string;
	courseValue: string;
	areaOfExpertiseLabel: string;
	areaOfExpertiseValue: string;
	onOpenAcademicDetails: () => void;
	errorMessage?: string | undefined;
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
