import React, { useMemo } from "react";

import { ChevronRight } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

import { Badge, Label } from "@/components/primitives";
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
	onPress,
}: DiscoverProjectCardProps) {
	const { t } = useTranslation();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const isDark = theme.mode === "dark";

	return (
		<Pressable
			accessibilityRole="button"
			accessibilityLabel={t("discover.card.openProject", { name: title })}
			onPress={onPress}
		>
			{({ pressed }) => {
				const cardBackgroundColor = pressed
					? theme.colors.surface2
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
						<View style={styles.badgeRow}>
							<View style={styles.badgeGroup}>
								<Badge
									tone={statusTone}
									variant="primary"
								>
									{statusLabel}
								</Badge>
							</View>
						</View>

						<View style={styles.titleRow}>
							<View style={styles.titleCopy}>
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
							</View>

							<ChevronRight
								color={theme.colors.muted}
								size={18}
								strokeWidth={2.25}
								style={styles.chevron}
							/>
						</View>

						<Label
							role="helper"
							numberOfLines={2}
							style={styles.description}
						>
							{description}
						</Label>

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
								<Label
									role="field"
									style={styles.metricValue}
								>
									{hoursLabel}
								</Label>
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
								<Label
									role="field"
									style={styles.metricValue}
								>
									{seatsLabel}
								</Label>
							</View>
						</View>
					</View>
				);
			}}
		</Pressable>
	);
}
