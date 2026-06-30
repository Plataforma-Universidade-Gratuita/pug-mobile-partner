import React, { useMemo } from "react";

import { useRouter } from "expo-router";
import { View } from "react-native";

import { Badge, Button, Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { AttendanceDetailContentProps } from "@/types/client";

import { createStyles } from "./styles";

export function AttendanceDetailContent({
	attendance,
	statusTone,
	t,
}: AttendanceDetailContentProps) {
	const router = useRouter();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<>
			<View style={styles.heroSection}>
				<View style={styles.heroHeader}>
					<View style={styles.heroCopy}>
						<View style={styles.titleRow}>
							<Label
								role="title"
								style={styles.heroTitle}
							>
								{attendance.project.name}
							</Label>
							<Badge
								tone={statusTone}
								variant="primary"
							>
								{attendance.status.statusFormatted}
							</Badge>
						</View>
						<Label role="helper">
							{t("activity.attendanceDetail.subtitle")}
						</Label>
					</View>
				</View>
			</View>

			<View style={styles.metricGrid}>
				{[
					[
						t("activity.attendanceDetail.metrics.createdAt"),
						attendance.attendanceInfo.auditInfo.createdAtFormatted,
					],
					[
						t("activity.attendanceDetail.metrics.validatedAt"),
						attendance.attendanceInfo.validatedAtFormatted ||
							t("activity.attendance.waiting"),
					],
					[
						t("activity.attendanceDetail.metrics.validator"),
						attendance.validator?.name ||
							t("activity.attendanceDetail.values.notValidated"),
					],
				].map(([label, value]) => (
					<View
						key={String(label)}
						style={[
							styles.metricCard,
							{
								backgroundColor: theme.colors.surface2,
								borderColor: spec.panelBorder,
							},
						]}
					>
						<Label role="helper">{label}</Label>
						<Label
							role="field"
							style={styles.metricValue}
						>
							{value}
						</Label>
					</View>
				))}
			</View>

			<View style={styles.validationSection}>
				<Label
					role="field"
					style={styles.sectionTitle}
				>
					{t("activity.attendanceDetail.sections.validation")}
				</Label>
				<View style={styles.rowGroup}>
					<View style={styles.row}>
						<Label role="helper">
							{t("activity.attendanceQr.fields.duration")}
						</Label>
						<Label role="field">
							{t("activity.attendance.duration", {
								count: attendance.qrValidationInfo.duration,
							})}
						</Label>
					</View>
					<View style={styles.row}>
						<Label role="helper">
							{t("activity.attendanceDetail.fields.formerStudent")}
						</Label>
						<Label role="field">{attendance.student.account.name}</Label>
					</View>
					<View style={styles.row}>
						<Label role="helper">
							{t("activity.attendanceDetail.fields.registration")}
						</Label>
						<Label role="field">
							{attendance.student.academicRegistration}
						</Label>
					</View>
				</View>
			</View>

			<View style={styles.actions}>
				<Button
					onPress={() => {
						router.push(`/attendance/qr/${attendance.id}`);
					}}
				>
					{t("activity.attendanceDetail.actions.showQr")}
				</Button>
				<Button
					variant="secondary"
					onPress={() => {
						router.push(`/activity/enrollments/${attendance.project.id}`);
					}}
				>
					{t("activity.attendanceDetail.actions.openEnrollment")}
				</Button>
			</View>
		</>
	);
}
