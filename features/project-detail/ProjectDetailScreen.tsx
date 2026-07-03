/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import React, { useEffect, useMemo, useState } from "react";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as api from "@/api";
import { AppBackButton, BrandScreenHeader } from "@/components";
import { useCurrentFormerStudentStore, useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ProjectDetailScreenProps } from "@/types/client";
import { getTabScreenContentBottomPadding } from "@/utils";

import { ProjectDetailScrollContent } from "./ProjectDetailScrollContent";
import { ApplyEnrollmentSheet } from "./project-detail-sections";
import { createStyles } from "./styles";
import {
	countActiveParticipants,
	getProjectCompletionRatio,
	resolveOptionalNumberText,
	resolveOptionalText,
} from "./utils";

const PROJECT_DETAIL_STAFF_PAGE = 0,
	PROJECT_DETAIL_STAFF_SIZE = 50;

export function ProjectDetailScreen({
	titleOverride,
}: ProjectDetailScreenProps) {
	const { t } = useTranslation();
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme), [theme]);
	const [isApplySheetVisible, setIsApplySheetVisible] = useState(false);
	const params = useLocalSearchParams<{
		id?: string | string[];
		projectId?: string | string[];
	}>();
	const projectId =
		typeof params.id === "string" && params.id.trim()
			? params.id
			: typeof params.projectId === "string" && params.projectId.trim()
				? params.projectId
				: null;
	const currentFormerStudent = useCurrentFormerStudentStore(
		state => state.currentFormerStudent,
	);
	const isCurrentFormerStudentLoading = useCurrentFormerStudentStore(
		state => state.isLoading,
	);
	const isCurrentFormerStudentLoaded = useCurrentFormerStudentStore(
		state => state.isLoaded,
	);
	const currentFormerStudentError = useCurrentFormerStudentStore(
		state => state.error,
	);
	const loadCurrentFormerStudentContext = useCurrentFormerStudentStore(
		state => state.loadCurrentFormerStudentContext,
	);
	const projectQuery = api.project.projects.useProjectDetailQuery(projectId);
	const project = projectQuery.data ?? null;
	const entityId = project?.entity.id ?? null;
	const entityQuery = api.partner.entities.useEntityDetailQuery(entityId);
	const entity = entityQuery.data ?? null;
	const cityId = entity?.cityId ?? null;
	const cityQuery = api.geo.cities.useCityDetailQuery(cityId);
	const staffQuery = api.partner.staff.useStaffSearchQuery(
		PROJECT_DETAIL_STAFF_PAGE,
		PROJECT_DETAIL_STAFF_SIZE,
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
	const enrollmentsQuery =
		api.project.enrollments.useProjectEnrollmentsQuery(projectId);
	const myEnrollmentQuery =
		api.project.enrollments.useMyEnrollmentDetailQuery(projectId);
	const createEnrollmentMutation =
		api.project.enrollments.useCreateEnrollmentMutation();

	useEffect(() => {
		if (!isCurrentFormerStudentLoaded && !isCurrentFormerStudentLoading) {
			void loadCurrentFormerStudentContext();
		}
	}, [
		isCurrentFormerStudentLoaded,
		isCurrentFormerStudentLoading,
		loadCurrentFormerStudentContext,
	]);

	const enrollments = enrollmentsQuery.data ?? [];
	const activeParticipantsValue =
		enrollmentsQuery.isLoading && enrollmentsQuery.data == null
			? t("projectDetail.values.loading")
			: String(countActiveParticipants(enrollments));
	const completedHours = project?.projectInfo.completedHours ?? null;
	const offeredHours = project?.projectInfo.offeredHours ?? null;
	const completionRatio = getProjectCompletionRatio(
		completedHours,
		offeredHours,
	);
	const completionPercentLabel = t("projectDetail.metrics.progressValue", {
		value: Math.round(completionRatio * 100),
	});
	const maxParticipantsValue = resolveOptionalNumberText(
		project?.projectInfo.maxParticipants ?? null,
		t("projectDetail.values.unlimited"),
	);
	const completedHoursValue = resolveOptionalNumberText(
		completedHours,
		t("projectDetail.values.unavailable"),
	);
	const offeredHoursValue = resolveOptionalNumberText(
		offeredHours,
		t("projectDetail.values.unavailable"),
	);
	const cityValue =
		cityQuery.isLoading && cityId !== null
			? t("projectDetail.values.loading")
			: resolveOptionalText(
					cityQuery.data?.name,
					t("projectDetail.values.unavailable"),
				);
	const entityName = resolveOptionalText(
		entity?.name,
		t("projectDetail.values.unavailable"),
	);
	const addressValue = entity?.address?.trim() ? entity.address : null;
	const cnpjValue = resolveOptionalText(
		entity?.cnpjFormatted ?? entity?.cnpj,
		t("projectDetail.values.unavailable"),
	);
	const staffItems = (staffQuery.data?.content ?? [])
		.map(item => ({
			name: item.account.user.name.trim(),
			email: item.account.email.trim(),
		}))
		.filter(item => item.name.length > 0);
	const staffStateLabel =
		staffQuery.isLoading && entityId !== null
			? t("projectDetail.values.loading")
			: t("projectDetail.values.unavailable");
	const myEnrollment = myEnrollmentQuery.data;
	const canApply =
		projectId !== null &&
		currentFormerStudent !== null &&
		myEnrollment === null &&
		!myEnrollmentQuery.isLoading;
	const isMutatingEnrollment = createEnrollmentMutation.isPending;
	const hasQueryError =
		projectQuery.error != null ||
		entityQuery.error != null ||
		cityQuery.error != null ||
		staffQuery.error != null ||
		enrollmentsQuery.error != null ||
		myEnrollmentQuery.error != null ||
		currentFormerStudentError != null;
	const isInitialLoading =
		projectId === null ||
		(projectQuery.isLoading && projectQuery.data == null) ||
		(!isCurrentFormerStudentLoaded && isCurrentFormerStudentLoading);
	const isRefreshing =
		projectQuery.isRefetching ||
		entityQuery.isRefetching ||
		cityQuery.isRefetching ||
		staffQuery.isRefetching ||
		enrollmentsQuery.isRefetching ||
		myEnrollmentQuery.isRefetching;
	const contentBottomPadding = getTabScreenContentBottomPadding(
		theme,
		insets.bottom,
	);

	return (
		<View style={[styles.screen, { backgroundColor: spec.screenBackground }]}>
			<BrandScreenHeader
				title={titleOverride ?? t("projectDetail.title")}
				leftAccessory={<AppBackButton />}
			/>
			<ProjectDetailScrollContent
				activeParticipantsValue={activeParticipantsValue}
				addressValue={addressValue}
				badgeLabel={t("projectDetail.states.badge")}
				canApply={canApply}
				canManage={false}
				cityValue={cityValue}
				cnpjValue={cnpjValue}
				completedHoursValue={completedHoursValue}
				completionPercentLabel={completionPercentLabel}
				completionRatio={completionRatio}
				contentBottomPadding={contentBottomPadding}
				descriptionError={t("projectDetail.states.errorDescription")}
				descriptionLoading={t("projectDetail.states.loadingDescription")}
				descriptionMissing={t("projectDetail.states.missingDescription")}
				disabled={isMutatingEnrollment}
				entityName={entityName}
				hasQueryError={hasQueryError}
				isInitialLoading={isInitialLoading}
				isRefreshing={isRefreshing}
				maxParticipantsValue={maxParticipantsValue}
				offeredHoursValue={offeredHoursValue}
				onApply={() => {
					setIsApplySheetVisible(true);
				}}
				onManage={() => undefined}
				onRefresh={() => {
					if (!isCurrentFormerStudentLoaded)
						void loadCurrentFormerStudentContext();
					if (projectId !== null) {
						void projectQuery.refetch();
						void enrollmentsQuery.refetch();
						void myEnrollmentQuery.refetch();
					}
					if (entityId !== null) {
						void entityQuery.refetch();
						void staffQuery.refetch();
					}
					if (cityId !== null) void cityQuery.refetch();
				}}
				project={project}
				staffItems={staffItems}
				staffStateLabel={staffStateLabel}
				themeBrandColor={theme.colors.brand}
				titleError={t("projectDetail.states.errorTitle")}
				titleLoading={t("projectDetail.states.loadingTitle")}
				titleMissing={t("projectDetail.states.missingTitle")}
			/>
			{project ? (
				<ApplyEnrollmentSheet
					isBusy={isMutatingEnrollment}
					onApply={() => {
						if (!projectId || !currentFormerStudent) return;
						void createEnrollmentMutation
							.mutateAsync({ projectId })
							.then(() => {
								setIsApplySheetVisible(false);
								router.replace({
									pathname: "/activity",
									params: { tab: "enrollments" },
								});
							});
					}}
					onDismiss={() => {
						setIsApplySheetVisible(false);
					}}
					projectName={project.name}
					visible={isApplySheetVisible}
				/>
			) : null}
		</View>
	);
}
