import React from "react";

import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import type { NewAttendanceModalBodyProps } from "@/types/client";

import { NewAttendanceContent } from "./NewAttendanceContent";

export function NewAttendanceModalBody({
	clearServerError,
	durationValue,
	form,
	formFooterError,
	hasEligibleProjects,
	hasQueryError,
	insetBottom,
	isInitialLoading,
	isProjectLocked,
	isRefreshingOptions,
	isSubmitting,
	onSelectProject,
	onSubmit,
	projectOptions,
	selectedProjectId,
	styles,
}: NewAttendanceModalBodyProps) {
	const { t } = useTranslation();

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			style={styles.keyboard}
		>
			<ScrollView
				contentContainerStyle={[styles.content, { paddingBottom: insetBottom }]}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.contentShell}>
					<NewAttendanceContent
						clearServerError={clearServerError}
						durationErrorMessage={
							form.formState.errors.duration?.message ?? null
						}
						durationHelperText={t("attendanceCreate.duration.helper")}
						durationLabel={t("attendanceCreate.duration.label")}
						durationPlaceholder={t("attendanceCreate.duration.placeholder")}
						durationValue={durationValue}
						formFooterError={formFooterError}
						hasEligibleProjects={hasEligibleProjects}
						hasQueryError={hasQueryError}
						isInitialLoading={isInitialLoading}
						isProjectLocked={isProjectLocked}
						isRefreshingOptions={isRefreshingOptions}
						isSubmitting={isSubmitting}
						onChangeDuration={value => {
							form.setValue("duration", value, {
								shouldDirty: true,
								shouldTouch: true,
								shouldValidate: true,
							});
						}}
						onDurationBlur={() => {
							void form.trigger("duration");
						}}
						onSelectProject={onSelectProject}
						onSubmit={onSubmit}
						projectErrorMessage={form.formState.errors.projectId?.message}
						projectOptions={projectOptions}
						selectedProjectId={selectedProjectId}
						stateBadgeLabel={t("attendanceCreate.states.badge")}
						states={{
							emptyDescription: t("attendanceCreate.states.emptyDescription"),
							emptyTitle: t("attendanceCreate.states.emptyTitle"),
							errorDescription: t("attendanceCreate.states.errorDescription"),
							errorTitle: t("attendanceCreate.states.errorTitle"),
							loadingDescription: t(
								"attendanceCreate.states.loadingDescription",
							),
							loadingTitle: t("attendanceCreate.states.loadingTitle"),
						}}
						styles={{
							errorText: styles.errorText,
							field: styles.field,
							formCard: styles.formCard,
							projectOptionCard: styles.projectOptionCard,
							projectOptionList: styles.projectOptionList,
							projectOptionListContainer: styles.projectOptionListContainer,
							section: styles.section,
							sectionHeader: styles.sectionHeader,
						}}
					/>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
