/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import React from "react";

import { RefreshControl, ScrollView, View } from "react-native";

import { useThemeStore } from "@/stores";
import type { ProjectDetailScrollContentProps } from "@/types/client";

import { ProjectDetailLoadingSkeleton } from "./ProjectDetailLoadingSkeleton";
import { ProjectDetailResolvedContent } from "./ProjectDetailResolvedContent";
import { ProjectDetailStateCard } from "./project-detail-sections";
import { createStyles } from "./styles";

export function ProjectDetailScrollContent({
	activeParticipantsValue,
	addressValue,
	badgeLabel,
	canApply,
	canManage,
	cityValue,
	cnpjValue,
	completedHoursValue,
	completionPercentLabel,
	completionRatio,
	contentBottomPadding,
	descriptionError,
	descriptionLoading,
	descriptionMissing,
	disabled,
	entityName,
	hasQueryError,
	isInitialLoading,
	isRefreshing,
	maxParticipantsValue,
	offeredHoursValue,
	onApply,
	onManage,
	onRefresh,
	project,
	staffItems,
	staffStateLabel,
	themeBrandColor,
	titleError,
	titleLoading,
	titleMissing,
}: ProjectDetailScrollContentProps) {
	const theme = useThemeStore(state => state.theme);
	const styles = createStyles(theme);

	return (
		<ScrollView
			contentContainerStyle={[
				styles.content,
				{ paddingBottom: contentBottomPadding },
			]}
			refreshControl={
				<RefreshControl
					refreshing={isRefreshing}
					onRefresh={onRefresh}
					tintColor={themeBrandColor}
				/>
			}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.shell}>
				{hasQueryError ? (
					<ProjectDetailStateCard
						badgeLabel={badgeLabel}
						description={descriptionError}
						title={titleError}
						tone="danger"
					/>
				) : isInitialLoading ? (
					<ProjectDetailLoadingSkeleton />
				) : project ? (
					<ProjectDetailResolvedContent
						activeParticipantsValue={activeParticipantsValue}
						addressValue={addressValue}
						canApply={canApply}
						canManage={canManage}
						cityValue={cityValue}
						cnpjValue={cnpjValue}
						completedHoursValue={completedHoursValue}
						completionPercentLabel={completionPercentLabel}
						completionRatio={completionRatio}
						disabled={disabled}
						entityName={entityName}
						isLoading={isRefreshing}
						maxParticipantsValue={maxParticipantsValue}
						offeredHoursValue={offeredHoursValue}
						onApply={onApply}
						onManage={onManage}
						project={project}
						staffItems={staffItems}
						staffStateLabel={staffStateLabel}
					/>
				) : (
					<ProjectDetailStateCard
						badgeLabel={badgeLabel}
						description={descriptionMissing}
						title={titleMissing}
						tone="warning"
					/>
				)}
			</View>
		</ScrollView>
	);
}
