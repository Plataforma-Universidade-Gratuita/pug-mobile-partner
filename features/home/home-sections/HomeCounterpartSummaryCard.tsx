import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { View, type DimensionValue } from "react-native";

import { Badge, Label, LoadingBlock } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { HomeCounterpartSummaryCardProps } from "@/types/client";

import { createStyles } from "./styles";

export function HomeCounterpartSummaryCard({
	badgeLabel,
	courseLabel,
	dueDateLabel,
	isLoading = false,
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
				{isLoading ? (
					<LoadingBlock
						width={112}
						height={28}
						radius={theme.radius.circle}
					/>
				) : (
					<Badge
						style={styles.badge}
						tone="brand"
						variant="primary"
					>
						{badgeLabel}
					</Badge>
				)}

				<View style={styles.headerCopy}>
					{isLoading ? (
						<>
							<LoadingBlock
								width="58%"
								height={28}
							/>
							<LoadingBlock
								width="74%"
								height={16}
							/>
						</>
					) : (
						<>
							<Label
								role="title"
								style={styles.title}
							>
								{name}
							</Label>
							<Label role="helper">{courseLabel}</Label>
						</>
					)}
				</View>
			</View>

			<View style={styles.progressBlock}>
				<View style={styles.progressHeader}>
					<Label role="helper">{t("home.summary.progress")}</Label>
					{isLoading ? (
						<LoadingBlock
							width={64}
							height={14}
						/>
					) : (
						<Label role="helper">{progressLabel}</Label>
					)}
				</View>

				<View style={styles.progressTrack}>
					{isLoading ? (
						<LoadingBlock
							width="100%"
							height="100%"
							radius={theme.radius.circle}
						/>
					) : (
						<View style={[styles.progressFill, { width: progressWidth }]} />
					)}
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
						{isLoading ? (
							<LoadingBlock
								width="42%"
								height={22}
							/>
						) : (
							<Label
								role="field"
								style={styles.metricValue}
							>
								{metric.value}
							</Label>
						)}
					</View>
				))}
			</View>

			<View style={styles.metaRow}>
				<View style={styles.metaItem}>
					<Label role="helper">{t("home.summary.dueDate")}</Label>
					{isLoading ? (
						<LoadingBlock
							width="72%"
							height={18}
						/>
					) : (
						<Label role="field">{dueDateLabel}</Label>
					)}
				</View>
				<View style={styles.metaItem}>
					<Label role="helper">{t("home.summary.remainingDays")}</Label>
					{isLoading ? (
						<LoadingBlock
							width="68%"
							height={18}
						/>
					) : (
						<Label role="field">{remainingDaysLabel}</Label>
					)}
				</View>
			</View>
		</View>
	);
}
