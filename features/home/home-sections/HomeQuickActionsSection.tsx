import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

import { Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { HomeQuickActionsSectionProps } from "@/types/client";
import { withAlpha } from "@/utils";

import { createStyles } from "./styles";

export function HomeQuickActionsSection({
	items,
}: HomeQuickActionsSectionProps) {
	const { t } = useTranslation();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const pressedBackgroundColor = withAlpha(
		theme.colors.text,
		theme.mode === "dark" ? 0.08 : 0.04,
	);
	const iconBackgroundColor = withAlpha(
		theme.colors.brand,
		theme.mode === "dark" ? 0.16 : 0.1,
	);

	return (
		<View style={styles.section}>
			<View style={styles.sectionHeader}>
				<Label role="field">{t("home.sections.quickActions")}</Label>
				<Label role="helper">{t("home.sections.quickActionsHelper")}</Label>
			</View>

			<View style={styles.actionsGrid}>
				{items.map(item => {
					const Icon = item.icon;

					return (
						<Pressable
							key={item.label}
							accessibilityRole="button"
							onPress={item.onPress}
							style={({ pressed }) => [
								styles.actionCard,
								{
									backgroundColor: pressed
										? pressedBackgroundColor
										: spec.panelBackground,
									borderColor: spec.panelBorder,
								},
							]}
						>
							<View
								style={[
									styles.actionIcon,
									{
										backgroundColor: iconBackgroundColor,
									},
								]}
							>
								<Icon
									color={theme.colors.brand}
									size={18}
									strokeWidth={2.2}
								/>
							</View>

							<View style={styles.actionCopy}>
								<Label role="field">{item.label}</Label>
								<Label role="helper">{item.helper}</Label>
							</View>
						</Pressable>
					);
				})}
			</View>
		</View>
	);
}
