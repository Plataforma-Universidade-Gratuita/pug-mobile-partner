
import React, { useMemo } from "react";

import { ChevronRight } from "lucide-react-native";
import { Pressable, View } from "react-native";

import { Badge, Label, LoadingBlock } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ProfileInfoCardProps } from "@/types/client";
import { withAlpha } from "@/utils";

import { createSectionStyles } from "./styles";

export function InfoCard({
	sectionTitle,
	detailsLabel,
	emailLabel,
	emailValue,
	activeStatusLabel,
	activeTone,
	entityLabel,
	entityValue,
	onOpenDetails,
	errorMessage,
	isLoading,
}: ProfileInfoCardProps) {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createSectionStyles(theme, spec), [spec, theme]);

	return (
		<View style={styles.section}>
			<View style={styles.sectionHeader}>
				<Label role="caption">{sectionTitle}</Label>
			</View>

			<View style={styles.rows}>
				<View style={styles.row}>
					<View style={styles.rowCopy}>
						<Label role="caption">{emailLabel}</Label>
						{isLoading ? (
							<LoadingBlock
								width="68%"
								height={18}
							/>
						) : (
							<Label style={styles.rowValue}>{emailValue}</Label>
						)}
					</View>

					<View style={styles.rowAccessory}>
						{isLoading ? (
							<LoadingBlock
								width={84}
								height={28}
								radius={theme.radius.circle}
							/>
						) : (
							<Badge
								tone={activeTone}
								variant="secondary"
							>
								{activeStatusLabel}
							</Badge>
						)}
					</View>
				</View>

				<View
					style={[styles.rowDivider, { borderTopColor: spec.panelBorder }]}
				/>
				<View style={styles.row}>
					<View style={styles.rowCopy}>
						<Label role="caption">{entityLabel}</Label>
						{isLoading ? (
							<LoadingBlock
								width="64%"
								height={18}
							/>
						) : (
							<Label style={styles.rowValue}>{entityValue}</Label>
						)}
					</View>
				</View>
			</View>

			<Pressable
				onPress={onOpenDetails}
				style={({ pressed }) => [
					styles.actionButton,
					{
						borderColor: spec.panelBorder,
						backgroundColor: pressed
							? withAlpha(
									theme.colors.text,
									theme.mode === "dark" ? 0.08 : 0.04,
								)
							: theme.colors.surface2,
					},
				]}
			>
				<Label role="field">{detailsLabel}</Label>
				<ChevronRight
					color={theme.colors.brand}
					size={18}
				/>
			</Pressable>

			{errorMessage ? (
				<Label
					role="helper"
					tone="danger"
				>
					{errorMessage}
				</Label>
			) : null}
		</View>
	);
}
