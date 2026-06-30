import React, { useMemo } from "react";

import { View } from "react-native";

import { Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { AcademicRecordCardProps } from "@/types/client";

import { createStyles } from "../styles";

export function AcademicRecordCard({
	academicRegistrationLabel,
	academicRegistrationValue,
	areaOfExpertiseLabel,
	areaOfExpertiseValue,
	campusLabel,
	campusValue,
	courseLabel,
	courseValue,
	sectionTitle,
}: AcademicRecordCardProps) {
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
					<Label role="caption">{academicRegistrationLabel}</Label>
					<Label style={styles.rowValue}>{academicRegistrationValue}</Label>
				</View>
				<View style={styles.rowDivider} />
				<View style={styles.row}>
					<Label role="caption">{campusLabel}</Label>
					<Label style={styles.rowValue}>{campusValue}</Label>
				</View>
				<View style={styles.rowDivider} />
				<View style={styles.row}>
					<Label role="caption">{courseLabel}</Label>
					<Label style={styles.rowValue}>{courseValue}</Label>
				</View>
				<View style={styles.rowDivider} />
				<View style={styles.row}>
					<Label role="caption">{areaOfExpertiseLabel}</Label>
					<Label style={styles.rowValue}>{areaOfExpertiseValue}</Label>
				</View>
			</View>
		</View>
	);
}
