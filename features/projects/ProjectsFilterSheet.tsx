
import React, { useEffect, useMemo, useState } from "react";

import { Pressable, ScrollView, View } from "react-native";

import {
	Button,
	FilterSheetScaffold,
	Input,
	Label,
	OverflowActionSheet,
} from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ProjectsFilterSheetProps, ProjectsFilters } from "@/types/client";
import { withAlpha } from "@/utils";

import { createStyles } from "./styles";
import { createDefaultProjectsFilters } from "./utils";

export function ProjectsFilterSheet({
	visible,
	filters,
	statusOptions,
	onApply,
	onDismiss,
}: ProjectsFilterSheetProps) {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const [draftFilters, setDraftFilters] = useState<ProjectsFilters>(filters);
	const selectorBackground = withAlpha(
		theme.colors.surface2,
		theme.mode === "dark" ? 0.42 : 0.72,
	);
	const optionPressedBackground = withAlpha(theme.colors.brand, 0.14);

	useEffect(() => {
		if (visible) {
			setDraftFilters(filters);
		}
	}, [filters, visible]);

	function toggleStatus(value: string) {
		setDraftFilters(current => ({
			...current,
			statuses: current.statuses.includes(value as never)
				? current.statuses.filter(status => status !== value)
				: [...current.statuses, value as never],
		}));
	}

	return (
		<OverflowActionSheet
			onDismiss={onDismiss}
			visible={visible}
		>
			<FilterSheetScaffold
				footer={
					<View style={styles.footerActions}>
						<Button
							fullWidth={false}
							onPress={() => {
								const nextFilters = createDefaultProjectsFilters();
								setDraftFilters(nextFilters);
								onApply(nextFilters);
							}}
							style={styles.footerAction}
							variant="secondary"
						>
							Clear
						</Button>
						<Button
							fullWidth={false}
							onPress={() => {
								onApply({
									query: draftFilters.query.trim(),
									statuses: draftFilters.statuses,
									availabilityOnly: draftFilters.availabilityOnly,
								});
							}}
							style={styles.footerAction}
						>
							Apply
						</Button>
					</View>
				}
				subtitle="Narrow the entity project list."
				title="Project filters"
			>
				<ScrollView
					contentContainerStyle={styles.filterContent}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
					style={styles.filterScroll}
				>
					<View style={styles.filterSection}>
						<View style={styles.filterSectionHeader}>
							<Label role="field">Search</Label>
							<Label role="helper">Matches project name and description.</Label>
						</View>
						<Input
							onChangeText={value => {
								setDraftFilters(current => ({
									...current,
									query: value,
								}));
							}}
							placeholder="Project name or description"
							value={draftFilters.query}
						/>
					</View>

					<View
						style={[
							styles.filterSection,
							styles.filterDivider,
							{ borderTopColor: spec.panelBorder },
						]}
					>
						<View style={styles.filterSectionHeader}>
							<Label role="field">Availability</Label>
							<Label role="helper">
								Show only projects that still have open spots.
							</Label>
						</View>
						<View style={styles.optionGroup}>
							<Pressable
								onPress={() => {
									setDraftFilters(current => ({
										...current,
										availabilityOnly: !current.availabilityOnly,
									}));
								}}
								style={({ pressed }) => [
									styles.optionChip,
									{
										backgroundColor: draftFilters.availabilityOnly
											? theme.colors.tabBgActive
											: pressed
												? optionPressedBackground
												: selectorBackground,
										borderColor: draftFilters.availabilityOnly
											? withAlpha(theme.colors.brand, 0.18)
											: spec.panelBorder,
									},
								]}
							>
								<Label
									role="caption"
									tone={draftFilters.availabilityOnly ? "brand" : "muted"}
								>
									Only open spots
								</Label>
							</Pressable>
						</View>
					</View>

					{statusOptions.length > 0 ? (
						<View
							style={[
								styles.filterSection,
								styles.filterDivider,
								{ borderTopColor: spec.panelBorder },
							]}
						>
							<View style={styles.filterSectionHeader}>
								<Label role="field">Status</Label>
								<Label role="helper">
									Keep only the lifecycle stages that matter right now.
								</Label>
							</View>
							<View style={styles.optionGroup}>
								{statusOptions.map(option => {
									const isSelected = draftFilters.statuses.includes(
										option.value,
									);

									return (
										<Pressable
											key={option.value}
											onPress={() => {
												toggleStatus(option.value);
											}}
											style={({ pressed }) => [
												styles.optionChip,
												{
													backgroundColor: isSelected
														? theme.colors.tabBgActive
														: pressed
															? optionPressedBackground
															: selectorBackground,
													borderColor: isSelected
														? withAlpha(theme.colors.brand, 0.18)
														: spec.panelBorder,
												},
											]}
										>
											<Label
												role="caption"
												tone={isSelected ? "brand" : "muted"}
											>
												{option.label}
											</Label>
										</Pressable>
									);
								})}
							</View>
						</View>
					) : null}
				</ScrollView>
			</FilterSheetScaffold>
		</OverflowActionSheet>
	);
}
