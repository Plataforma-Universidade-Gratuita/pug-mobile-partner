
import React, { useMemo } from "react";

import { View } from "react-native";

import { Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ProjectsListSectionProps } from "@/types/client";

import { ProjectsProjectCard } from "./ProjectsProjectCard";
import { createStyles } from "./styles";
import { resolveProjectsStatusLabel } from "./utils";

export function ProjectsListSection({
	projects,
	isLoading = false,
	onOpenProject,
	resolveStatusTone,
	resolveAvailabilityLabel,
}: ProjectsListSectionProps) {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const skeletonCount = 3;

	return (
		<View style={styles.listSection}>
			<View style={styles.listHeader}>
				<Label
					role="field"
					style={styles.listTitle}
				>
					Projects
				</Label>
				<Label role="helper">
					All projects currently linked to the active entity.
				</Label>
			</View>

			<View style={styles.list}>
				{isLoading
					? Array.from({ length: skeletonCount }).map((_, index) => (
							<ProjectsProjectCard
								key={`projects-loading-${index}`}
								isLoading
								project={null}
							/>
						))
					: projects.map(project => (
							<ProjectsProjectCard
								key={project.id}
								availabilityLabel={resolveAvailabilityLabel(project)}
								onPress={() => {
									onOpenProject(project);
								}}
								project={project}
								statusLabel={resolveProjectsStatusLabel(project.status.status)}
								statusTone={resolveStatusTone(project.status.status)}
							/>
						))}
			</View>
		</View>
	);
}
