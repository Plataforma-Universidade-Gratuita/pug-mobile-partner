import React, { useMemo } from "react";

import { useRouter } from "expo-router";
import { RefreshControl, ScrollView, View } from "react-native";

import { Badge, Button, Label } from "@/components/primitives";
import { ActivityAttendanceCard } from "@/features/activity/activity-sections";
import { resolveAttendanceStatusTone } from "@/features/activity/utils";
import { ProjectDetailStateCard } from "@/features/project-detail/project-detail-sections";
import {
	getProjectCompletionRatio,
	resolveProjectDetailStatusTone,
} from "@/features/project-detail/utils";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type {
	EnrollmentDetailContentProps,
	EnrollmentProjectCardProps,
} from "@/types/client";

import { createStyles } from "./styles";

function EnrollmentProjectCard({
	description,
	onOpenProject,
	progressRatio,
	progressValueLabel,
	statusLabel,
	statusTone,
	title,
	viewProjectLabel,
}: EnrollmentProjectCardProps) {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<View style={styles.projectSection}>
			<View style={styles.projectTitleCopy}>
				<View style={styles.projectHeader}>
					<Label
						role="title"
						style={styles.title}
					>
						{title}
					</Label>
					<Badge
						tone={statusTone}
						variant="primary"
					>
						{statusLabel}
					</Badge>
				</View>
				<Label role="helper">{description}</Label>
			</View>
			<View style={styles.progressBlock}>
				<Label role="helper">{progressValueLabel}</Label>
				<View style={styles.progressTrack}>
					<View
						style={[
							styles.progressFill,
							{ width: `${Math.round(progressRatio * 100)}%` },
						]}
					/>
				</View>
			</View>
			<Button
				fullWidth={false}
				variant="secondary"
				onPress={onOpenProject}
			>
				{viewProjectLabel}
			</Button>
		</View>
	);
}

export function EnrollmentDetailContent({
	attendanceItems,
	contentBottomPadding,
	hasEnrollment,
	hasQueryError,
	isInitialLoading,
	isRefreshing,
	onOpenProject,
	onRefresh,
	project,
	t,
	themeBrandColor,
}: EnrollmentDetailContentProps) {
	const router = useRouter();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	if (hasQueryError) {
		return (
			<ProjectDetailStateCard
				badgeLabel={t("activity.enrollmentDetail.badge")}
				description={t("activity.enrollmentDetail.states.errorDescription")}
				title={t("activity.enrollmentDetail.states.errorTitle")}
				tone="danger"
			/>
		);
	}

	if (isInitialLoading) {
		return (
			<ProjectDetailStateCard
				badgeLabel={t("activity.enrollmentDetail.badge")}
				description={t("activity.enrollmentDetail.states.loadingDescription")}
				title={t("activity.enrollmentDetail.states.loadingTitle")}
				tone="neutral"
			/>
		);
	}

	if (!project || !hasEnrollment) {
		return (
			<ProjectDetailStateCard
				badgeLabel={t("activity.enrollmentDetail.badge")}
				description={t("activity.enrollmentDetail.states.missingDescription")}
				title={t("activity.enrollmentDetail.states.missingTitle")}
				tone="warning"
			/>
		);
	}

	const progressRatio = getProjectCompletionRatio(
		project.projectInfo.completedHours,
		project.projectInfo.offeredHours,
	);

	return (
		<ScrollView
			contentContainerStyle={[
				styles.content,
				{ paddingBottom: contentBottomPadding },
			]}
			refreshControl={
				<RefreshControl
					onRefresh={onRefresh}
					refreshing={isRefreshing}
					tintColor={themeBrandColor}
				/>
			}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.shell}>
				<EnrollmentProjectCard
					description={project.description}
					onOpenProject={onOpenProject}
					progressRatio={progressRatio}
					progressValueLabel={t("projectDetail.metrics.progressValue", {
						value: Math.round(progressRatio * 100),
					})}
					statusLabel={project.status.statusFormatted}
					statusTone={resolveProjectDetailStatusTone(project.status.status)}
					title={project.name}
					viewProjectLabel={t("activity.enrollmentDetail.actions.openProject")}
				/>
				{attendanceItems.length > 0 ? (
					<View style={styles.attendanceSection}>
						<View style={styles.sectionHeader}>
							<Label
								role="field"
								style={styles.sectionTitle}
							>
								{t("activity.enrollmentDetail.attendancesTitle")}
							</Label>
							<Label role="helper">
								{t("activity.enrollmentDetail.attendancesHelper")}
							</Label>
						</View>
						{attendanceItems.map(attendance => (
							<ActivityAttendanceCard
								key={attendance.id}
								dateLabel={
									attendance.attendanceInfo.auditInfo.createdAtFormatted
								}
								durationLabel={t("activity.attendance.duration", {
									count: attendance.qrValidationInfo.duration,
								})}
								onPress={() => {
									router.push(`/activity/attendances/${attendance.id}`);
								}}
								projectName={attendance.project.name}
								statusLabel={attendance.status.statusFormatted}
								statusTone={resolveAttendanceStatusTone(
									attendance.status.status,
								)}
							/>
						))}
					</View>
				) : (
					<ProjectDetailStateCard
						badgeLabel={t("activity.enrollmentDetail.badge")}
						description={t(
							"activity.enrollmentDetail.states.emptyAttendancesDescription",
						)}
						title={t("activity.enrollmentDetail.states.emptyAttendancesTitle")}
						tone="neutral"
					/>
				)}
			</View>
		</ScrollView>
	);
}
