import React from "react";

import { RefreshControl, ScrollView, View } from "react-native";

import { useThemeStore } from "@/stores";
import type { ProjectDetailScrollContentProps } from "@/types/client";

import { ProjectDetailResolvedContent } from "./ProjectDetailResolvedContent";
import {
	ProjectDetailBottomCta,
	ProjectDetailStateCard,
} from "./project-detail-sections";
import { createStyles } from "./styles";

export function ProjectDetailScrollContent({
	activeParticipantsValue,
	addressValue,
	badgeLabel,
	canApply,
	canCreateAttendance,
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
	const shouldShowStickyCta = project != null && (canApply || canManage);

	return (
		<ScrollView
			contentContainerStyle={[
				styles.content,
				{ paddingBottom: contentBottomPadding },
			]}
			stickyHeaderIndices={shouldShowStickyCta ? [0] : undefined}
			refreshControl={
				<RefreshControl
					refreshing={isRefreshing}
					onRefresh={onRefresh}
					tintColor={themeBrandColor}
				/>
			}
			showsVerticalScrollIndicator={false}
		>
			{shouldShowStickyCta ? (
				<View style={styles.stickyHeader}>
					<View style={styles.stickyHeaderShell}>
						<ProjectDetailBottomCta
							canApply={canApply}
							canManage={canManage}
							disabled={disabled}
							onApply={onApply}
							onManage={onManage}
						/>
					</View>
				</View>
			) : null}
			<View style={styles.shell}>
				{hasQueryError ? (
					<ProjectDetailStateCard
						badgeLabel={badgeLabel}
						description={descriptionError}
						title={titleError}
						tone="danger"
					/>
				) : isInitialLoading ? (
					<ProjectDetailStateCard
						badgeLabel={badgeLabel}
						description={descriptionLoading}
						title={titleLoading}
						tone="neutral"
					/>
				) : project ? (
					<ProjectDetailResolvedContent
						activeParticipantsValue={activeParticipantsValue}
						addressValue={addressValue}
						canApply={canApply}
						canCreateAttendance={canCreateAttendance}
						canManage={canManage}
						cityValue={cityValue}
						cnpjValue={cnpjValue}
						completedHoursValue={completedHoursValue}
						completionPercentLabel={completionPercentLabel}
						completionRatio={completionRatio}
						disabled={disabled}
						entityName={entityName}
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
