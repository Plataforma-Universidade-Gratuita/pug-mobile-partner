/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Button, Badge, Label, LoadingBlock } from "@/components/primitives";
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
	isLoading = false,
	progressRatio,
	progressValueLabel,
	ctaLabel = null,
	ctaDisabled = false,
	onPressCta,
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
						{isLoading ? (
							<>
								<LoadingBlock
									width={96}
									height={28}
									radius={theme.radius.circle}
								/>
								<LoadingBlock
									width="68%"
									height={26}
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
						<View style={styles.loadingDescription}>
							<LoadingBlock
								width="92%"
								height={14}
							/>
							<LoadingBlock
								width="74%"
								height={14}
							/>
						</View>
					) : (
						<Label role="helper">{description}</Label>
					)}
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
						{isLoading ? (
							<LoadingBlock
								width="56%"
								height={18}
							/>
						) : (
							<Label
								role="field"
								style={styles.metricValue}
							>
								{value}
							</Label>
						)}
					</View>
				))}
			</View>

			<View style={styles.progressBlock}>
				<View style={styles.progressHeader}>
					<Label role="helper">{t("projectDetail.metrics.progress")}</Label>
					{isLoading ? (
						<LoadingBlock
							width={64}
							height={14}
						/>
					) : (
						<Label role="helper">{progressValueLabel}</Label>
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
						<View
							style={[
								styles.progressFill,
								{
									width: `${Math.round(progressRatio * 100)}%`,
								},
							]}
						/>
					)}
				</View>
			</View>

			{ctaLabel ? (
				isLoading ? (
					<LoadingBlock
						width="100%"
						height={theme.form.controlHeight}
						radius={theme.form.controlRadius}
					/>
				) : (
					<Button
						disabled={ctaDisabled}
						{...(onPressCta ? { onPress: onPressCta } : {})}
					>
						{ctaLabel}
					</Button>
				)
			) : null}
		</View>
	);
}
