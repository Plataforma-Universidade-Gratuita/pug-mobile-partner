import React, { useMemo } from "react";

import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { RefreshControl, ScrollView, View } from "react-native";

import { Badge, Button, Label, LoadingBlock } from "@/components/primitives";
import { ActivityAttendanceCard } from "@/features/activity/activity-sections";
import {
	resolveAttendanceStatusTone,
	resolveEnrollmentStatusTone,
} from "@/features/activity/utils";
import { ProjectDetailStateCard } from "@/features/project-detail/project-detail-sections";
import { getProjectCompletionRatio } from "@/features/project-detail/utils";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type {
	EnrollmentDetailContentProps,
	EnrollmentProjectCardProps,
} from "@/types/client";

import { EnrollmentDetailLoadingSkeleton } from "./EnrollmentDetailLoadingSkeleton";
import { createStyles } from "./styles";

function EnrollmentProjectCard({
	canManage,
	description,
	disabled,
	isLoading = false,
	onManage,
	onOpenProject,
	progressRatio,
	progressValueLabel,
	statusLabel,
	statusTone,
	title,
	viewProjectLabel,
}: EnrollmentProjectCardProps) {
	const { t } = useTranslation();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<View style={styles.projectSection}>
			<View style={styles.projectTitleCopy}>
				<View style={styles.projectHeader}>
					{isLoading ? (
						<>
							<LoadingBlock
								width={96}
								height={28}
								radius={theme.radius.circle}
							/>
							<LoadingBlock
								width="68%"
								height={28}
							/>
						</>
					) : (
						<>
							<Badge
								tone={statusTone}
								variant="primary"
							>
								{statusLabel}
							</Badge>
							<Label
								role="title"
								style={styles.title}
							>
								{title}
							</Label>
						</>
					)}
				</View>
				{isLoading ? (
					<>
						<LoadingBlock
							width="94%"
							height={14}
						/>
						<LoadingBlock
							width="78%"
							height={14}
						/>
					</>
				) : (
					<Label role="helper">{description}</Label>
				)}
			</View>
			<View style={styles.progressBlock}>
				{isLoading ? (
					<>
						<LoadingBlock
							width={112}
							height={14}
						/>
						<LoadingBlock
							width="100%"
							height={10}
							radius={theme.radius.circle}
						/>
					</>
				) : (
					<>
						<Label role="helper">{progressValueLabel}</Label>
						<View style={styles.progressTrack}>
							<View
								style={[
									styles.progressFill,
									{ width: `${Math.round(progressRatio * 100)}%` },
								]}
							/>
						</View>
					</>
				)}
			</View>
			{canManage ? (
				isLoading ? (
					<LoadingBlock
						width="100%"
						height={theme.form.controlHeight}
						radius={theme.form.controlRadius}
					/>
				) : (
					<Button
						disabled={disabled}
						onPress={onManage}
					>
						{t("projectDetail.actions.manage")}
					</Button>
				)
			) : null}
			{isLoading ? (
				<LoadingBlock
					width={148}
					height={theme.form.controlHeight}
					radius={theme.form.controlRadius}
				/>
			) : (
				<Button
					fullWidth={false}
					variant="secondary"
					onPress={onOpenProject}
				>
					{viewProjectLabel}
				</Button>
			)}
		</View>
	);
}

export function EnrollmentDetailContent({
	attendanceItems,
	canManage,
	contentBottomPadding,
	disabled,
	hasEnrollment,
	hasQueryError,
	isInitialLoading,
	isRefreshing,
	enrollmentStatus,
	onManage,
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
		return <EnrollmentDetailLoadingSkeleton />;
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
					canManage={canManage}
					description={project.description}
					disabled={disabled}
					isLoading={isRefreshing}
					onManage={onManage}
					onOpenProject={onOpenProject}
					progressRatio={progressRatio}
					progressValueLabel={t("projectDetail.metrics.progressValue", {
						value: Math.round(progressRatio * 100),
					})}
					statusLabel={enrollmentStatus?.statusFormatted ?? ""}
					statusTone={
						enrollmentStatus
							? resolveEnrollmentStatusTone(enrollmentStatus.status)
							: "neutral"
					}
					title={project.name}
					viewProjectLabel={t("activity.enrollmentDetail.actions.openProject")}
				/>
				{attendanceItems.length > 0 || isRefreshing ? (
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
						{isRefreshing
							? ["first", "second", "third"].map(key => (
									<ActivityAttendanceCard
										key={key}
										dateLabel=""
										durationLabel=""
										isLoading
										onPress={() => undefined}
										projectName=""
										statusLabel=""
										statusTone="neutral"
									/>
								))
							: attendanceItems.map(attendance => (
									<ActivityAttendanceCard
										key={attendance.id}
										dateLabel={
											attendance.attendanceInfo.auditInfo.createdAtFormatted
										}
										durationLabel={t("activity.attendance.duration", {
											count: attendance.qrValidationInfo.duration,
										})}
										onPress={() => {
											router.replace(`/activity/attendances/${attendance.id}`);
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
