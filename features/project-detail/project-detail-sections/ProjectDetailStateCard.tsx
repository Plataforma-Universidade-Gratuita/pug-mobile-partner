/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import React, { useMemo } from "react";

import { View } from "react-native";

import { Badge, Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ProjectDetailStateCardProps } from "@/types/client";

import { createStyles } from "../styles";

export function ProjectDetailStateCard({
	badgeLabel,
	description,
	title,
	tone,
}: ProjectDetailStateCardProps) {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme), [theme]);

	return (
		<View
			style={[
				styles.stateCard,
				{
					backgroundColor: spec.panelBackground,
					borderColor: spec.panelBorder,
				},
			]}
		>
			<Badge
				style={styles.stateBadge}
				tone={tone}
				variant="primary"
			>
				{badgeLabel}
			</Badge>
			<View style={styles.stateBody}>
				<Label role="field">{title}</Label>
				<Label role="helper">{description}</Label>
			</View>
		</View>
	);
}
