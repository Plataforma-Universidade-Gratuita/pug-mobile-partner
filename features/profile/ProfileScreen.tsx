import React, { useMemo, useRef, useState } from "react";

import { useScrollToTop } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { LogOut } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { RefreshControl, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BrandScreenHeader, HeaderActionButton } from "@/components";
import {
	useAuthStore,
	useCurrentStaffStore,
	useLocaleStore,
	useThemeStore,
} from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import { getTabScreenContentBottomPadding } from "@/utils";

import { ProfileLoadingSkeleton } from "./ProfileLoadingSkeleton";
import {
	InfoCard,
	PreferencesCard,
	ProfileLogoutSheet,
	StaffCard,
} from "./profile-sections";
import { createStyles } from "./styles";
import { resolveProfileFieldValue } from "./utils";

export function ProfileScreen() {
	const { t } = useTranslation();
	const router = useRouter();
	const scrollRef = useRef<ScrollView>(null);
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
	const [isRefreshing, setIsRefreshing] = useState(false);
	useScrollToTop(scrollRef);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme), [theme]);
	const contentBottomPadding = getTabScreenContentBottomPadding(
		theme,
		insets.bottom,
	);
	const currentAccount = useCurrentStaffStore(state => state.currentAccount);
	const currentUser = useCurrentStaffStore(state => state.currentUser);
	const currentEntity = useCurrentStaffStore(state => state.currentEntity);
	const currentStaffError = useCurrentStaffStore(state => state.error);
	const isProfileLoading = useCurrentStaffStore(state => state.isLoading);
	const isProfileLoaded = useCurrentStaffStore(state => state.isLoaded);
	const refreshCurrentStaffContext = useCurrentStaffStore(
		state => state.refreshCurrentStaffContext,
	);
	const loadingLabel = t("profile.values.loading");
	const unavailableLabel = t("profile.values.unavailable");
	const hasProfileLoadError = currentStaffError !== null;
	const isInitialLoading = !isProfileLoaded && isProfileLoading;
	const activeStatusLabel = isProfileLoading
		? loadingLabel
		: currentAccount
			? currentAccount.active
				? t("profile.values.active")
				: t("profile.values.inactive")
			: unavailableLabel;
	const activeTone: "neutral" | "success" | "warning" =
		isProfileLoading || !currentAccount
			? "neutral"
			: currentAccount.active
				? "success"
				: "warning";
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
	const entityName = resolveProfileFieldValue(
		currentEntity?.name,
		isProfileLoading,
		loadingLabel,
		unavailableLabel,
	);
	async function handleRefresh() {
		if (isRefreshing) {
			return;
		}

		setIsRefreshing(true);

		try {
			await refreshCurrentStaffContext();
		} finally {
			setIsRefreshing(false);
		}
	}

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
				ref={scrollRef}
				contentContainerStyle={[
					styles.content,
					{ paddingBottom: contentBottomPadding },
				]}
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={() => {
							void handleRefresh();
						}}
						tintColor={theme.colors.brand}
					/>
				}
				showsVerticalScrollIndicator={false}
			>
				{isInitialLoading ? (
					<ProfileLoadingSkeleton />
				) : (
					<View style={styles.shell}>
						<StaffCard
							badgeLabel={t("profile.badge")}
							cpfLabel={t("profile.fields.cpf")}
							cpfValue={cpf}
							isLoading={isRefreshing}
							name={studentName}
						/>
						<InfoCard
							activeStatusLabel={activeStatusLabel}
							activeTone={activeTone}
							detailsLabel={t("profile.actions.openOrganizationalDetails")}
							emailLabel={t("profile.fields.accountEmail")}
							emailValue={email}
							entityLabel={t("profile.fields.entity")}
							entityValue={entityName}
							errorMessage={
								hasProfileLoadError ? t("profile.errors.load") : undefined
							}
							isLoading={isRefreshing}
							onOpenDetails={() => {
								router.push("/profile/organizational");
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
				)}
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
