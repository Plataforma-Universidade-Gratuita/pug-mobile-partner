import React, { useMemo } from "react";

import { Pressable, View } from "react-native";

import { Badge, Label, LoadingBlock } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ActivityEnrollmentCardProps } from "@/types/client";

import { createStyles } from "../styles";

export function ActivityEnrollmentCard({
	metaLabel,
	onPress,
	projectName,
	statusLabel,
	statusTone,
	isLoading = false,
}: ActivityEnrollmentCardProps) {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<Pressable
			disabled={isLoading}
			onPress={onPress}
		>
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
							{isLoading ? (
								<>
									<LoadingBlock
										width="72%"
										height={20}
									/>
									<LoadingBlock
										width="48%"
										height={14}
									/>
								</>
							) : (
								<>
									<Label
										role="field"
										style={styles.cardTitle}
									>
										{projectName}
									</Label>
									<Label role="helper">{metaLabel}</Label>
								</>
							)}
						</View>
						{isLoading ? (
							<LoadingBlock
								width={96}
								height={28}
								radius={theme.radius.circle}
							/>
						) : (
							<Badge
								tone={statusTone}
								variant="primary"
								style={styles.cardBadge}
							>
								{statusLabel}
							</Badge>
						)}
					</View>
				</View>
			)}
		</Pressable>
	);
}
