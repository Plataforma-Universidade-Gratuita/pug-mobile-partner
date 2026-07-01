import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

import { Badge, Label, LoadingBlock } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { DiscoverProjectCardProps } from "@/types/client";
import { withAlpha } from "@/utils";

import { createStyles } from "./styles";

export function DiscoverProjectCard({
	title,
	entityMeta,
	description,
	statusLabel,
	statusTone,
	seatsLabel,
	hoursLabel,
	isLoading = false,
	onPress,
}: DiscoverProjectCardProps) {
	const { t } = useTranslation();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const isDark = theme.mode === "dark";
	const pressedBackgroundColor = withAlpha(
		theme.colors.text,
		theme.mode === "dark" ? 0.08 : 0.04,
	);

	return (
		<Pressable
			accessibilityRole="button"
			accessibilityLabel={t("discover.card.openProject", { name: title })}
			disabled={isLoading}
			onPress={onPress}
		>
			{({ pressed }) => {
				const cardBackgroundColor = pressed
					? pressedBackgroundColor
					: spec.panelBackground;
				const metricBackgroundColor = pressed
					? theme.colors.surface3
					: theme.colors.surface2;
				const metricBorderColor = pressed
					? withAlpha(theme.colors.text, isDark ? 0.12 : 0.08)
					: spec.panelBorder;

				return (
					<View
						style={[
							styles.card,
							{
								backgroundColor: cardBackgroundColor,
								borderColor: spec.panelBorder,
							},
						]}
					>
						<View style={styles.titleRow}>
							<View style={styles.titleCopy}>
								{isLoading ? (
									<>
										<LoadingBlock
											width="76%"
											height={20}
										/>
										<LoadingBlock
											width="52%"
											height={14}
										/>
									</>
								) : (
									<>
										<Label
											role="field"
											style={styles.title}
										>
											{title}
										</Label>

										<Label
											role="helper"
											numberOfLines={1}
										>
											{entityMeta}
										</Label>
									</>
								)}
							</View>

							{isLoading ? (
								<LoadingBlock
									width={96}
									height={28}
									radius={theme.radius.circle}
								/>
							) : (
								<Badge
									tone={statusTone}
									variant="primary"
									style={styles.statusBadge}
								>
									{statusLabel}
								</Badge>
							)}
						</View>

						{isLoading ? (
							<View style={styles.loadingDescription}>
								<LoadingBlock
									width="94%"
									height={14}
								/>
								<LoadingBlock
									width="72%"
									height={14}
								/>
							</View>
						) : (
							<Label
								role="helper"
								numberOfLines={2}
								style={styles.description}
							>
								{description}
							</Label>
						)}

						<View style={styles.metricsRow}>
							<View
								style={[
									styles.metricCard,
									{
										backgroundColor: metricBackgroundColor,
										borderColor: metricBorderColor,
									},
								]}
							>
								<Label role="helper">{t("discover.card.hoursLabel")}</Label>
								{isLoading ? (
									<LoadingBlock
										width="78%"
										height={18}
									/>
								) : (
									<Label
										role="field"
										style={styles.metricValue}
									>
										{hoursLabel}
									</Label>
								)}
							</View>

							<View
								style={[
									styles.metricCard,
									{
										backgroundColor: metricBackgroundColor,
										borderColor: metricBorderColor,
									},
								]}
							>
								<Label role="helper">{t("discover.card.seatsLabel")}</Label>
								{isLoading ? (
									<LoadingBlock
										width="74%"
										height={18}
									/>
								) : (
									<Label
										role="field"
										style={styles.metricValue}
									>
										{seatsLabel}
									</Label>
								)}
							</View>
						</View>
					</View>
				);
			}}
		</Pressable>
	);
}
