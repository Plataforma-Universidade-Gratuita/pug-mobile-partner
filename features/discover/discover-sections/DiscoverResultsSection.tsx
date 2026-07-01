import React, { useMemo } from "react";

import { useRouter } from "expo-router";
import { View } from "react-native";

import { Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { DiscoverResultsSectionProps } from "@/types/client";

import { DiscoverProjectCard } from "../project-card";
import { createStyles } from "../styles";
import {
	getProjectAvailableSeats,
	getProjectRemainingHours,
	resolveDiscoverProjectStatusTone,
} from "../utils";

export function DiscoverResultsSection({
	projects,
	isLoading = false,
	t,
}: DiscoverResultsSectionProps) {
	const router = useRouter();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<View style={styles.resultsSection}>
			<View style={styles.resultsHeader}>
				<Label
					role="field"
					style={styles.resultsTitle}
				>
					{t("discover.resultsTitle")}
				</Label>
			</View>
			<View style={styles.projectList}>
				{projects.map(project => {
					const remainingHours = getProjectRemainingHours(project);
					const availableSeats = getProjectAvailableSeats(project);
					const maxParticipants = project.projectInfo.maxParticipants;
					const hoursLabel =
						remainingHours == null
							? t("discover.card.hoursFallback")
							: t("discover.card.hoursValue", { count: remainingHours });
					const seatsLabel =
						maxParticipants == null
							? t("discover.card.seatsUnlimited")
							: availableSeats == null
								? t("discover.card.seatsOpen")
								: t("discover.card.seatsValue", { count: availableSeats });

					return (
						<DiscoverProjectCard
							key={project.id}
							description={project.description}
							entityMeta={project.entity.name}
							hoursLabel={hoursLabel}
							isLoading={isLoading}
							onPress={() => {
								router.push(`/discover/projects/${project.id}`);
							}}
							seatsLabel={seatsLabel}
							statusLabel={project.status.statusFormatted}
							statusTone={resolveDiscoverProjectStatusTone(
								project.status.status,
							)}
							title={project.name}
						/>
					);
				})}
			</View>
		</View>
	);
}
