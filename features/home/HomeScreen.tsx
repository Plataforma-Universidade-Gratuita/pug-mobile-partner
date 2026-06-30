import React, { useEffect, useMemo } from "react";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { RefreshControl, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as api from "@/api";
import { BrandScreenHeader } from "@/components";
import { useCurrentFormerStudentStore, useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ProjectResponse } from "@/types/api";
import type { HomeQuickActionItem } from "@/types/client";

import {
	HomeCounterpartSummaryCard,
	HomeQuickActionsSection,
	HomeRecentSection,
	HomeStateCard,
} from "./home-sections";
import { createStyles } from "./styles";
import {
	buildHomeSummaryMetrics,
	buildHomeAttendanceSnapshotCard,
	buildHomeEnrollmentSnapshotCard,
	buildQuickActionItems,
	countHomeActiveEnrollments,
	countHomePendingEnrollments,
	findLatestAttendance,
	findLatestEnrollment,
	formatHomeProgressValue,
} from "./utils";

export function HomeScreen() {
	const { t } = useTranslation();
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const currentUser = useCurrentFormerStudentStore(state => state.currentUser);
	const currentFormerStudent = useCurrentFormerStudentStore(
		state => state.currentFormerStudent,
	);
	const currentCourse = useCurrentFormerStudentStore(
		state => state.currentCourse,
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
	const enrollmentsQuery = api.project.enrollments.useMyEnrollmentsQuery(
		isCurrentFormerStudentLoaded,
	);
	const attendancesQuery =
		api.project.attendances.useAttendancesByFormerStudentQuery(
			currentFormerStudent?.accountId ?? null,
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

	const projectIds = useMemo(
		() => [
			...new Set((enrollmentsQuery.data ?? []).map(item => item.projectId)),
		],
		[enrollmentsQuery.data],
	);
	const projectsQuery = useQuery({
		queryKey: [
			"project",
			"project",
			"list",
			"home",
			projectIds.join(","),
		] as const,
		queryFn: () => api.project.projects.list(projectIds),
		enabled: projectIds.length > 0,
	});
	const projectsById = useMemo(() => {
		const map = new Map<string, ProjectResponse>();

		for (const project of projectsQuery.data ?? []) {
			map.set(project.id, project);
		}

		return map;
	}, [projectsQuery.data]);
	const latestEnrollment = useMemo(
		() => findLatestEnrollment(enrollmentsQuery.data ?? []),
		[enrollmentsQuery.data],
	);
	const latestAttendance = useMemo(
		() => findLatestAttendance(attendancesQuery.data ?? []),
		[attendancesQuery.data],
	);
	const activeEnrollments = countHomeActiveEnrollments(
		enrollmentsQuery.data ?? [],
	);
	const pendingEnrollments = countHomePendingEnrollments(
		enrollmentsQuery.data ?? [],
	);
	const attendanceCount = (attendancesQuery.data ?? []).length;
	const summaryMetrics = buildHomeSummaryMetrics({
		activeEnrollments,
		pendingEnrollments,
		attendanceCount,
		t,
	});
	const quickActionItems = useMemo<HomeQuickActionItem[]>(
		() =>
			buildQuickActionItems({
				latestAttendanceId: latestAttendance?.id ?? null,
				onAttendancesPress: () => {
					router.push("/activity?tab=attendances");
				},
				onDiscoverPress: () => {
					router.push("/discover");
				},
				onEnrollmentsPress: () => {
					router.push("/activity?tab=enrollments");
				},
				onLatestQrPress: () => {
					if (latestAttendance) {
						router.push(`/attendance/qr/${latestAttendance.id}`);
					}
				},
				onProfilePress: () => {
					router.push("/profile");
				},
				t,
			}),
		[latestAttendance, router, t],
	);
	const hasQueryError =
		currentFormerStudentError != null ||
		enrollmentsQuery.error != null ||
		attendancesQuery.error != null ||
		projectsQuery.error != null;
	const isInitialLoading =
		(!isCurrentFormerStudentLoaded && isCurrentFormerStudentLoading) ||
		enrollmentsQuery.isLoading ||
		attendancesQuery.isLoading;
	const isRefreshing =
		isCurrentFormerStudentLoading ||
		enrollmentsQuery.isRefetching ||
		attendancesQuery.isRefetching ||
		projectsQuery.isRefetching;
	const contentBottomPadding =
		theme.space[8] + theme.space[2] + Math.max(insets.bottom, theme.space[4]);
	const enrollmentCard = buildHomeEnrollmentSnapshotCard({
		latestAttendance,
		latestEnrollment,
		onOpenAttendance: () => undefined,
		onOpenEnrollment: projectId => {
			router.push({
				pathname: "/activity/enrollments/[projectId]",
				params: { projectId },
			});
		},
		projectsById,
		t,
	});
	const attendanceCard = buildHomeAttendanceSnapshotCard({
		latestAttendance,
		latestEnrollment,
		onOpenAttendance: attendanceId => {
			router.push({
				pathname: "/activity/attendances/[id]",
				params: { id: attendanceId },
			});
		},
		onOpenEnrollment: () => undefined,
		projectsById,
		t,
	});

	return (
		<View style={[styles.screen, { backgroundColor: spec.screenBackground }]}>
			<BrandScreenHeader title={t("home.title")} />
			<ScrollView
				contentContainerStyle={[
					styles.content,
					{ paddingBottom: contentBottomPadding },
				]}
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={() => {
							void loadCurrentFormerStudentContext();
							void enrollmentsQuery.refetch();
							void attendancesQuery.refetch();
							if (projectIds.length > 0) {
								void projectsQuery.refetch();
							}
						}}
						tintColor={theme.colors.brand}
					/>
				}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.shell}>
					{hasQueryError ? (
						<HomeStateCard
							badgeLabel={t("home.states.badge")}
							description={t("home.states.errorDescription")}
							title={t("home.states.errorTitle")}
							tone="danger"
						/>
					) : isInitialLoading ? (
						<HomeStateCard
							badgeLabel={t("home.states.badge")}
							description={t("home.states.loadingDescription")}
							title={t("home.states.loadingTitle")}
							tone="neutral"
						/>
					) : (
						<>
							<HomeCounterpartSummaryCard
								badgeLabel={
									currentFormerStudent?.campus.campusFormatted ??
									t("home.values.unavailable")
								}
								courseLabel={
									currentCourse?.name ?? t("home.values.unavailable")
								}
								dueDateLabel={
									currentFormerStudent?.period.dueDateFormatted ||
									t("home.values.unavailable")
								}
								name={currentUser?.name ?? t("home.values.unavailable")}
								progressLabel={formatHomeProgressValue(
									currentFormerStudent?.counterpartHours.progress,
									t,
								)}
								progressRatio={Math.max(
									0,
									Math.min(
										(currentFormerStudent?.counterpartHours.progress ?? 0) /
											100,
										1,
									),
								)}
								remainingDaysLabel={
									currentFormerStudent?.period.remainingDaysFormatted ||
									t("home.values.unavailable")
								}
								summaryMetrics={summaryMetrics}
							/>
							<HomeQuickActionsSection items={quickActionItems} />
							<HomeRecentSection
								attendanceCard={attendanceCard}
								enrollmentCard={enrollmentCard}
								helper={t("home.sections.recentHelper")}
								title={t("home.sections.recent")}
							/>
						</>
					)}
				</View>
			</ScrollView>
		</View>
	);
}
