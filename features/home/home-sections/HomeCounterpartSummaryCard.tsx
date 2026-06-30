import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { View, type DimensionValue } from "react-native";

import { Badge, Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { HomeCounterpartSummaryCardProps } from "@/types/client";

import { createStyles } from "./styles";

export function HomeCounterpartSummaryCard({
	badgeLabel,
	courseLabel,
	dueDateLabel,
	name,
	progressLabel,
	progressRatio,
	remainingDaysLabel,
	summaryMetrics,
}: HomeCounterpartSummaryCardProps) {
	const { t } = useTranslation();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const progressWidth = (String(Math.round(progressRatio * 100)) +
		"%") as DimensionValue;

	return (
		<View style={styles.summarySection}>
			<View style={styles.header}>
				<Badge
					style={styles.badge}
					tone="brand"
					variant="primary"
				>
					{badgeLabel}
				</Badge>

				<View style={styles.headerCopy}>
					<Label
						role="title"
						style={styles.title}
					>
						{name}
					</Label>
					<Label role="helper">{courseLabel}</Label>
				</View>
			</View>

			<View style={styles.progressBlock}>
				<View style={styles.progressHeader}>
					<Label role="helper">{t("home.summary.progress")}</Label>
					<Label role="helper">{progressLabel}</Label>
				</View>

				<View style={styles.progressTrack}>
					<View style={[styles.progressFill, { width: progressWidth }]} />
				</View>
			</View>

			<View style={styles.metricsGrid}>
				{summaryMetrics.map(metric => (
					<View
						key={metric.label}
						style={[
							styles.metricCard,
							{
								backgroundColor: theme.colors.surface2,
								borderColor: spec.panelBorder,
							},
						]}
					>
						<Label role="helper">{metric.label}</Label>
						<Label
							role="field"
							style={styles.metricValue}
						>
							{metric.value}
						</Label>
					</View>
				))}
			</View>

			<View style={styles.metaRow}>
				<View style={styles.metaItem}>
					<Label role="helper">{t("home.summary.dueDate")}</Label>
					<Label role="field">{dueDateLabel}</Label>
				</View>
				<View style={styles.metaItem}>
					<Label role="helper">{t("home.summary.remainingDays")}</Label>
					<Label role="field">{remainingDaysLabel}</Label>
				</View>
			</View>
		</View>
	);
}
