/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import React, { useMemo } from "react";

import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import type { BrandScreenHeaderProps } from "@/types/client";

import { createStyles } from "./styles";

export function BrandScreenHeader({
	title,
	leftAccessory,
	rightAccessory,
}: BrandScreenHeaderProps) {
	const insets = useSafeAreaInsets();
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);

	return (
		<View
			style={[
				styles.brandHeader,
				{
					backgroundColor: theme.colors.surface1,
					paddingTop: insets.top + theme.space[1],
				},
			]}
		>
			<View style={styles.brandHeaderRow}>
				<View style={styles.brandHeaderSlot}>{leftAccessory ?? null}</View>

				<View style={styles.brandHeaderCenter}>
					<Label
						align="center"
						role="field"
						style={styles.brandHeaderTitle}
					>
						{title}
					</Label>
				</View>

				<View style={styles.brandHeaderSlot}>{rightAccessory ?? null}</View>
			</View>

			<View style={[styles.headerShadowEdge, styles.pointerEventsNone]} />
		</View>
	);
}
