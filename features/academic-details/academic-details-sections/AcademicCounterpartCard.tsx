import React, { useMemo } from "react";

import { View } from "react-native";

import { Badge, Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { AcademicCounterpartCardProps } from "@/types/client";

import { createStyles } from "../styles";

export function AcademicCounterpartCard({
	completedHoursLabel,
	completedHoursValue,
	isConcluded,
	missingHoursLabel,
	missingHoursValue,
	progressTitle,
	progressRatio,
	progressValueLabel,
	requiredHoursLabel,
	requiredHoursValue,
	sectionTitle,
	statusLabel,
}: AcademicCounterpartCardProps) {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<View style={styles.section}>
			<View style={styles.sectionHeader}>
				<Label
					role="field"
					style={styles.sectionTitle}
				>
					{sectionTitle}
				</Label>
				<Badge
					style={styles.badge}
					tone={isConcluded ? "success" : "brand"}
					variant="secondary"
				>
					{statusLabel}
				</Badge>
			</View>
			<View style={styles.metricsGrid}>
				<View style={styles.metricCard}>
					<Label role="caption">{requiredHoursLabel}</Label>
					<Label style={styles.metricValue}>{requiredHoursValue}</Label>
				</View>
				<View style={styles.metricCard}>
					<Label role="caption">{completedHoursLabel}</Label>
					<Label style={styles.metricValue}>{completedHoursValue}</Label>
				</View>
				<View style={styles.metricCard}>
					<Label role="caption">{missingHoursLabel}</Label>
					<Label style={styles.metricValue}>{missingHoursValue}</Label>
				</View>
			</View>
			<View style={styles.progressBlock}>
				<View style={styles.progressHeader}>
					<Label role="caption">{progressTitle}</Label>
					<Label style={styles.metricValue}>{progressValueLabel}</Label>
				</View>
				<View style={styles.progressTrack}>
					<View
						style={[
							styles.progressFill,
							{ width: `${Math.max(0, Math.min(progressRatio, 1)) * 100}%` },
						]}
					/>
				</View>
			</View>
		</View>
	);
}
