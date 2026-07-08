
import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as api from "@/api";
import { AppBackButton, BrandScreenHeader } from "@/components";
import { useCurrentStaffStore, useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import { getTabScreenContentBottomPadding } from "@/utils";

import { ProjectEntityCard } from "../project-detail/project-detail-sections";
import { OrganizationalDetailsStateCard } from "./OrganizationalDetailsStateCard";
import { createStyles } from "./styles";

const ORGANIZATIONAL_DETAILS_STAFF_PAGE = 0,
	ORGANIZATIONAL_DETAILS_STAFF_SIZE = 50;

export function OrganizationalDetailsScreen() {
	const { t } = useTranslation();
	const insets = useSafeAreaInsets();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const currentStaff = useCurrentStaffStore(state => state.currentStaff);
	const currentEntity = useCurrentStaffStore(state => state.currentEntity);
	const currentStaffError = useCurrentStaffStore(state => state.error);
	const isLoading = useCurrentStaffStore(state => state.isLoading);
	const isLoaded = useCurrentStaffStore(state => state.isLoaded);
	const entityId = currentStaff?.entityId ?? null;
	const cityId = currentEntity?.cityId ?? null;
	const cityQuery = api.geo.cities.useCityDetailQuery(cityId);
	const staffQuery = api.partner.staff.useStaffSearchQuery(
		ORGANIZATIONAL_DETAILS_STAFF_PAGE,
		ORGANIZATIONAL_DETAILS_STAFF_SIZE,
		{
			activeOnly: true,
			cpf: "",
			dateFrom: "",
			dateTo: "",
			email: "",
			entityIds: entityId ? [entityId] : [],
			name: "",
		},
		entityId !== null,
	);
	const contentBottomPadding = getTabScreenContentBottomPadding(
		theme,
		insets.bottom,
	);
	const hasError =
		currentStaffError !== null ||
		cityQuery.error != null ||
		staffQuery.error != null;
	const isInitialLoading = !isLoaded && isLoading;
	const isEmpty = !isLoading && currentStaff == null;
	const cityValue =
		cityQuery.isLoading && cityId !== null
			? t("profile.values.loading")
			: (cityQuery.data?.name ?? t("profile.values.unavailable"));
	const cnpjValue =
		currentEntity?.cnpjFormatted ??
		currentEntity?.cnpj ??
		t("profile.values.unavailable");
	const addressValue = currentEntity?.address?.trim()
		? currentEntity.address
		: null;
	const entityName = currentEntity?.name ?? t("profile.values.unavailable");
	const staffItems = (staffQuery.data?.content ?? [])
		.map(item => ({
			name: item.account.user.name.trim(),
			email: item.account.email.trim(),
		}))
		.filter(item => item.name.length > 0);
	const staffStateLabel =
		staffQuery.isLoading && entityId !== null
			? t("profile.values.loading")
			: t("profile.values.unavailable");

	return (
		<View style={[styles.screen, { backgroundColor: spec.screenBackground }]}>
			<BrandScreenHeader
				leftAccessory={<AppBackButton />}
				title={t("profile.actions.openOrganizationalDetails")}
			/>
			<ScrollView
				contentContainerStyle={[
					styles.content,
					{ paddingBottom: contentBottomPadding },
				]}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.shell}>
					{hasError ? (
						<OrganizationalDetailsStateCard
							badgeLabel={t("profile.badge")}
							description={t("profile.errors.load")}
							title={t("profile.states.organizationErrorTitle")}
							tone="danger"
						/>
					) : isInitialLoading ? (
						<OrganizationalDetailsStateCard
							badgeLabel={t("profile.badge")}
							description={t("profile.states.organizationLoadingDescription")}
							title={t("profile.states.organizationLoadingTitle")}
							tone="neutral"
						/>
					) : isEmpty ? (
						<OrganizationalDetailsStateCard
							badgeLabel={t("profile.badge")}
							description={t("profile.states.organizationEmptyDescription")}
							title={t("profile.states.organizationEmptyTitle")}
							tone="warning"
						/>
					) : (
						<ProjectEntityCard
							addressValue={addressValue}
							cityValue={cityValue}
							cnpjValue={cnpjValue}
							entityName={entityName}
							staffItems={staffItems}
							staffStateLabel={staffStateLabel}
						/>
					)}
				</View>
			</ScrollView>
		</View>
	);
}
