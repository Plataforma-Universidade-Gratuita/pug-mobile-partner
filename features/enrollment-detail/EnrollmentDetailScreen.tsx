import React, { useEffect, useMemo } from "react";

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
	const isRefreshing =
		projectQuery.isRefetching ||
		myEnrollmentQuery.isRefetching ||
		attendancesQuery.isRefetching;
	const contentBottomPadding =
		theme.space[8] + theme.space[2] + Math.max(insets.bottom, theme.space[4]);
	const attendanceItems = attendancesQuery.data?.content ?? [];
	const hasEnrollment = myEnrollmentQuery.data != null;

	return (
		<View style={[styles.screen, { backgroundColor: spec.screenBackground }]}>
			<BrandScreenHeader
				title={t("activity.enrollmentDetail.title")}
				leftAccessory={<AppBackButton />}
			/>
			<EnrollmentDetailContent
				attendanceItems={hasEnrollment ? attendanceItems : []}
				contentBottomPadding={contentBottomPadding}
				hasEnrollment={hasEnrollment}
				hasQueryError={hasQueryError}
				isInitialLoading={isInitialLoading}
				isRefreshing={isRefreshing}
				onOpenProject={() => {
					if (!projectId) return;
					router.push(`/discover/projects/${projectId}`);
				}}
				onRefresh={() => {
					if (!isCurrentFormerStudentLoaded)
						void loadCurrentFormerStudentContext();
					if (projectId !== null) {
						void projectQuery.refetch();
						void myEnrollmentQuery.refetch();
						void attendancesQuery.refetch();
					}
				}}
				project={project}
				t={t}
				themeBrandColor={theme.colors.brand}
			/>
		</View>
	);
}
