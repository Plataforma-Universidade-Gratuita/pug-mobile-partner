import React from "react";

import { View } from "react-native";

import { Input, Label } from "@/components/primitives";
import type { NewAttendanceContentProps } from "@/types/client";

import { NewAttendanceProjectSection } from "./NewAttendanceProjectSection";
import { NewAttendanceStateCard } from "./NewAttendanceStateCard";

export function NewAttendanceContent({
	clearServerError,
	durationErrorMessage,
	durationHelperText,
	durationLabel,
	durationPlaceholder,
	durationValue,
	formFooterError,
	hasEligibleProjects,
	hasQueryError,
	isInitialLoading,
	isProjectLocked,
	isRefreshingOptions,
	isSubmitting,
	onChangeDuration,
	onDurationBlur,
	onSelectProject,
	onSubmit,
	projectErrorMessage,
	projectOptions,
	selectedProjectId,
	stateBadgeLabel,
	states,
	styles,
}: NewAttendanceContentProps) {
	if (hasQueryError) {
		return (
			<NewAttendanceStateCard
				badgeLabel={stateBadgeLabel}
				description={states.errorDescription}
				title={states.errorTitle}
				tone="danger"
			/>
		);
	}

	if (isInitialLoading) {
		return (
			<NewAttendanceStateCard
				badgeLabel={stateBadgeLabel}
				description={states.loadingDescription}
				title={states.loadingTitle}
				tone="neutral"
			/>
		);
	}

	if (!hasEligibleProjects && !isRefreshingOptions) {
		return (
			<NewAttendanceStateCard
				badgeLabel={stateBadgeLabel}
				description={states.emptyDescription}
				title={states.emptyTitle}
				tone="warning"
			/>
		);
	}

	return (
		<View style={styles.formCard}>
			<View style={styles.field}>
				<Label role="field">{durationLabel}</Label>
				<Input
					disabled={isSubmitting}
					error={durationErrorMessage}
					helperText={durationHelperText}
					onBlur={onDurationBlur}
					onChangeText={value => {
						onChangeDuration(value);
						clearServerError();
					}}
					onSubmitEditing={onSubmit}
					placeholder={durationPlaceholder}
					returnKeyType="done"
					type="text"
					value={durationValue}
				/>
			</View>
			<NewAttendanceProjectSection
				clearServerError={clearServerError}
				errorMessage={projectErrorMessage}
				isProjectLocked={isProjectLocked}
				isRefreshingOptions={isRefreshingOptions}
				isSubmitting={isSubmitting}
				onSelectProject={onSelectProject}
				options={projectOptions}
				selectedProjectId={selectedProjectId}
				styles={{
					errorText: styles.errorText,
					projectOptionList: styles.projectOptionList,
					projectOptionCard: styles.projectOptionCard,
					projectOptionListContainer: styles.projectOptionListContainer,
					section: styles.section,
					sectionHeader: styles.sectionHeader,
				}}
			/>
			{formFooterError ? (
				<Label
					role="helper"
					style={styles.errorText}
				>
					{formFooterError}
				</Label>
			) : null}
		</View>
	);
}
