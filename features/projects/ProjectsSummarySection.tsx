import React, { useMemo } from "react";

import { View } from "react-native";

import { Badge, Label, LoadingBlock } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ProjectsSummarySectionProps } from "@/types/client";

import { createStyles } from "./styles";

export function ProjectsSummarySection({
	entityName,
	totalProjects,
	inProgressCount,
	plannedCount,
	isLoading = false,
}: ProjectsSummarySectionProps) {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<View style={styles.summarySection}>
			<View style={styles.focusCard}>
				<View style={styles.chipRow}>
					<Badge
						tone="brand"
						variant="primary"
					>
						{entityName}
					</Badge>
				</View>
				<Label
					role="title"
					style={styles.focusTitle}
				>
					This is the main screen for the staff to manage the entity projects
				</Label>
				<Label role="helper">
					Review project status, open details, and keep the entity pipeline in
					one place.
				</Label>
			</View>

			<View style={styles.summaryStrip}>
				{[
					["Total", totalProjects],
					["In progress", inProgressCount],
					["Planned", plannedCount],
				].map(([label, value]) => (
					<View
						key={label}
						style={styles.summaryCard}
					>
						<Label role="helper">{label}</Label>
						{isLoading ? (
							<LoadingBlock
								height={20}
								width="46%"
							/>
						) : (
							<Label
								role="field"
								style={styles.summaryValue}
							>
								{String(value)}
							</Label>
						)}
					</View>
				))}
			</View>
		</View>
	);
}
