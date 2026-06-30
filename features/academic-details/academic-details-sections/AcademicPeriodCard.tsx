import React, { useMemo } from "react";

import { View } from "react-native";

import { Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { AcademicPeriodCardProps } from "@/types/client";

import { createStyles } from "../styles";

export function AcademicPeriodCard({
	dueDateLabel,
	dueDateValue,
	remainingDaysLabel,
	remainingDaysValue,
	sectionTitle,
	startDateLabel,
	startDateValue,
}: AcademicPeriodCardProps) {
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
			</View>
			<View style={styles.rows}>
				<View style={styles.row}>
					<Label role="caption">{startDateLabel}</Label>
					<Label style={styles.rowValue}>{startDateValue}</Label>
				</View>
				<View style={styles.rowDivider} />
				<View style={styles.row}>
					<Label role="caption">{dueDateLabel}</Label>
					<Label style={styles.rowValue}>{dueDateValue}</Label>
				</View>
				<View style={styles.rowDivider} />
				<View style={styles.row}>
					<Label role="caption">{remainingDaysLabel}</Label>
					<Label style={styles.rowValue}>{remainingDaysValue}</Label>
				</View>
			</View>
		</View>
	);
}
