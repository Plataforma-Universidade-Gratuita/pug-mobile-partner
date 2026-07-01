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
import { withAlpha } from "@/utils";

import { createStyles } from "../styles";

export function ActivitySegmentedControl({
	activeTab,
	onTabChange,
}: ActivitySegmentedControlProps) {
	const { t } = useTranslation();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const selectorBackground = withAlpha(
		theme.colors.surface2,
		theme.mode === "dark" ? 0.42 : 0.72,
	);
	const selectorOptionPressedBackground = withAlpha(theme.colors.brand, 0.14);

	function renderOption(tab: ActivityTab, label: string) {
		const isActive = activeTab === tab;

		return (
			<Pressable
				key={tab}
				onPress={() => {
					onTabChange(tab);
				}}
				style={({ pressed }) => [
					styles.segmentButton,
					{
						backgroundColor: isActive
							? theme.colors.tabBgActive
							: pressed
								? selectorOptionPressedBackground
								: "transparent",
					},
				]}
			>
				<Label
					align="center"
					role="helper"
					style={styles.segmentLabel}
					tone={isActive ? "brand" : "muted"}
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
					backgroundColor: selectorBackground,
					borderColor: spec.panelBorder,
				},
			]}
		>
			{renderOption("enrollments", t("activity.segments.enrollments"))}
			{renderOption("attendances", t("activity.segments.attendances"))}
		</View>
	);
}
