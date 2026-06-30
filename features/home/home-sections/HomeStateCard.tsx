import React, { useMemo } from "react";

import { View } from "react-native";

import { Badge, Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { HomeStateCardProps } from "@/types/client";

import { createStyles } from "./styles";

export function HomeStateCard({
	badgeLabel,
	description,
	title,
	tone,
}: HomeStateCardProps) {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

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
				style={styles.badge}
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
