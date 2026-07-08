import React, { useEffect, useMemo, useState } from "react";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as api from "@/api";
import { AppBackButton, BrandScreenHeader } from "@/components";
import { useCurrentFormerStudentStore, useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type {
	AttendanceComplexSearchFilters,
	EnrollmentDetailScreenProps,
} from "@/types/client";
import { getTabScreenContentBottomPadding } from "@/utils";

import { ManageEnrollmentSheet } from "../project-detail/project-detail-sections";
import { canManageEnrollment } from "../project-detail/utils";
import { EnrollmentDetailContent } from "./EnrollmentDetailContent";
import { createStyles } from "./styles";

export function EnrollmentDetailScreen({
	projectId: projectIdProp,
}: EnrollmentDetailScreenProps) {
	const { t } = useTranslation();
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const [isManageSheetVisible, setIsManageSheetVisible] = useState(false);
	const [isManualRefreshing, setIsManualRefreshing] = useState(false);
	const params = useLocalSearchParams<{ projectId?: string | string[] }>();
	const projectId =
		projectIdProp ??
		(typeof params.projectId === "string" && params.projectId.trim()
			? params.projectId
			: null);
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

	useEffect(() => {
		if (!isCurrentFormerStudentLoaded && !isCurrentFormerStudentLoading) {
			void loadCurrentFormerStudentContext();
		}
	}, [
		isCurrentFormerStudentLoaded,
		isCurrentFormerStudentLoading,
		loadCurrentFormerStudentContext,
	]);

	const projectQuery = api.project.projects.useProjectDetailQuery(projectId);
	const project = projectQuery.data ?? null;
	const myEnrollmentQuery =
		api.project.enrollments.useMyEnrollmentDetailQuery(projectId);
	const updateMyEnrollmentMutation =
		api.project.enrollments.useMyEnrollmentStatusMutation();
	const attendanceFilters: AttendanceComplexSearchFilters = {
		projectIds: projectId ? [projectId] : [],
		formerStudentIds: currentFormerStudent?.accountId
			? [currentFormerStudent.accountId]
			: [],
		statuses: [],
		validatedByIds: [],
		durationFrom: "",
		durationTo: "",
		dateFrom: "",
		dateTo: "",
	};
	const attendancesQuery = api.project.attendances.useAttendancesSearchQuery(
		0,
		100,
		attendanceFilters,
		projectId !== null && currentFormerStudent?.accountId != null,
	);

	const hasQueryError =
		currentFormerStudentError != null ||
		projectQuery.error != null ||
		myEnrollmentQuery.error != null ||
		attendancesQuery.error != null;
	const isInitialLoading =
		projectId === null ||
		(projectQuery.isLoading && projectQuery.data == null) ||
		(myEnrollmentQuery.isLoading && myEnrollmentQuery.data == null) ||
		(!isCurrentFormerStudentLoaded && isCurrentFormerStudentLoading);
	const isRefreshing = isManualRefreshing;
	const contentBottomPadding = getTabScreenContentBottomPadding(
		theme,
		insets.bottom,
	);
	const attendanceItems = attendancesQuery.data?.content ?? [];
	const myEnrollment = myEnrollmentQuery.data;
	const myEnrollmentStatus = myEnrollment?.status.status;
	const hasEnrollment = myEnrollment != null;
	const canManage = canManageEnrollment(myEnrollmentStatus);
	const isMutatingEnrollment = updateMyEnrollmentMutation.isPending;

	return (
		<View style={[styles.screen, { backgroundColor: spec.screenBackground }]}>
			<BrandScreenHeader
				title={t("activity.enrollmentDetail.title")}
				leftAccessory={<AppBackButton />}
			/>
			<EnrollmentDetailContent
				attendanceItems={hasEnrollment ? attendanceItems : []}
				canManage={canManage}
				contentBottomPadding={contentBottomPadding}
				disabled={isMutatingEnrollment}
				hasEnrollment={hasEnrollment}
				hasQueryError={hasQueryError}
				isInitialLoading={isInitialLoading}
				isRefreshing={isRefreshing}
				enrollmentStatus={myEnrollmentQuery.data?.status ?? null}
				onManage={() => {
					setIsManageSheetVisible(true);
				}}
				onOpenProject={() => {
					if (!projectId) return;
					router.push({
						pathname: "/projects/[id]",
						params: { id: projectId },
					});
				}}
				onRefresh={() => {
					void (async () => {
						setIsManualRefreshing(true);
						try {
							const tasks: Promise<unknown>[] = [];
							if (!isCurrentFormerStudentLoaded) {
								tasks.push(loadCurrentFormerStudentContext());
							}
							if (projectId !== null) {
								tasks.push(projectQuery.refetch());
								tasks.push(myEnrollmentQuery.refetch());
								tasks.push(attendancesQuery.refetch());
							}
							await Promise.all(tasks);
						} finally {
							setIsManualRefreshing(false);
						}
					})();
				}}
				project={project}
				t={t}
				themeBrandColor={theme.colors.brand}
			/>
			{project ? (
				<ManageEnrollmentSheet
					isBusy={isMutatingEnrollment}
					onDismiss={() => {
						setIsManageSheetVisible(false);
					}}
					onExitProject={() => {
						if (!projectId) return;
						void updateMyEnrollmentMutation
							.mutateAsync({ projectId, status: "EXITED" })
							.then(() => {
								setIsManageSheetVisible(false);
							});
					}}
					projectName={project.name}
					visible={isManageSheetVisible}
				/>
			) : null}
		</View>
	);
}
