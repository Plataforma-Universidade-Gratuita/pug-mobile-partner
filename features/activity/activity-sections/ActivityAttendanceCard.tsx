import React, { useMemo } from "react";

import { Pressable, View } from "react-native";

import { Badge, Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ActivityAttendanceCardProps } from "@/types/client";

import { createStyles } from "../styles";

export function ActivityAttendanceCard({
	dateLabel,
	durationLabel,
	onPress,
	projectName,
	statusLabel,
	statusTone,
}: ActivityAttendanceCardProps) {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<Pressable onPress={onPress}>
			{({ pressed }) => (
				<View
					style={[
						styles.card,
						{
							backgroundColor: pressed
								? theme.colors.surface2
								: spec.panelBackground,
							borderColor: spec.panelBorder,
						},
					]}
				>
					<View style={styles.cardBodyRow}>
						<View style={styles.cardCopy}>
							<Label
								role="field"
								style={styles.cardTitle}
							>
								{projectName}
							</Label>
							<View style={styles.cardMetaRow}>
								<Label role="helper">{durationLabel}</Label>
							</View>
							<View style={styles.cardMetaRow}>
								<Label role="helper">{dateLabel}</Label>
							</View>
						</View>
						<Badge
							tone={statusTone}
							variant="primary"
							style={styles.cardBadge}
						>
							{statusLabel}
						</Badge>
					</View>
				</View>
			)}
		</Pressable>
	);
}
