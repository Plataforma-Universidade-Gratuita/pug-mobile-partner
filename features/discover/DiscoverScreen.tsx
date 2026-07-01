import React, { useEffect, useMemo, useRef, useState } from "react";

import { useScrollToTop } from "@react-navigation/native";
import { SlidersHorizontal } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { RefreshControl, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as api from "@/api";
import { BrandScreenHeader, HeaderActionButton } from "@/components";
import { useCurrentFormerStudentStore, useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ProjectResponse } from "@/types/api";
import { getTabScreenContentBottomPadding } from "@/utils";

import { DISCOVERABLE_PROJECT_STATUSES } from "./constants";
import {
	DiscoverLoadingSkeleton,
	DiscoverResultsSection,
	DiscoverStateCard,
	DiscoverSummarySection,
} from "./discover-sections";
import { DiscoverFilterSheet } from "./filter-sheet";
import { createStyles } from "./styles";
import {
	createDefaultDiscoverFilters,
	excludeProjectsWithOngoingEnrollments,
	filterDiscoverProjects,
	hasDiscoverFilters,
	resolveDiscoverQueryStateCopy,
	sortDiscoverProjects,
} from "./utils";

export function DiscoverScreen() {
	const { t } = useTranslation();
	const scrollRef = useRef<ScrollView>(null);
	const insets = useSafeAreaInsets();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	useScrollToTop(scrollRef);
	const [isFilterSheetVisible, setIsFilterSheetVisible] = useState(false);
	const [appliedFilters, setAppliedFilters] = useState(
		createDefaultDiscoverFilters,
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
	const areaOfExpertise = currentCourse?.areaOfExpertise ?? null;
	const areaOfExpertiseId = areaOfExpertise?.id ?? null;
	const projectFilters = useMemo(
		() => ({
			name: "",
			entityIds: [],
			description: "",
			createdByIds: [],
			statuses: [...DISCOVERABLE_PROJECT_STATUSES],
			maxOfferedHours: "",
			minOfferedHours: "",
			dateFrom: "",
			dateTo: "",
			areaOfExpertiseIds: areaOfExpertiseId ? [areaOfExpertiseId] : [],
			availability: true,
		}),
		[areaOfExpertiseId],
	);
	const projectsQuery = api.project.projects.useProjectsSearchQuery(
		0,
		100,
		projectFilters,
		areaOfExpertise !== null,
	);
	const enrollmentsQuery = api.project.enrollments.useMyEnrollmentsQuery(
		isCurrentFormerStudentLoaded,
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

	useEffect(() => {
		setAppliedFilters(createDefaultDiscoverFilters());
		setIsFilterSheetVisible(false);
	}, [areaOfExpertiseId]);

	const discoverableProjects = useMemo(
		() =>
			excludeProjectsWithOngoingEnrollments(
				[...(projectsQuery.data?.content ?? [])],
				enrollmentsQuery.data ?? [],
			).sort(sortDiscoverProjects),
		[enrollmentsQuery.data, projectsQuery.data?.content],
	);
	const entityOptions = useMemo(() => {
		const entitiesById = new Map<string, string>();
		for (const project of discoverableProjects) {
			if (!entitiesById.has(project.entity.id))
				entitiesById.set(project.entity.id, project.entity.name);
		}
		return [...entitiesById.entries()]
			.map(([id, label]) => ({ id, label }))
			.sort((left, right) => left.label.localeCompare(right.label));
	}, [discoverableProjects]);
	const statusOptions = useMemo(() => {
		const statusLabels = new Map<ProjectResponse["status"]["status"], string>();
		for (const project of discoverableProjects) {
			if (!statusLabels.has(project.status.status))
				statusLabels.set(project.status.status, project.status.statusFormatted);
		}
		return DISCOVERABLE_PROJECT_STATUSES.filter(status =>
			statusLabels.has(status),
		).map(status => ({
			value: status,
			label: statusLabels.get(status) ?? status,
		}));
	}, [discoverableProjects]);
	const filteredProjects = useMemo(
		() => filterDiscoverProjects(discoverableProjects, appliedFilters),
		[appliedFilters, discoverableProjects],
	);
	const hasActiveFilters = hasDiscoverFilters(appliedFilters);
	const queryStateCopy = resolveDiscoverQueryStateCopy(t, {
		hasProfileError: currentFormerStudentError !== null,
		hasProjectError:
			projectsQuery.error != null || enrollmentsQuery.error != null,
		isProfileLoading:
			!isCurrentFormerStudentLoaded && isCurrentFormerStudentLoading,
		isProjectsLoading: projectsQuery.isLoading || enrollmentsQuery.isLoading,
		hasAreaOfExpertise: areaOfExpertise !== null,
		projectCount: discoverableProjects.length,
	});
	const filteredStateCopy =
		queryStateCopy === null && hasActiveFilters && filteredProjects.length === 0
			? {
					title: t("discover.states.filteredEmptyTitle"),
					description: t("discover.states.filteredEmptyDescription"),
					badgeTone: "neutral" as const,
				}
			: null;
	const stateCopy = queryStateCopy ?? filteredStateCopy;
	const isInitialLoading =
		(!isCurrentFormerStudentLoaded && isCurrentFormerStudentLoading) ||
		projectsQuery.isLoading ||
		enrollmentsQuery.isLoading;
	const contentBottomPadding = getTabScreenContentBottomPadding(
		theme,
		insets.bottom,
	);
	const summaryCountLabel =
		areaOfExpertise !== null && queryStateCopy === null
			? t("discover.summary.count", { count: filteredProjects.length })
			: null;
	const isRefreshing =
		projectsQuery.isRefetching ||
		enrollmentsQuery.isRefetching ||
		isCurrentFormerStudentLoading;

	return (
		<View style={styles.screen}>
			<BrandScreenHeader
				title={t("discover.title")}
				rightAccessory={
					<HeaderActionButton
						accessibilityLabel={t("discover.actions.filters")}
						disabled={queryStateCopy !== null}
						icon={SlidersHorizontal}
						onPress={() => {
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
							if (areaOfExpertise !== null) {
								void projectsQuery.refetch();
							}
						}}
						tintColor={theme.colors.brand}
					/>
				}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.shell}>
					{isInitialLoading ? (
						<DiscoverLoadingSkeleton />
					) : (
						<>
							<DiscoverSummarySection
								areaName={
									areaOfExpertise?.name ?? t("discover.summary.fallbackArea")
								}
								badgeLabel={t("discover.badge")}
								countLabel={summaryCountLabel}
								description={t("discover.summary.description")}
								isLoading={isRefreshing && queryStateCopy === null}
							/>
							{stateCopy ? (
								<DiscoverStateCard
									badgeLabel={t("discover.states.badge")}
									description={stateCopy.description}
									title={stateCopy.title}
									tone={stateCopy.badgeTone}
								/>
							) : (
								<DiscoverResultsSection
									isLoading={isRefreshing}
									projects={filteredProjects}
									t={t}
								/>
							)}
						</>
					)}
				</View>
			</ScrollView>
			<DiscoverFilterSheet
				entityOptions={entityOptions}
				filters={appliedFilters}
				onApply={filters => {
					setAppliedFilters(filters);
					setIsFilterSheetVisible(false);
				}}
				onDismiss={() => {
					setIsFilterSheetVisible(false);
				}}
				statusOptions={statusOptions}
				visible={isFilterSheetVisible}
			/>
		</View>
	);
}
