import React, { useMemo } from "react";

import { useRouter } from "expo-router";
import { View } from "react-native";

import { Badge, Button, Label, LoadingBlock } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { AttendanceDetailContentProps } from "@/types/client";

import { createStyles } from "./styles";

export function AttendanceDetailContent({
	attendance,
	isLoading = false,
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
										{attendance.status.statusFormatted}
									</Badge>
									<Label
										role="title"
										style={styles.heroTitle}
									>
										{attendance.project.name}
									</Label>
								</>
							)}
						</View>
						{isLoading ? (
							<LoadingBlock
								width="62%"
								height={14}
							/>
						) : (
							<Label role="helper">
								{t("activity.attendanceDetail.subtitle")}
							</Label>
						)}
					</View>
				</View>
			</View>

			<View style={styles.metricGrid}>
				<View
					style={[
						styles.metricCard,
						{
							backgroundColor: theme.colors.surface2,
							borderColor: spec.panelBorder,
						},
					]}
				>
					<Label role="helper">
						{t("activity.attendanceDetail.sections.validation")}
					</Label>
					<View style={styles.metricStack}>
						<View style={styles.metricLine}>
							<Label role="helper">
								{t("activity.attendanceDetail.metrics.validator")}
							</Label>
							{isLoading ? (
								<LoadingBlock
									width="68%"
									height={18}
								/>
							) : (
								<Label
									role="field"
									style={styles.metricValue}
								>
									{attendance.validator?.name ||
										t("activity.attendanceDetail.values.notValidated")}
								</Label>
							)}
						</View>
						<View style={styles.metricLine}>
							<Label role="helper">
								{t("activity.attendanceDetail.metrics.validatedAt")}
							</Label>
							{isLoading ? (
								<LoadingBlock
									width="54%"
									height={18}
								/>
							) : (
								<Label
									role="field"
									style={styles.metricValue}
								>
									{attendance.attendanceInfo.validatedAtFormatted ||
										t("activity.attendance.waiting")}
								</Label>
							)}
						</View>
					</View>
				</View>
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
							{t("activity.attendanceDetail.metrics.createdAt")}
						</Label>
						{isLoading ? (
							<LoadingBlock
								width="48%"
								height={18}
							/>
						) : (
							<Label role="field">
								{attendance.attendanceInfo.auditInfo.createdAtFormatted}
							</Label>
						)}
					</View>
					<View style={styles.row}>
						<Label role="helper">Logged hours</Label>
						{isLoading ? (
							<LoadingBlock
								width="44%"
								height={18}
							/>
						) : (
							<Label role="field">
								{t("activity.attendance.duration", {
									count: attendance.qrValidationInfo.duration,
								})}
							</Label>
						)}
					</View>
					<View style={styles.row}>
						<Label role="helper">
							{t("activity.attendanceDetail.fields.formerStudent")}
						</Label>
						{isLoading ? (
							<LoadingBlock
								width="58%"
								height={18}
							/>
						) : (
							<Label role="field">{attendance.student.account.name}</Label>
						)}
					</View>
					<View style={styles.row}>
						<Label role="helper">
							{t("activity.attendanceDetail.fields.registration")}
						</Label>
						{isLoading ? (
							<LoadingBlock
								width="36%"
								height={18}
							/>
						) : (
							<Label role="field">
								{attendance.student.academicRegistration}
							</Label>
						)}
					</View>
				</View>
			</View>

			<View style={styles.actions}>
				{isLoading ? (
					<>
						<LoadingBlock
							width="100%"
							height={theme.form.controlHeight}
							radius={theme.form.controlRadius}
						/>
					</>
				) : (
					<Button
						variant="secondary"
						onPress={() => {
							router.replace({
								pathname: "/enrollment/[id]",
								params: { id: attendance.project.id },
							});
						}}
					>
						{t("activity.attendanceDetail.actions.openEnrollment")}
					</Button>
				)}
			</View>
		</>
	);
}
