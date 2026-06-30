import React, { useMemo } from "react";

import { Pressable, View } from "react-native";

import { Badge, Button, Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { HomeActivitySnapshotCardProps } from "@/types/client";
import { withAlpha } from "@/utils";

import { createStyles } from "./styles";

export function HomeActivitySnapshotCard({
	badgeLabel,
	badgeTone,
	ctaLabel,
	description,
	eyebrow,
	onPress,
	title,
}: HomeActivitySnapshotCardProps) {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const pressedBackgroundColor = withAlpha(
		theme.colors.text,
		theme.mode === "dark" ? 0.08 : 0.04,
	);
	const actionProps = onPress ? { onPress } : {};

	return (
		<Pressable
			disabled={onPress == null}
			onPress={onPress}
			style={({ pressed }) => [
				styles.snapshotCard,
				{
					backgroundColor:
						onPress != null && pressed
							? pressedBackgroundColor
							: spec.panelBackground,
					borderColor: spec.panelBorder,
				},
			]}
		>
			<View style={styles.snapshotHeader}>
				<View style={styles.snapshotCopy}>
					<Label role="helper">{eyebrow}</Label>
					<Label
						role="field"
						style={styles.snapshotTitle}
					>
						{title}
					</Label>
				</View>

				<Badge
					tone={badgeTone ?? "neutral"}
					variant="primary"
				>
					{badgeLabel}
				</Badge>
			</View>

			<Label role="helper">{description}</Label>

			{ctaLabel ? (
				<View style={styles.snapshotAction}>
					<Button
						variant="secondary"
						{...actionProps}
					>
						{ctaLabel}
					</Button>
				</View>
			) : null}
		</Pressable>
	);
}
