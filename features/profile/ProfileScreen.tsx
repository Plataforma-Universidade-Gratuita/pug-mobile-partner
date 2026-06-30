import React, { useMemo, useState } from "react";

import { useRouter } from "expo-router";
import { LogOut } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BrandScreenHeader, HeaderActionButton } from "@/components";
import {
	useAuthStore,
	useCurrentFormerStudentStore,
	useLocaleStore,
	useThemeStore,
} from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";

import {
	InfoCard,
	PreferencesCard,
	ProfileLogoutSheet,
	StudentCard,
} from "./profile-sections";
import { createStyles } from "./styles";
import { resolveProfileFieldValue } from "./utils";

export function ProfileScreen() {
	const { t } = useTranslation();
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const theme = useThemeStore(state => state.theme);
	const themeMode = useThemeStore(state => state.mode);
	const setThemeMode = useThemeStore(state => state.setMode);
	const language = useLocaleStore(state => state.language);
	const setLanguage = useLocaleStore(state => state.setLanguage);
	const signOut = useAuthStore(state => state.signOut);
	const signOutAll = useAuthStore(state => state.signOutAll);
	const isMutatingSession = useAuthStore(state => state.isMutatingSession);
	const [isLogoutSheetVisible, setIsLogoutSheetVisible] = useState(false);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme), [theme]);
	const contentBottomPadding =
		theme.space[8] + theme.space[2] + Math.max(insets.bottom, theme.space[4]);
	const currentAccount = useCurrentFormerStudentStore(
		state => state.currentAccount,
	);
	const currentUser = useCurrentFormerStudentStore(state => state.currentUser);
	const currentFormerStudent = useCurrentFormerStudentStore(
		state => state.currentFormerStudent,
	);
	const currentCourse = useCurrentFormerStudentStore(
		state => state.currentCourse,
	);
	const currentFormerStudentError = useCurrentFormerStudentStore(
		state => state.error,
	);
	const isProfileLoading = useCurrentFormerStudentStore(
		state => state.isLoading,
	);
	const loadingLabel = t("profile.values.loading");
	const unavailableLabel = t("profile.values.unavailable");
	const hasProfileLoadError = currentFormerStudentError !== null;
	const activeStatusLabel = isProfileLoading
		? loadingLabel
		: currentAccount
			? currentAccount.active
				? t("profile.values.active")
				: t("profile.values.inactive")
			: unavailableLabel;
	const activeTone: "neutral" | "success" | "danger" =
		isProfileLoading || !currentAccount
			? "neutral"
			: currentAccount.active
				? "success"
				: "danger";
	const studentName = resolveProfileFieldValue(
		currentUser?.name,
		isProfileLoading,
		loadingLabel,
		unavailableLabel,
	);
	const cpf = resolveProfileFieldValue(
		currentUser?.cpfFormatted ?? currentUser?.cpf,
		isProfileLoading,
		loadingLabel,
		unavailableLabel,
	);
	const email = resolveProfileFieldValue(
		currentAccount?.email,
		isProfileLoading,
		loadingLabel,
		unavailableLabel,
	);
	const academicRegistration = resolveProfileFieldValue(
		currentFormerStudent?.academicRegistration,
		isProfileLoading,
		loadingLabel,
		unavailableLabel,
	);
	const campus = resolveProfileFieldValue(
		currentFormerStudent?.campus.campusFormatted,
		isProfileLoading,
		loadingLabel,
		unavailableLabel,
	);
	const courseName = resolveProfileFieldValue(
		currentCourse?.name,
		isProfileLoading,
		loadingLabel,
		unavailableLabel,
	);
	const areaOfExpertiseName = resolveProfileFieldValue(
		currentCourse?.areaOfExpertise.name,
		isProfileLoading,
		loadingLabel,
		unavailableLabel,
	);

	return (
		<View style={[styles.screen, { backgroundColor: spec.screenBackground }]}>
			<BrandScreenHeader
				title={t("profile.title")}
				rightAccessory={
					<HeaderActionButton
						accessibilityLabel={t("profile.logout.trigger")}
						disabled={isMutatingSession}
						icon={LogOut}
						onPress={() => {
							setIsLogoutSheetVisible(true);
						}}
					/>
				}
			/>
			<ScrollView
				contentContainerStyle={[
					styles.content,
					{ paddingBottom: contentBottomPadding },
				]}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.shell}>
					<StudentCard
						badgeLabel={t("profile.badge")}
						cpfLabel={t("profile.fields.cpf")}
						cpfValue={cpf}
						name={studentName}
					/>
					<InfoCard
						academicRegistrationLabel={t("profile.fields.academicRegistration")}
						academicRegistrationValue={academicRegistration}
						activeStatusLabel={activeStatusLabel}
						activeTone={activeTone}
						areaOfExpertiseLabel={t("profile.fields.areaOfExpertise")}
						areaOfExpertiseValue={areaOfExpertiseName}
						campusValue={campus}
						courseLabel={t("profile.fields.course")}
						courseValue={courseName}
						detailsLabel={t("profile.actions.openAcademicDetails")}
						emailLabel={t("profile.fields.accountEmail")}
						emailValue={email}
						errorMessage={
							hasProfileLoadError ? t("profile.errors.load") : undefined
						}
						onOpenAcademicDetails={() => {
							router.push("/profile/academic");
						}}
						sectionTitle={t("profile.sections.record")}
					/>
					<PreferencesCard
						language={language}
						languageHelper={t("profile.fields.languageHelper")}
						languageLabel={t("profile.fields.language")}
						onLanguageChange={nextLanguage => {
							void setLanguage(nextLanguage);
						}}
						onThemeModeChange={nextThemeMode => {
							void setThemeMode(nextThemeMode);
						}}
						sectionTitle={t("profile.sections.preferences")}
						themeHelper={t("profile.fields.themeHelper")}
						themeLabel={t("profile.fields.theme")}
						themeMode={themeMode}
					/>
				</View>
			</ScrollView>
			<ProfileLogoutSheet
				isBusy={isMutatingSession}
				onDismiss={() => {
					if (!isMutatingSession) {
						setIsLogoutSheetVisible(false);
					}
				}}
				onSignOut={() => {
					void signOut();
				}}
				onSignOutAll={() => {
					void signOutAll();
				}}
				visible={isLogoutSheetVisible}
			/>
		</View>
	);
}
