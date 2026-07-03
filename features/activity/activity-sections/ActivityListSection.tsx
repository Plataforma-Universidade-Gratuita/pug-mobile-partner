import React, { useMemo } from "react";

import { useRouter } from "expo-router";
import { View } from "react-native";

import { Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ActivityListSectionProps } from "@/types/client";

import { createStyles } from "../styles";
import { ActivityAttendanceCard } from "./ActivityAttendanceCard";
import { ActivityEnrollmentCard } from "./ActivityEnrollmentCard";

export function ActivityListSection({
	activeTab,
	attendanceItems,
	enrollmentItems,
	isLoading = false,
	resolveAttendanceStatusLabel,
	resolveAttendanceStatusTone,
	resolveEnrollmentStatusLabel,
	resolveEnrollmentStatusTone,
	resolveProjectName,
	t,
}: ActivityListSectionProps) {
	const router = useRouter();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<View style={styles.activityList}>
			<View style={styles.sectionHeader}>
				<Label
					role="field"
					style={styles.sectionTitle}
				>
					{activeTab === "enrollments"
						? t("activity.sections.enrollments")
						: t("activity.sections.attendances")}
				</Label>
				<Label role="helper">
					{activeTab === "enrollments"
						? t("activity.sections.enrollmentsHelper")
						: t("activity.sections.attendancesHelper")}
				</Label>
			</View>
			{activeTab === "enrollments"
				? isLoading
					? ["one", "two", "three"].map(key => (
							<ActivityEnrollmentCard
								key={key}
								isLoading
								metaLabel=""
								onPress={() => undefined}
								projectName=""
								statusLabel=""
								statusTone="neutral"
							/>
						))
					: enrollmentItems.map(item => (
							<ActivityEnrollmentCard
								key={`${item.enrollment.projectId}-${item.enrollment.formerStudentId}`}
								isLoading={isLoading}
								metaLabel={
									item.project?.entity.name ??
									t("activity.values.projectFallback")
								}
								onPress={() => {
									router.push(
										`/enrollment/${item.enrollment.projectId}`,
									);
								}}
								projectName={resolveProjectName(
									item.project,
									t("activity.values.projectFallback"),
								)}
								statusLabel={resolveEnrollmentStatusLabel(
									item.enrollment.status.statusFormatted,
								)}
								statusTone={resolveEnrollmentStatusTone(
									item.enrollment.status.status,
								)}
							/>
						))
				: isLoading
					? ["one", "two", "three"].map(key => (
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
					: attendanceItems.map(item => (
							<ActivityAttendanceCard
								key={item.attendance.id}
								dateLabel={
									item.attendance.attendanceInfo.auditInfo.createdAtFormatted
								}
								durationLabel={t("activity.attendance.duration", {
									count: item.attendance.qrValidationInfo.duration,
								})}
								isLoading={isLoading}
								onPress={() => {
									router.push(`/attendance/${item.attendance.id}`);
								}}
								projectName={resolveProjectName(
									item.project,
									t("activity.values.projectFallback"),
								)}
								statusLabel={resolveAttendanceStatusLabel(
									item.attendance.status.statusFormatted,
								)}
								statusTone={resolveAttendanceStatusTone(
									item.attendance.status.status,
								)}
							/>
						))}
		</View>
	);
}
