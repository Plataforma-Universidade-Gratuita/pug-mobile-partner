
import React, { useMemo } from "react";

import { View } from "react-native";

import { Badge, Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { OrganizationalDetailsStateCardProps } from "@/types/client";

import { createStyles } from "./styles";

export function OrganizationalDetailsStateCard({
	badgeLabel,
	description,
	title,
	tone,
}: OrganizationalDetailsStateCardProps) {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<View style={styles.stateCard}>
			<Badge
				style={styles.stateBadge}
				tone={tone}
				variant="secondary"
			>
				{badgeLabel}
			</Badge>
			<View style={styles.stateCopy}>
				<Label role="field">{title}</Label>
				<Label role="helper">{description}</Label>
			</View>
		</View>
	);
}
