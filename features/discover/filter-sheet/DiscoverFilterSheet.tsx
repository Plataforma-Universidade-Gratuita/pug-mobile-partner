import React, { useEffect, useMemo, useState } from "react";

import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, View, useWindowDimensions } from "react-native";

import {
	Button,
	FilterSheetScaffold,
	Input,
	Label,
	OverflowActionSheet,
} from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { DiscoverFilterSheetProps, DiscoverFilters } from "@/types/client";
import { withAlpha } from "@/utils";

import { createDefaultDiscoverFilters } from "../utils";
import { createStyles } from "./styles";

export function DiscoverFilterSheet({
	visible,
	filters,
	entityOptions,
	statusOptions,
	onApply,
	onDismiss,
}: DiscoverFilterSheetProps) {
	const { t } = useTranslation();
	const { height: windowHeight } = useWindowDimensions();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const [draftFilters, setDraftFilters] = useState<DiscoverFilters>(filters);
	const selectorBackground = withAlpha(
		theme.colors.surface2,
		theme.mode === "dark" ? 0.42 : 0.72,
	);
	const optionPressedBackground = withAlpha(theme.colors.brand, 0.14);
	const sheetBodyMaxHeight = Math.min(windowHeight * 0.52, 420);

	useEffect(() => {
		if (visible) {
			setDraftFilters(filters);
		}
	}, [filters, visible]);

	function toggleEntityId(entityId: string) {
		setDraftFilters(current => ({
			...current,
			entityIds: current.entityIds.includes(entityId)
				? current.entityIds.filter(currentId => currentId !== entityId)
				: [...current.entityIds, entityId],
		}));
	}

	function toggleStatus(status: DiscoverFilters["statuses"][number]) {
		setDraftFilters(current => ({
			...current,
			statuses: current.statuses.includes(status)
				? current.statuses.filter(currentStatus => currentStatus !== status)
				: [...current.statuses, status],
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
								const nextFilters = createDefaultDiscoverFilters();
								setDraftFilters(nextFilters);
								onApply(nextFilters);
							}}
							style={styles.footerAction}
							variant="secondary"
						>
							{t("discover.filters.clear")}
						</Button>
						<Button
							fullWidth={false}
							onPress={() => {
								onApply({
									query: draftFilters.query.trim(),
									entityIds: draftFilters.entityIds,
									statuses: draftFilters.statuses,
								});
							}}
							style={styles.footerAction}
						>
							{t("discover.filters.apply")}
						</Button>
					</View>
				}
				subtitle={t("discover.filters.subtitle")}
				title={t("discover.filters.title")}
			>
				<ScrollView
					contentContainerStyle={styles.content}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
					style={[styles.scroll, { maxHeight: sheetBodyMaxHeight }]}
				>
					<View style={styles.section}>
						<View style={styles.sectionHeader}>
							<Label role="field">{t("discover.filters.searchLabel")}</Label>
							<Label role="helper">{t("discover.filters.searchHelper")}</Label>
						</View>
						<Input
							onChangeText={value => {
								setDraftFilters(current => ({
									...current,
									query: value,
								}));
							}}
							placeholder={t("discover.filters.searchPlaceholder")}
							value={draftFilters.query}
						/>
					</View>

					{statusOptions.length > 0 ? (
						<View
							style={[
								styles.section,
								styles.sectionDivider,
								{ borderTopColor: spec.panelBorder },
							]}
						>
							<View style={styles.sectionHeader}>
								<Label role="field">
									{t("discover.filters.statusesLabel")}
								</Label>
								<Label role="helper">
									{t("discover.filters.statusesHelper")}
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

					{entityOptions.length > 0 ? (
						<View
							style={[
								styles.section,
								styles.sectionDivider,
								{ borderTopColor: spec.panelBorder },
							]}
						>
							<View style={styles.sectionHeader}>
								<Label role="field">
									{t("discover.filters.entitiesLabel")}
								</Label>
								<Label role="helper">
									{t("discover.filters.entitiesHelper")}
								</Label>
							</View>
							<View style={styles.optionGroup}>
								{entityOptions.map(option => {
									const isSelected = draftFilters.entityIds.includes(option.id);

									return (
										<Pressable
											key={option.id}
											onPress={() => {
												toggleEntityId(option.id);
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
