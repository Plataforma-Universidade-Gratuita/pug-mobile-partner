import React, { useEffect, useMemo } from "react";

import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppBackButton, BrandScreenHeader } from "@/components";
import { useCurrentFormerStudentStore, useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";

import {
	AcademicCounterpartCard,
	AcademicDetailsStateCard,
	AcademicPeriodCard,
	AcademicRecordCard,
} from "./academic-details-sections";
import { createStyles } from "./styles";
import { resolveAcademicFieldValue, resolveAcademicNumberValue } from "./utils";

export function AcademicDetailsScreen() {
	const { t } = useTranslation();
	const insets = useSafeAreaInsets();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const currentFormerStudent = useCurrentFormerStudentStore(
		state => state.currentFormerStudent,
	);
	const currentCourse = useCurrentFormerStudentStore(
		state => state.currentCourse,
	);
	const currentFormerStudentError = useCurrentFormerStudentStore(
		state => state.error,
	);
	const isLoading = useCurrentFormerStudentStore(state => state.isLoading);
	const isLoaded = useCurrentFormerStudentStore(state => state.isLoaded);
	const loadCurrentFormerStudentContext = useCurrentFormerStudentStore(
		state => state.loadCurrentFormerStudentContext,
	);

	useEffect(() => {
		if (!isLoaded && !isLoading) {
			void loadCurrentFormerStudentContext();
		}
	}, [isLoaded, isLoading, loadCurrentFormerStudentContext]);

	const contentBottomPadding =
		theme.space[8] + theme.space[2] + Math.max(insets.bottom, theme.space[4]);
	const loadingLabel = t("profile.values.loading");
	const unavailableLabel = t("profile.values.unavailable");
	const hasError = currentFormerStudentError !== null;
	const isInitialLoading = !isLoaded && isLoading;

	const academicRegistrationValue = resolveAcademicFieldValue(
		currentFormerStudent?.academicRegistration,
		isLoading,
		loadingLabel,
		unavailableLabel,
	);
	const campusValue = resolveAcademicFieldValue(
		currentFormerStudent?.campus.campusFormatted,
		isLoading,
		loadingLabel,
		unavailableLabel,
	);
	const courseValue = resolveAcademicFieldValue(
		currentCourse?.name,
		isLoading,
		loadingLabel,
		unavailableLabel,
	);
	const areaOfExpertiseValue = resolveAcademicFieldValue(
		currentCourse?.areaOfExpertise.name,
		isLoading,
		loadingLabel,
		unavailableLabel,
	);
	const requiredHoursValue = resolveAcademicNumberValue(
		currentFormerStudent?.counterpartHours.requiredHours,
		isLoading,
		loadingLabel,
		unavailableLabel,
	);
	const completedHoursValue = resolveAcademicNumberValue(
		currentFormerStudent?.counterpartHours.completedHours,
		isLoading,
		loadingLabel,
		unavailableLabel,
	);
	const missingHoursValue = resolveAcademicNumberValue(
		currentFormerStudent?.counterpartHours.missingHours,
		isLoading,
		loadingLabel,
		unavailableLabel,
	);
	const progressRatio = Math.max(
		0,
		Math.min((currentFormerStudent?.counterpartHours.progress ?? 0) / 100, 1),
	);
	const progressValueLabel = t("academicDetails.progressValue", {
		value: Math.round(currentFormerStudent?.counterpartHours.progress ?? 0),
	});
	const startDateValue = resolveAcademicFieldValue(
		currentFormerStudent?.period.startDateFormatted,
		isLoading,
		loadingLabel,
		unavailableLabel,
	);
	const dueDateValue = resolveAcademicFieldValue(
		currentFormerStudent?.period.dueDateFormatted,
		isLoading,
		loadingLabel,
		unavailableLabel,
	);
	const remainingDaysValue = resolveAcademicFieldValue(
		currentFormerStudent?.period.remainingDaysFormatted,
		isLoading,
		loadingLabel,
		unavailableLabel,
	);

	return (
		<View style={[styles.screen, { backgroundColor: spec.screenBackground }]}>
			<BrandScreenHeader
				leftAccessory={<AppBackButton />}
				title={t("academicDetails.title")}
			/>
			<ScrollView
				contentContainerStyle={[
					styles.content,
					{ paddingBottom: contentBottomPadding },
				]}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.shell}>
					{hasError ? (
						<AcademicDetailsStateCard
							badgeLabel={t("academicDetails.state.badge")}
							description={t("academicDetails.state.errorDescription")}
							title={t("academicDetails.state.errorTitle")}
							tone="danger"
						/>
					) : isInitialLoading ? (
						<AcademicDetailsStateCard
							badgeLabel={t("academicDetails.state.badge")}
							description={t("academicDetails.state.loadingDescription")}
							title={t("academicDetails.state.loadingTitle")}
							tone="neutral"
						/>
					) : currentFormerStudent ? (
						<>
							<AcademicCounterpartCard
								completedHoursLabel={t("academicDetails.fields.completedHours")}
								completedHoursValue={completedHoursValue}
								isConcluded={currentFormerStudent.counterpartHours.concluded}
								missingHoursLabel={t("academicDetails.fields.missingHours")}
								missingHoursValue={missingHoursValue}
								progressTitle={t("academicDetails.fields.progress")}
								progressRatio={progressRatio}
								progressValueLabel={progressValueLabel}
								requiredHoursLabel={t("academicDetails.fields.requiredHours")}
								requiredHoursValue={requiredHoursValue}
								sectionTitle={t("academicDetails.sections.counterpart")}
								statusLabel={
									currentFormerStudent.counterpartHours.concluded
										? t("academicDetails.status.concluded")
										: t("academicDetails.status.inProgress")
								}
							/>
							<AcademicPeriodCard
								dueDateLabel={t("academicDetails.fields.dueDate")}
								dueDateValue={dueDateValue}
								remainingDaysLabel={t("academicDetails.fields.remainingDays")}
								remainingDaysValue={remainingDaysValue}
								sectionTitle={t("academicDetails.sections.period")}
								startDateLabel={t("academicDetails.fields.startDate")}
								startDateValue={startDateValue}
							/>
							<AcademicRecordCard
								academicRegistrationLabel={t(
									"profile.fields.academicRegistration",
								)}
								academicRegistrationValue={academicRegistrationValue}
								areaOfExpertiseLabel={t("profile.fields.areaOfExpertise")}
								areaOfExpertiseValue={areaOfExpertiseValue}
								campusLabel={t("academicDetails.fields.campus")}
								campusValue={campusValue}
								courseLabel={t("profile.fields.course")}
								courseValue={courseValue}
								sectionTitle={t("academicDetails.sections.record")}
							/>
						</>
					) : (
						<AcademicDetailsStateCard
							badgeLabel={t("academicDetails.state.badge")}
							description={t("academicDetails.state.emptyDescription")}
							title={t("academicDetails.state.emptyTitle")}
							tone="warning"
						/>
					)}
				</View>
			</ScrollView>
		</View>
	);
}
