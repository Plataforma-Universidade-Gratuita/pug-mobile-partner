import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Badge, Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ActivitySummarySectionProps } from "@/types/client";

import { createStyles } from "../styles";

function SummaryChip({ label }: { label: string }) {
	return (
		<Badge
			tone="brand"
			variant="secondary"
		>
			{label}
		</Badge>
	);
}

export function ActivitySummarySection({
	activeCount,
	attendanceCount,
	chipLabels,
	focusDescription,
	focusTitle,
	pendingCount,
}: ActivitySummarySectionProps) {
	const { t } = useTranslation();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<View style={styles.summarySection}>
			<View style={styles.summaryStrip}>
				{[
					[t("activity.summary.active"), activeCount],
					[t("activity.summary.pending"), pendingCount],
					[t("activity.summary.attendances"), attendanceCount],
				].map(([label, value]) => (
					<View
						key={String(label)}
						style={[
							styles.summaryCard,
							{
								backgroundColor: spec.panelBackground,
								borderColor: spec.panelBorder,
							},
						]}
					>
						<Label role="helper">{label}</Label>
						<Label
							role="title"
							style={styles.summaryValue}
						>
							{value}
						</Label>
					</View>
				))}
			</View>
			<View style={styles.focusCard}>
				<Label
					role="field"
					style={styles.focusTitle}
				>
					{focusTitle}
				</Label>
				<Label role="helper">{focusDescription}</Label>
				<View style={styles.chipRow}>
					{chipLabels.map(label => (
						<SummaryChip
							key={label}
							label={label}
						/>
					))}
				</View>
			</View>
		</View>
	);
}
