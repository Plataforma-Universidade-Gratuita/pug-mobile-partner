import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Badge, Label, LoadingBlock } from "@/components/primitives";
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
	isLoading = false,
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
						{isLoading ? (
							<LoadingBlock
								width="48%"
								height={28}
							/>
						) : (
							<Label
								role="title"
								style={styles.summaryValue}
							>
								{value}
							</Label>
						)}
					</View>
				))}
			</View>
			<View style={styles.focusCard}>
				{isLoading ? (
					<>
						<LoadingBlock
							width="56%"
							height={22}
						/>
						<LoadingBlock
							width="88%"
							height={14}
						/>
					</>
				) : (
					<>
						<Label
							role="field"
							style={styles.focusTitle}
						>
							{focusTitle}
						</Label>
						<Label role="helper">{focusDescription}</Label>
					</>
				)}
				<View style={styles.chipRow}>
					{isLoading
						? ["first", "second"].map(key => (
								<LoadingBlock
									key={key}
									width={96}
									height={28}
									radius={theme.radius.circle}
								/>
							))
						: chipLabels.map(label => (
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
