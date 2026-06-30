import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Badge, Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ProjectOverviewCardProps } from "@/types/client";

import { createStyles } from "./styles";

export function ProjectOverviewCard({
	title,
	description,
	statusLabel,
	statusTone,
	activeParticipantsValue,
	maxParticipantsValue,
	completedHoursValue,
	offeredHoursValue,
	progressRatio,
	progressValueLabel,
}: ProjectOverviewCardProps) {
	const { t } = useTranslation();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<View style={styles.overviewSection}>
			<View style={styles.cardHeader}>
				<View style={styles.titleCopy}>
					<View style={styles.titleRow}>
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
			</View>

			<View style={styles.metricsGrid}>
				{[
					[
						t("projectDetail.metrics.activeParticipants"),
						activeParticipantsValue,
					],
					[t("projectDetail.metrics.maxParticipants"), maxParticipantsValue],
					[t("projectDetail.metrics.completedHours"), completedHoursValue],
					[t("projectDetail.metrics.offeredHours"), offeredHoursValue],
				].map(([label, value]) => (
					<View
						key={label}
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

			<View style={styles.progressBlock}>
				<View style={styles.progressHeader}>
					<Label role="helper">{t("projectDetail.metrics.progress")}</Label>
					<Label role="helper">{progressValueLabel}</Label>
				</View>

				<View style={styles.progressTrack}>
					<View
						style={[
							styles.progressFill,
							{
								width: `${Math.round(progressRatio * 100)}%`,
							},
						]}
					/>
				</View>
			</View>
		</View>
	);
}
