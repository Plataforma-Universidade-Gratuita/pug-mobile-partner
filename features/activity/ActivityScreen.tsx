import React, { useEffect, useMemo, useRef, useState } from "react";

import { useScrollToTop } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { RefreshControl, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as api from "@/api";
import { BrandScreenHeader } from "@/components";
import { useCurrentFormerStudentStore, useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ProjectResponse } from "@/types/api";
import type {
	ActivityAttendanceItem,
	ActivityEnrollmentItem,
	ActivityFilters,
	ActivityTab,
} from "@/types/client";
import { getTabScreenContentBottomPadding } from "@/utils";

import {
	ActivityHeaderActions,
	ActivityLoadingSkeleton,
	ActivityListSection,
	ActivitySegmentedControl,
	ActivityStateCard,
	ActivitySummarySection,
} from "./activity-sections";
import { ActivityFilterSheet } from "./filter-sheet";
import { createStyles } from "./styles";
import {
	applyActivityAttendanceFilters,
	buildActivitySummaryCopy,
	buildAttendanceStatusOptions,
	buildEnrollmentStatusOptions,
	countActiveEnrollments,
	countPendingEnrollments,
	createDefaultActivityFilters,
	filterActivityEnrollmentItems,
	hasActiveActivityFilters,
	resolveActivityStateCopy,
	resolveActivityAttendanceStatusLabel,
	resolveAttendanceStatusTone,
	resolveActivityEnrollmentStatusLabel,
	resolveEnrollmentStatusTone,
	resolveProjectName,
	sortActivityAttendanceItems,
	sortActivityEnrollmentItems,
} from "./utils";

export function ActivityScreen() {
	const { t } = useTranslation();
	const params = useLocalSearchParams<{ tab?: string | string[] }>();
	const scrollRef = useRef<ScrollView>(null);
	const insets = useSafeAreaInsets();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	useScrollToTop(scrollRef);
	const requestedTab =
		typeof params.tab === "string" &&
		(params.tab === "enrollments" || params.tab === "attendances")
			? params.tab
			: "enrollments";
	const [activeTab, setActiveTab] = useState<ActivityTab>(requestedTab);
	const [isFilterSheetVisible, setIsFilterSheetVisible] = useState(false);
	const [filters, setFilters] = useState(createDefaultActivityFilters());
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
	const enrollmentsQuery = api.project.enrollments.useMyEnrollmentsQuery(
		isCurrentFormerStudentLoaded,
	);
	const attendancesQuery =
		api.project.attendances.useAttendancesByFormerStudentQuery(
			currentFormerStudent?.accountId ?? null,
		);

	useEffect(() => {
		setActiveTab(requestedTab);
	}, [requestedTab]);

	useEffect(() => {
		if (!isCurrentFormerStudentLoaded && !isCurrentFormerStudentLoading) {
			void loadCurrentFormerStudentContext();
		}
	}, [
		isCurrentFormerStudentLoaded,
		isCurrentFormerStudentLoading,
		loadCurrentFormerStudentContext,
	]);

	const projectIds = useMemo(() => {
		const ids = new Set<string>();
		for (const enrollment of enrollmentsQuery.data ?? [])
			ids.add(enrollment.projectId);
		for (const attendance of attendancesQuery.data ?? [])
			ids.add(attendance.project.id);
		return [...ids];
	}, [attendancesQuery.data, enrollmentsQuery.data]);
	const projectsQuery = useQuery({
		queryKey: [
			"project",
			"project",
			"list",
			"activity",
			projectIds.join(","),
		] as const,
		queryFn: () => api.project.projects.list(projectIds),
		enabled: projectIds.length > 0,
	});
	const projectsById = useMemo(() => {
		const map = new Map<string, ProjectResponse>();
		for (const project of projectsQuery.data ?? [])
			map.set(project.id, project);
		return map;
	}, [projectsQuery.data]);
	const enrollmentItems = useMemo(
		() =>
			(enrollmentsQuery.data ?? [])
				.map<ActivityEnrollmentItem>(enrollment => ({
					enrollment,
					project: projectsById.get(enrollment.projectId) ?? null,
				}))
				.sort(sortActivityEnrollmentItems),
		[enrollmentsQuery.data, projectsById],
	);
	const attendanceItems = useMemo(
		() =>
			(attendancesQuery.data ?? [])
				.map<ActivityAttendanceItem>(attendance => ({
					attendance,
					project: projectsById.get(attendance.project.id) ?? null,
				}))
				.sort(sortActivityAttendanceItems),
		[attendancesQuery.data, projectsById],
	);
	const visibleEnrollmentItems = useMemo(
		() => filterActivityEnrollmentItems(enrollmentItems, filters),
		[enrollmentItems, filters],
	);
	const visibleAttendanceItems = useMemo(
		() => applyActivityAttendanceFilters(attendanceItems, filters),
		[attendanceItems, filters],
	);
	const enrollmentStatusOptions = useMemo(
		() => buildEnrollmentStatusOptions(enrollmentItems),
		[enrollmentItems],
	);
	const attendanceStatusOptions = useMemo(
		() => buildAttendanceStatusOptions(attendanceItems),
		[attendanceItems],
	);
	const hasActiveFilters = hasActiveActivityFilters(filters);
	const activeCount = countActiveEnrollments(enrollmentsQuery.data ?? []);
	const pendingCount = countPendingEnrollments(enrollmentsQuery.data ?? []);
	const attendanceCount = (attendancesQuery.data ?? []).length;
	const summaryCopy = buildActivitySummaryCopy({
		activeCount,
		pendingCount,
		attendanceCount,
		tab: activeTab,
		t,
	});
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
		enrollmentsQuery.isRefetching ||
		attendancesQuery.isRefetching ||
		projectsQuery.isRefetching;
	const contentBottomPadding = getTabScreenContentBottomPadding(
		theme,
		insets.bottom,
	);
	const stateCopy = resolveActivityStateCopy({
		activeTab,
		hasActiveFilters,
		hasQueryError,
		isInitialLoading,
		t,
		visibleAttendanceCount: visibleAttendanceItems.length,
		visibleEnrollmentCount: visibleEnrollmentItems.length,
	});

	return (
		<View style={[styles.screen, { backgroundColor: spec.screenBackground }]}>
			<BrandScreenHeader
				title={t("activity.title")}
				rightAccessory={
					<ActivityHeaderActions
						disabled={hasQueryError || isInitialLoading}
						onOpenFilters={() => {
							setIsFilterSheetVisible(true);
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
							if (!isCurrentFormerStudentLoaded) {
								void loadCurrentFormerStudentContext();
							}
							void enrollmentsQuery.refetch();
							void attendancesQuery.refetch();
							if (projectIds.length > 0) void projectsQuery.refetch();
						}}
						tintColor={theme.colors.brand}
					/>
				}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.shell}>
					{isInitialLoading && !hasQueryError ? (
						<ActivityLoadingSkeleton />
					) : (
						<>
							<ActivitySummarySection
								activeCount={String(activeCount)}
								attendanceCount={String(attendanceCount)}
								chipLabels={summaryCopy.chips}
								focusDescription={summaryCopy.description}
								focusTitle={summaryCopy.title}
								isLoading={isRefreshing}
								pendingCount={String(pendingCount)}
							/>
							<ActivitySegmentedControl
								activeTab={activeTab}
								onTabChange={setActiveTab}
							/>
							{stateCopy ? (
								<ActivityStateCard
									badgeLabel={t("activity.states.badge")}
									description={stateCopy.description}
									title={stateCopy.title}
									tone={stateCopy.badgeTone}
								/>
							) : (
								<ActivityListSection
									activeTab={activeTab}
									attendanceItems={visibleAttendanceItems}
									enrollmentItems={visibleEnrollmentItems}
									isLoading={isRefreshing}
									resolveAttendanceStatusLabel={
										resolveActivityAttendanceStatusLabel
									}
									resolveAttendanceStatusTone={resolveAttendanceStatusTone}
									resolveEnrollmentStatusLabel={
										resolveActivityEnrollmentStatusLabel
									}
									resolveEnrollmentStatusTone={resolveEnrollmentStatusTone}
									resolveProjectName={resolveProjectName}
									t={t}
								/>
							)}
						</>
					)}
				</View>
			</ScrollView>
			<ActivityFilterSheet
				activeTab={activeTab}
				filters={filters}
				onApply={(nextFilters: ActivityFilters) => {
					setFilters(nextFilters);
					setIsFilterSheetVisible(false);
				}}
				onDismiss={() => {
					setIsFilterSheetVisible(false);
				}}
				statusOptions={
					activeTab === "enrollments"
						? enrollmentStatusOptions
						: attendanceStatusOptions
				}
				visible={isFilterSheetVisible}
			/>
		</View>
	);
}
