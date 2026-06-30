import React, { useMemo } from "react";

import { View } from "react-native";

import { Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { HomeRecentSectionProps } from "@/types/client";

import { createStyles } from "../styles";
import { HomeActivitySnapshotCard } from "./HomeActivitySnapshotCard";

export function HomeRecentSection({
	attendanceCard,
	enrollmentCard,
	helper,
	title,
}: HomeRecentSectionProps) {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<>
			<View style={styles.sectionHeader}>
				<Label role="field">{title}</Label>
				<Label role="helper">{helper}</Label>
			</View>
			<View style={styles.snapshotStack}>
				<HomeActivitySnapshotCard {...enrollmentCard} />
				<HomeActivitySnapshotCard {...attendanceCard} />
			</View>
		</>
	);
}
