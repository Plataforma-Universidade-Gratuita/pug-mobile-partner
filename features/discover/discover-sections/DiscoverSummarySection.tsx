import React, { useMemo } from "react";

import { View } from "react-native";

import { Badge, Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { DiscoverSummarySectionProps } from "@/types/client";

import { createStyles } from "../styles";

export function DiscoverSummarySection({
	areaName,
	badgeLabel,
	countLabel,
	description,
}: DiscoverSummarySectionProps) {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<View style={styles.summarySection}>
			<View style={styles.summaryTop}>
				<Badge
					tone="brand"
					variant="primary"
				>
					{badgeLabel}
				</Badge>
				{countLabel ? (
					<Badge
						tone="neutral"
						variant="secondary"
					>
						{countLabel}
					</Badge>
				) : null}
			</View>
			<View style={styles.summaryCopy}>
				<Label
					role="field"
					style={styles.summaryTitle}
				>
					{areaName}
				</Label>
				<Label role="helper">{description}</Label>
			</View>
		</View>
	);
}
