import React, { useEffect, useMemo, useRef } from "react";

import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as api from "@/api";
import { Button, ModalScreenScaffold } from "@/components/primitives";
import { useLocalizedZodForm, useServerErrorState } from "@/hooks";
import { createNewAttendanceFormSchema } from "@/schemas/client";
import { useCurrentFormerStudentStore, useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ProjectResponse } from "@/types/api";
import type { NewAttendanceFormValues } from "@/types/client";

import { NewAttendanceModalBody } from "./NewAttendanceModalBody";
import { ATTENDANCE_ELIGIBLE_ENROLLMENT_STATUS } from "./constants";
import { createStyles } from "./styles";
import {
	buildNewAttendanceProjectOptions,
	parseAttendanceDuration,
	resolveInitialProjectId,
	resolveNewAttendanceErrorMessageWithFallback,
} from "./utils";

export function NewAttendanceModalScreen() {
	const { t } = useTranslation();
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const { clearServerError, serverError, setServerError } =
		useServerErrorState();
	const params = useLocalSearchParams<{ projectId?: string | string[] }>();
	const requestedProjectId =
		typeof params.projectId === "string" && params.projectId.trim()
			? params.projectId
			: null;
	const currentFormerStudent = useCurrentFormerStudentStore(
		state => state.currentFormerStudent,
	);
	const isCurrentFormerStudentLoading = useCurrentFormerStudentStore(
		state => state.isLoading,
	);
	const isCurrentFormerStudentLoaded = useCurrentFormerStudentStore(
		state => state.isLoaded,
	);
	const currentFormerStudentError = useCurrentFormerStudentStore(
		state => state.error,
	);
	const loadCurrentFormerStudentContext = useCurrentFormerStudentStore(
		state => state.loadCurrentFormerStudentContext,
	);
	const hasTriggeredEnrollmentRefreshRef = useRef(false);
	const enrollmentsQuery = api.project.enrollments.useMyEnrollmentsQuery(
		isCurrentFormerStudentLoaded,
	);
	const createAttendanceMutation =
		api.project.attendances.useCreateAttendanceMutation();
	const form = useLocalizedZodForm<NewAttendanceFormValues>({
		schemaFactory: createNewAttendanceFormSchema,
		defaultValues: {
			projectId: "",
			duration: "",
		},
		mode: "onSubmit",
		reValidateMode: "onChange",
	});
	const selectedProjectId =
		useWatch({
			control: form.control,
			name: "projectId",
			defaultValue: "",
		}) ?? "";
	const durationValue =
		useWatch({
			control: form.control,
			name: "duration",
			defaultValue: "",
		}) ?? "";

	useEffect(() => {
		if (!isCurrentFormerStudentLoaded && !isCurrentFormerStudentLoading) {
			void loadCurrentFormerStudentContext();
		}
	}, [
		isCurrentFormerStudentLoaded,
		isCurrentFormerStudentLoading,
		loadCurrentFormerStudentContext,
	]);

	useEffect(() => {
		if (
			!isCurrentFormerStudentLoaded ||
			hasTriggeredEnrollmentRefreshRef.current
		) {
			return;
		}

		hasTriggeredEnrollmentRefreshRef.current = true;
		void enrollmentsQuery.refetch();
	}, [enrollmentsQuery, isCurrentFormerStudentLoaded]);

	const eligibleProjectIds = useMemo(() => {
		const ids = new Set<string>();
		for (const enrollment of enrollmentsQuery.data ?? []) {
			if (enrollment.status.status === ATTENDANCE_ELIGIBLE_ENROLLMENT_STATUS) {
				ids.add(enrollment.projectId);
			}
		}
		return [...ids];
	}, [enrollmentsQuery.data]);
	const projectsQuery = useQuery({
		queryKey: [
			"project",
			"project",
			"list",
			"attendance-create",
			eligibleProjectIds.join(","),
		] as const,
		queryFn: () => api.project.projects.list(eligibleProjectIds),
		enabled: eligibleProjectIds.length > 0,
	});
	const projectsById = useMemo(() => {
		const map = new Map<string, ProjectResponse>();
		for (const project of projectsQuery.data ?? []) {
			map.set(project.id, project);
		}
		return map;
	}, [projectsQuery.data]);
	const projectOptions = useMemo(
		() =>
			buildNewAttendanceProjectOptions(
				enrollmentsQuery.data ?? [],
				projectsById,
			),
		[enrollmentsQuery.data, projectsById],
	);
	const initialProjectId = useMemo(
		() => resolveInitialProjectId(requestedProjectId, projectOptions),
		[projectOptions, requestedProjectId],
	);
	const isProjectLocked =
		requestedProjectId !== null &&
		initialProjectId !== null &&
		requestedProjectId === initialProjectId;
	const isSubmitting = createAttendanceMutation.isPending;
	const hasQueryError =
		currentFormerStudentError != null ||
		enrollmentsQuery.error != null ||
		projectsQuery.error != null;
	const isInitialLoading =
		!isCurrentFormerStudentLoaded && isCurrentFormerStudentLoading;
	const isRefreshingOptions =
		isCurrentFormerStudentLoaded &&
		(enrollmentsQuery.isFetching ||
			(eligibleProjectIds.length > 0 && projectsQuery.isFetching));
	const hasEligibleProjects = projectOptions.length > 0;
	const selectedProjectOption = projectOptions.find(
		option => option.projectId === selectedProjectId,
	);
	const isSubmitDisabled =
		isSubmitting ||
		!selectedProjectId.trim() ||
		!durationValue.trim() ||
		selectedProjectOption == null;

	useEffect(() => {
		if (initialProjectId && selectedProjectId !== initialProjectId) {
			form.setValue("projectId", initialProjectId, {
				shouldDirty: false,
				shouldTouch: false,
				shouldValidate: true,
			});
			return;
		}

		if (
			selectedProjectId &&
			!projectOptions.some(option => option.projectId === selectedProjectId)
		) {
			form.setValue("projectId", initialProjectId ?? "", {
				shouldDirty: false,
				shouldTouch: false,
				shouldValidate: true,
			});
		}
	}, [form, initialProjectId, projectOptions, selectedProjectId]);

	async function onSubmit(values: NewAttendanceFormValues) {
		clearServerError();

		if (!currentFormerStudent) {
			setServerError(t("attendanceCreate.errors.missingFormerStudent"));
			return;
		}

		const selectedOption = projectOptions.find(
			option => option.projectId === values.projectId,
		);

		if (!selectedOption) {
			setServerError(t("attendanceCreate.errors.projectRequired"));
			return;
		}

		try {
			const created = await createAttendanceMutation.mutateAsync({
				body: {
					projectId: selectedOption.projectId,
					formerStudentId: currentFormerStudent.accountId,
					duration: parseAttendanceDuration(values.duration),
				},
			});

			router.replace(`/attendance/qr/${created.id}`);
		} catch (error) {
			setServerError(
				resolveNewAttendanceErrorMessageWithFallback(
					error,
					t("attendanceCreate.errors.fallback"),
				),
			);
		}
	}

	return (
		<View style={[styles.screen, { backgroundColor: spec.screenBackground }]}>
			<ModalScreenScaffold
				title={t("attendanceCreate.title")}
				subtitle={t("attendanceCreate.subtitle")}
				footer={
					hasQueryError ||
					isInitialLoading ||
					isRefreshingOptions ||
					!hasEligibleProjects ? null : (
						<Button
							disabled={isSubmitDisabled}
							loading={isSubmitting}
							onPress={() => {
								void form.handleSubmit(onSubmit)();
							}}
							style={styles.footerButton}
						>
							{t("attendanceCreate.actions.submit")}
						</Button>
					)
				}
			>
				<NewAttendanceModalBody
					clearServerError={clearServerError}
					durationValue={durationValue}
					form={form}
					formFooterError={serverError}
					hasEligibleProjects={hasEligibleProjects}
					hasQueryError={hasQueryError}
					insetBottom={Math.max(insets.bottom, theme.space[4])}
					isInitialLoading={isInitialLoading}
					isProjectLocked={isProjectLocked}
					isRefreshingOptions={isRefreshingOptions}
					isSubmitting={isSubmitting}
					onSelectProject={projectId => {
						form.setValue("projectId", projectId, {
							shouldDirty: true,
							shouldTouch: true,
							shouldValidate: true,
						});
					}}
					onSubmit={() => {
						void form.handleSubmit(onSubmit)();
					}}
					projectOptions={projectOptions}
					selectedProjectId={selectedProjectId}
					styles={{
						content: styles.content,
						contentShell: styles.contentShell,
						errorText: styles.errorText,
						field: styles.field,
						formCard: styles.formCard,
						keyboard: styles.keyboard,
						projectOptionCard: styles.projectOptionCard,
						projectOptionList: styles.projectOptionList,
						projectOptionListContainer: styles.projectOptionListContainer,
						section: styles.section,
						sectionHeader: styles.sectionHeader,
					}}
				/>
			</ModalScreenScaffold>
		</View>
	);
}
