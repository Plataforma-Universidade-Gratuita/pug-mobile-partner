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
import type { ActivityFilterSheetProps, ActivityFilters } from "@/types/client";
import { withAlpha } from "@/utils";

import { createDefaultActivityFilters } from "../utils";
import { createStyles } from "./styles";

export function ActivityFilterSheet({
	visible,
	activeTab,
	filters,
	statusOptions,
	onApply,
	onDismiss,
}: ActivityFilterSheetProps) {
	const { t } = useTranslation();
	const { height: windowHeight } = useWindowDimensions();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const [draftFilters, setDraftFilters] = useState<ActivityFilters>(filters);
	const selectorBackground = withAlpha(
		theme.colors.surface2,
		theme.mode === "dark" ? 0.42 : 0.72,
	);
	const optionPressedBackground = withAlpha(theme.colors.brand, 0.14);
	const sheetBodyMaxHeight = Math.min(windowHeight * 0.48, 360);
	const activeStatuses =
		activeTab === "enrollments"
			? draftFilters.enrollmentStatuses
			: draftFilters.attendanceStatuses;

	useEffect(() => {
		if (visible) {
			setDraftFilters(filters);
		}
	}, [filters, visible]);

	function toggleStatus(status: string) {
		setDraftFilters(current => {
			if (activeTab === "enrollments") {
				const nextStatuses = current.enrollmentStatuses.includes(
					status as never,
				)
					? current.enrollmentStatuses.filter(
							currentStatus => currentStatus !== status,
						)
					: [...current.enrollmentStatuses, status as never];

				return {
					...current,
					enrollmentStatuses: nextStatuses,
				};
			}

			const nextStatuses = current.attendanceStatuses.includes(status as never)
				? current.attendanceStatuses.filter(
						currentStatus => currentStatus !== status,
					)
				: [...current.attendanceStatuses, status as never];

			return {
				...current,
				attendanceStatuses: nextStatuses,
			};
		});
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
								const nextFilters = createDefaultActivityFilters();
								setDraftFilters(nextFilters);
								onApply(nextFilters);
							}}
							style={styles.footerAction}
							variant="secondary"
						>
							{t("activity.filters.clear")}
						</Button>
						<Button
							fullWidth={false}
							onPress={() => {
								onApply({
									query: draftFilters.query.trim(),
									enrollmentStatuses: draftFilters.enrollmentStatuses,
									attendanceStatuses: draftFilters.attendanceStatuses,
								});
							}}
							style={styles.footerAction}
						>
							{t("activity.filters.apply")}
						</Button>
					</View>
				}
				subtitle={t("activity.filters.subtitle")}
				title={t("activity.filters.title")}
			>
				<ScrollView
					contentContainerStyle={styles.content}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
					style={[styles.scroll, { maxHeight: sheetBodyMaxHeight }]}
				>
					<View style={styles.section}>
						<View style={styles.sectionHeader}>
							<Label role="field">{t("activity.filters.searchLabel")}</Label>
							<Label role="helper">{t("activity.filters.searchHelper")}</Label>
						</View>
						<Input
							onChangeText={value => {
								setDraftFilters(current => ({
									...current,
									query: value,
								}));
							}}
							placeholder={t("activity.filters.searchPlaceholder")}
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
									{t("activity.filters.statusesLabel")}
								</Label>
								<Label role="helper">
									{t("activity.filters.statusesHelper")}
								</Label>
							</View>
							<View style={styles.optionGroup}>
								{statusOptions.map(option => {
									const isSelected = activeStatuses.includes(
										option.value as never,
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
