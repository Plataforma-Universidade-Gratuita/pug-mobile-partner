import React, { useEffect, useMemo } from "react";

import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as api from "@/api";
import { AppBackButton } from "@/components";
import { Button, ModalScreenScaffold } from "@/components/primitives";
import { useLocalizedZodForm, useServerErrorState } from "@/hooks";
import { createNewAttendanceFormSchema } from "@/schemas/client";
import { useCurrentFormerStudentStore, useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { ProjectResponse } from "@/types/api";
import type { NewAttendanceFormValues } from "@/types/client";

import { NewAttendanceContent } from "./NewAttendanceContent";
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

	useEffect(() => {
		if (!isCurrentFormerStudentLoaded && !isCurrentFormerStudentLoading) {
			void loadCurrentFormerStudentContext();
		}
	}, [
		isCurrentFormerStudentLoaded,
		isCurrentFormerStudentLoading,
		loadCurrentFormerStudentContext,
	]);

	const eligibleProjectIds = useMemo(() => {
		const ids = new Set<string>();
		for (const enrollment of enrollmentsQuery.data ?? []) {
			if (enrollment.status.status === "APPROVED") {
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
	const selectedProjectId = form.watch("projectId");
	const isSubmitting = createAttendanceMutation.isPending;
	const hasQueryError =
		currentFormerStudentError != null ||
		enrollmentsQuery.error != null ||
		projectsQuery.error != null;
	const isInitialLoading =
		(!isCurrentFormerStudentLoaded && isCurrentFormerStudentLoading) ||
		enrollmentsQuery.isLoading ||
		(eligibleProjectIds.length > 0 && projectsQuery.isLoading);
	const hasEligibleProjects = projectOptions.length > 0;

	useEffect(() => {
		if (!initialProjectId) {
			return;
		}

		if (form.getValues("projectId") !== initialProjectId) {
			form.setValue("projectId", initialProjectId, {
				shouldDirty: false,
				shouldTouch: false,
				shouldValidate: true,
			});
		}
	}, [form, initialProjectId]);

	async function onSubmit(values: NewAttendanceFormValues) {
		clearServerError();

		if (!currentFormerStudent) {
			setServerError(t("attendanceCreate.errors.missingFormerStudent"));
			return;
		}

		try {
			const created = await createAttendanceMutation.mutateAsync({
				body: {
					projectId: values.projectId,
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
				leftAccessory={<AppBackButton />}
				footer={
					hasQueryError || isInitialLoading || !hasEligibleProjects ? null : (
						<Button
							disabled={isSubmitting}
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
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : undefined}
					style={styles.keyboard}
				>
					<ScrollView
						contentContainerStyle={[
							styles.content,
							{ paddingBottom: Math.max(insets.bottom, theme.space[4]) },
						]}
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
								durationValue={form.watch("duration")}
								formFooterError={serverError}
								hasEligibleProjects={hasEligibleProjects}
								hasQueryError={hasQueryError}
								isInitialLoading={isInitialLoading}
								isProjectLocked={isProjectLocked}
								isSubmitting={isSubmitting}
								onChangeDuration={value => {
									form.setValue("duration", value, {
										shouldDirty: true,
										shouldTouch: true,
										shouldValidate: true,
									});
								}}
								onDurationBlur={() => {
									form.trigger("duration");
								}}
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
								projectErrorMessage={form.formState.errors.projectId?.message}
								projectOptions={projectOptions}
								selectedProjectId={selectedProjectId}
								stateBadgeLabel={t("attendanceCreate.states.badge")}
								states={{
									emptyDescription: t(
										"attendanceCreate.states.emptyDescription",
									),
									emptyTitle: t("attendanceCreate.states.emptyTitle"),
									errorDescription: t(
										"attendanceCreate.states.errorDescription",
									),
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
									projectOptionList: styles.projectOptionList,
									section: styles.section,
									sectionHeader: styles.sectionHeader,
								}}
							/>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</ModalScreenScaffold>
		</View>
	);
}
