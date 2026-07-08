import React, { useMemo } from "react";

import { Pressable, View } from "react-native";

import { Badge, Label, LoadingBlock } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ProjectsProjectCardProps } from "@/types/client";

import { createStyles } from "./styles";

export function ProjectsProjectCard({
	project,
	isLoading = false,
	onPress,
	statusLabel,
	statusTone = "neutral",
	availabilityLabel,
}: ProjectsProjectCardProps) {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<Pressable
			disabled={isLoading || !onPress}
			onPress={onPress}
			style={({ pressed }) => [
				styles.card,
				pressed ? styles.cardPressed : null,
			]}
		>
			<View style={styles.cardHeader}>
				<View style={styles.cardHeaderCopy}>
					{isLoading ? (
						<>
							<LoadingBlock
								height={28}
								radius={theme.radius.circle}
								width={96}
							/>
							<LoadingBlock
								height={24}
								width="70%"
							/>
						</>
					) : (
						<>
							<Badge
								style={styles.cardBadge}
								tone={statusTone}
								variant="primary"
							>
								{statusLabel}
							</Badge>
							<Label
								role="field"
								style={styles.cardTitle}
							>
								{project?.name ?? "Project"}
							</Label>
						</>
					)}

					{isLoading ? (
						<>
							<LoadingBlock
								height={14}
								width="94%"
							/>
							<LoadingBlock
								height={14}
								width="78%"
							/>
						</>
					) : (
						<Label
							numberOfLines={3}
							role="helper"
							style={styles.cardDescription}
						>
							{project?.description ?? ""}
						</Label>
					)}
				</View>

				{isLoading ? (
					<LoadingBlock
						height={24}
						radius={theme.radius.circle}
						width={84}
					/>
				) : availabilityLabel ? (
					<Badge
						style={styles.metaAvailability}
						tone="info"
						variant="secondary"
					>
						{availabilityLabel}
					</Badge>
				) : null}
			</View>

			<View style={styles.metaRow}>
				{[
					["Offered hours", project?.projectInfo.offeredHours ?? null],
					["Created by", project?.projectInfo.createdBy.name ?? null],
					["Participants", project?.projectInfo.currentParticipants ?? null],
				].map(([label, value]) => (
					<View
						key={label}
						style={styles.metaCard}
					>
						<Label role="helper">{label}</Label>
						{isLoading ? (
							<LoadingBlock
								height={18}
								width="58%"
							/>
						) : (
							<Label
								role="field"
								style={styles.metaValue}
							>
								{value == null ? "Unavailable" : String(value)}
							</Label>
						)}
					</View>
				))}
			</View>
		</Pressable>
	);
}
