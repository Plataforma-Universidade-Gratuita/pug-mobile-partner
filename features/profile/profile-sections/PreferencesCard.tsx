import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

import { Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ProfilePreferencesCardProps } from "@/types/client";
import { withAlpha } from "@/utils";

import { PROFILE_LANGUAGE_OPTIONS, PROFILE_THEME_OPTIONS } from "./constants";
import { createSectionStyles } from "./styles";

export function PreferencesCard({
	sectionTitle,
	themeLabel,
	themeHelper,
	themeMode,
	onThemeModeChange,
	languageLabel,
	languageHelper,
	language,
	onLanguageChange,
}: ProfilePreferencesCardProps) {
	const { t } = useTranslation();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createSectionStyles(theme, spec), [spec, theme]);
	const selectorBackground = withAlpha(
		theme.colors.surface2,
		theme.mode === "dark" ? 0.42 : 0.72,
	);
	const selectorOptionPressedBackground = withAlpha(theme.colors.brand, 0.14);

	return (
		<View style={styles.section}>
			<View style={styles.sectionHeader}>
				<Label role="caption">{sectionTitle}</Label>
			</View>

			<View style={styles.rows}>
				<View style={styles.row}>
					<View style={styles.rowCopy}>
						<Label role="field">{themeLabel}</Label>
						<Label role="helper">{themeHelper}</Label>
					</View>
				</View>

				<View
					style={[
						styles.selector,
						{
							backgroundColor: selectorBackground,
							borderColor: spec.panelBorder,
						},
					]}
				>
					{PROFILE_THEME_OPTIONS.map(option => {
						const isSelected = themeMode === option.value;

						return (
							<Pressable
								key={option.value}
								onPress={() => {
									onThemeModeChange(option.value);
								}}
								style={({ pressed }) => [
									styles.selectorOption,
									{
										backgroundColor: isSelected
											? theme.colors.tabBgActive
											: pressed
												? selectorOptionPressedBackground
												: "transparent",
									},
								]}
							>
								<Label
									role="caption"
									tone={isSelected ? "brand" : "muted"}
								>
									{t(option.labelKey)}
								</Label>
							</Pressable>
						);
					})}
				</View>

				<View
					style={[styles.rowDivider, { borderTopColor: spec.panelBorder }]}
				/>
				<View style={styles.row}>
					<View style={styles.rowCopy}>
						<Label role="field">{languageLabel}</Label>
						<Label role="helper">{languageHelper}</Label>
					</View>
				</View>

				<View
					style={[
						styles.selector,
						{
							backgroundColor: selectorBackground,
							borderColor: spec.panelBorder,
						},
					]}
				>
					{PROFILE_LANGUAGE_OPTIONS.map(option => {
						const isSelected = language === option.value;

						return (
							<Pressable
								key={option.value}
								onPress={() => {
									onLanguageChange(option.value);
								}}
								style={({ pressed }) => [
									styles.selectorOption,
									styles.selectorOptionCompact,
									{
										backgroundColor: isSelected
											? theme.colors.tabBgActive
											: pressed
												? selectorOptionPressedBackground
												: "transparent",
									},
								]}
							>
								<Label
									role="caption"
									tone={isSelected ? "brand" : "muted"}
								>
									{option.label}
								</Label>
							</Pressable>
						);
					})}
				</View>
			</View>
		</View>
	);
}
