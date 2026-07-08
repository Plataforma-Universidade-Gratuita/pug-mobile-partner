
import React, { useMemo } from "react";

import { View } from "react-native";

import { Badge, Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ProjectsStateCardProps } from "@/types/client";

import { createStyles } from "./styles";

export function ProjectsStateCard({
	title,
	description,
	tone,
	badgeLabel = "Projects",
}: ProjectsStateCardProps) {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<View style={styles.stateCard}>
			<Badge
				style={styles.stateBadge}
				tone={tone}
				variant="primary"
			>
				{badgeLabel}
			</Badge>

			<View style={styles.stateBody}>
				<Label
					role="field"
					style={styles.listTitle}
				>
					{title}
				</Label>
				<Label role="helper">{description}</Label>
			</View>
		</View>
	);
}
