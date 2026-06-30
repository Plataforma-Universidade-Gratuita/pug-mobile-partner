import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

import { Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type {
	ActivitySegmentedControlProps,
	ActivityTab,
} from "@/types/client";

import { createStyles } from "../styles";

export function ActivitySegmentedControl({
	activeTab,
	onTabChange,
}: ActivitySegmentedControlProps) {
	const { t } = useTranslation();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	function renderOption(tab: ActivityTab, label: string) {
		const isActive = activeTab === tab;

		return (
			<Pressable
				key={tab}
				onPress={() => {
					onTabChange(tab);
				}}
				style={[
					styles.segmentButton,
					{ backgroundColor: isActive ? theme.colors.brand : "transparent" },
				]}
			>
				<Label
					align="center"
					role="helper"
					style={[
						styles.segmentLabel,
						{ color: isActive ? theme.colors.chromeFg : theme.colors.muted },
					]}
				>
					{label}
				</Label>
			</Pressable>
		);
	}

	return (
		<View
			style={[
				styles.segmented,
				{
					backgroundColor: theme.colors.surface2,
					borderColor: spec.panelBorder,
				},
			]}
		>
			{renderOption("enrollments", t("activity.segments.enrollments"))}
			{renderOption("attendances", t("activity.segments.attendances"))}
		</View>
	);
}
