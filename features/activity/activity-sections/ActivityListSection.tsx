import React, { useMemo } from "react";

import { useRouter } from "expo-router";
import { View } from "react-native";

import { Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ActivityListSectionProps } from "@/types/client";

import { createStyles } from "../styles";
import { ActivityAttendanceCard, ActivityEnrollmentCard } from "./index";

export function ActivityListSection({
	activeTab,
	attendanceItems,
	enrollmentItems,
	resolveAttendanceStatusTone,
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
				? enrollmentItems.map(item => (
						<ActivityEnrollmentCard
							key={`${item.enrollment.projectId}-${item.enrollment.formerStudentId}`}
							metaLabel={
								item.project?.entity.name ??
								t("activity.values.projectFallback")
							}
							onPress={() => {
								router.push(
									`/activity/enrollments/${item.enrollment.projectId}`,
								);
							}}
							projectName={resolveProjectName(
								item.project,
								t("activity.values.projectFallback"),
							)}
							statusLabel={item.enrollment.status.statusFormatted}
							statusTone={resolveEnrollmentStatusTone(
								item.enrollment.status.status,
							)}
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
							onPress={() => {
								router.push(`/activity/attendances/${item.attendance.id}`);
							}}
							projectName={resolveProjectName(
								item.project,
								t("activity.values.projectFallback"),
							)}
							statusLabel={item.attendance.status.statusFormatted}
							statusTone={resolveAttendanceStatusTone(
								item.attendance.status.status,
							)}
						/>
					))}
		</View>
	);
}
