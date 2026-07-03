import React, { useEffect, useMemo, useRef, useState } from "react";

import { useScrollToTop } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { RefreshControl, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as api from "@/api";
import { BrandScreenHeader, Button } from "@/components";
import { useCurrentStaffStore, useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import { getTabScreenContentBottomPadding } from "@/utils";

import { ProjectsFilterSheet } from "./ProjectsFilterSheet";
import { ProjectsHeaderActions } from "./ProjectsHeaderActions";
import { ProjectsListSection } from "./ProjectsListSection";
import { ProjectsLoadingSkeleton } from "./ProjectsLoadingSkeleton";
import { ProjectsStateCard } from "./ProjectsStateCard";
import { ProjectsSummarySection } from "./ProjectsSummarySection";
import { createStyles } from "./styles";
import {
	buildProjectsStatusOptions,
	countProjectsByStatus,
	createDefaultProjectsFilters,
	filterProjects,
	hasActiveProjectsFilters,
	resolveProjectsAvailabilityLabel,
	resolveProjectsStatusTone,
	sortProjects,
} from "./utils";

export function ProjectsScreen() {
	const router = useRouter();
	const scrollRef = useRef<ScrollView>(null);
	const insets = useSafeAreaInsets();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	useScrollToTop(scrollRef);
	const [isFilterSheetVisible, setIsFilterSheetVisible] = useState(false);
	const [filters, setFilters] = useState(createDefaultProjectsFilters());
	const currentEntity = useCurrentStaffStore(state => state.currentEntity);
	const isCurrentStaffLoading = useCurrentStaffStore(state => state.isLoading);
	const isCurrentStaffLoaded = useCurrentStaffStore(state => state.isLoaded);
	const currentStaffError = useCurrentStaffStore(state => state.error);
	const loadCurrentStaffContext = useCurrentStaffStore(
		state => state.loadCurrentStaffContext,
	);
	const refreshCurrentStaffContext = useCurrentStaffStore(
		state => state.refreshCurrentStaffContext,
	);
	const entityId = currentEntity?.id ?? null;

	useEffect(() => {
		if (!isCurrentStaffLoaded && !isCurrentStaffLoading) {
			void loadCurrentStaffContext();
		}
	}, [isCurrentStaffLoaded, isCurrentStaffLoading, loadCurrentStaffContext]);

	const projectsQuery = useQuery({
		queryKey:
			entityId == null
				? ["project", "project", "entity", "idle"]
				: ["project", "project", "entity", entityId],
		queryFn: () => api.project.projects.listByEntity(entityId!),
		enabled: entityId != null,
	});

	const projects = useMemo(
		() => sortProjects(projectsQuery.data ?? []),
		[projectsQuery.data],
	);
	const visibleProjects = useMemo(
		() => filterProjects(projects, filters),
		[filters, projects],
	);
	const statusOptions = useMemo(
		() => buildProjectsStatusOptions(projects),
		[projects],
	);
	const totalProjects = projects.length;
	const inProgressCount = countProjectsByStatus(projects, "IN_PROGRESS");
	const plannedCount = countProjectsByStatus(projects, "PLANNED");
	const hasActiveFilters = hasActiveProjectsFilters(filters);
	const hasQueryError =
		currentStaffError != null || projectsQuery.error != null;
	const isInitialLoading =
		(!isCurrentStaffLoaded && isCurrentStaffLoading) || projectsQuery.isLoading;
	const isRefreshing = projectsQuery.isRefetching;
	const contentBottomPadding = getTabScreenContentBottomPadding(
		theme,
		insets.bottom,
	);

	return (
		<View style={[styles.screen, { backgroundColor: spec.screenBackground }]}>
			<BrandScreenHeader
				rightAccessory={
					<ProjectsHeaderActions
						disabled={hasQueryError || isInitialLoading}
						onOpenFilters={() => {
							setIsFilterSheetVisible(true);
						}}
					/>
				}
				title="Projects"
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
							void refreshCurrentStaffContext();
							if (entityId != null) {
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
						<ProjectsStateCard
							description="The entity projects could not be loaded right now."
							title="Unable to load projects"
							tone="danger"
						/>
					) : isInitialLoading ? (
						<ProjectsLoadingSkeleton />
					) : entityId == null || currentEntity == null ? (
						<ProjectsStateCard
							description="The current staff account is not linked to an entity yet."
							title="Missing entity context"
							tone="warning"
						/>
					) : (
						<>
							<ProjectsSummarySection
								entityName={currentEntity.name}
								inProgressCount={inProgressCount}
								isLoading={isRefreshing}
								plannedCount={plannedCount}
								totalProjects={totalProjects}
							/>
							<View style={styles.createButtonRow}>
								<Button onPress={() => undefined}>Create project</Button>
							</View>
							{visibleProjects.length === 0 ? (
								<ProjectsStateCard
									description={
										hasActiveFilters
											? "No project matches the current filters."
											: "The active entity still has no projects."
									}
									title={
										hasActiveFilters
											? "No matching projects"
											: "No projects yet"
									}
									tone={hasActiveFilters ? "warning" : "neutral"}
								/>
							) : (
								<ProjectsListSection
									isLoading={isRefreshing}
									onOpenProject={project => {
										router.push({
											pathname: "/projects/[id]",
											params: { id: project.id },
										});
									}}
									projects={visibleProjects}
									resolveAvailabilityLabel={resolveProjectsAvailabilityLabel}
									resolveStatusTone={resolveProjectsStatusTone}
								/>
							)}
						</>
					)}
				</View>
			</ScrollView>
			<ProjectsFilterSheet
				filters={filters}
				onApply={nextFilters => {
					setFilters(nextFilters);
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
