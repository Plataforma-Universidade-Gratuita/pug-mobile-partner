/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import React, { useMemo, useRef, useState } from "react";

import { CameraView, useCameraPermissions } from "expo-camera";
import { RefreshCcw, RotateCcw } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as api from "@/api";
import { ApiError } from "@/api/errors";
import {
	Badge,
	Button,
	Label,
	LoadingBlock,
	ModalScreenScaffold,
} from "@/components/primitives";
import { resolveAttendanceStatusTone } from "@/features/attendances/utils";
import { useCurrentStaffStore, useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type {
	AttendanceComplexSearchItem,
	AttendanceStatus,
} from "@/types/api";
import { withAlpha } from "@/utils";

import {
	ATTENDANCE_SCAN_LOOKUP_PAGE,
	ATTENDANCE_SCAN_LOOKUP_SIZE,
} from "./constants";
import { createStyles } from "./styles";
import { buildAttendanceScanLookupRequest } from "./utils";

export function AttendanceScanModalScreen() {
	const { t } = useTranslation();
	const insets = useSafeAreaInsets();
	const theme = useThemeStore(state => state.theme);
	const currentAccount = useCurrentStaffStore(state => state.currentAccount);
	const currentUser = useCurrentStaffStore(state => state.currentUser);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const validateAttendanceMutation =
		api.project.attendances.useValidateAttendanceMutation();
	const [permission, requestPermission] = useCameraPermissions();
	const cameraRef = useRef<CameraView | null>(null);
	const [cameraFacing, setCameraFacing] = useState<"back" | "front">("back");
	const [availableLenses, setAvailableLenses] = useState<string[]>([]);
	const [selectedLens, setSelectedLens] = useState<string | null>(
		"builtInWideAngleCamera",
	);
	const [isResolving, setIsResolving] = useState(false);
	const [validationError, setValidationError] = useState<string | null>(null);
	const [pendingValidationStatus, setPendingValidationStatus] =
		useState<AttendanceStatus | null>(null);
	const [resolvedAttendance, setResolvedAttendance] =
		useState<AttendanceComplexSearchItem | null>(null);
	const [scanError, setScanError] = useState<string | null>(null);
	const attendanceLookupRequest = useMemo(
		() => buildAttendanceScanLookupRequest(),
		[],
	);

	async function resolveAttendanceFromQrHash(qrValidationHash: string) {
		if (isResolving || resolvedAttendance) {
			return;
		}

		setIsResolving(true);
		setScanError(null);

		try {
			const response = await api.project.attendances.search(
				{
					page: ATTENDANCE_SCAN_LOOKUP_PAGE,
					size: ATTENDANCE_SCAN_LOOKUP_SIZE,
				},
				attendanceLookupRequest,
			);
			const matchedAttendance =
				response.content.find(
					item => item.qrValidationInfo.qrValidationHash === qrValidationHash,
				) ?? null;

			if (!matchedAttendance) {
				setScanError(t("activity.attendanceScan.states.notFoundDescription"));
				return;
			}

			setResolvedAttendance(matchedAttendance);
		} catch {
			setScanError(t("activity.attendanceScan.states.errorDescription"));
		} finally {
			setIsResolving(false);
		}
	}

	async function validateAttendance(status: AttendanceStatus) {
		if (!resolvedAttendance || validateAttendanceMutation.isPending) {
			return;
		}

		setValidationError(null);
		setPendingValidationStatus(status);

		try {
			const validatedAttendance = await validateAttendanceMutation.mutateAsync({
				id: resolvedAttendance.id,
				body: {
					status,
					qrValidationHash:
						resolvedAttendance.qrValidationInfo.qrValidationHash,
				},
			});

			setResolvedAttendance(currentAttendance =>
				currentAttendance
					? {
							...currentAttendance,
							status: validatedAttendance.status,
							attendanceInfo: {
								...currentAttendance.attendanceInfo,
								...validatedAttendance.attendanceInfo,
							},
							validator:
								currentUser?.name && currentAccount?.email
									? {
											id: currentAccount.id,
											name: currentUser.name,
											email: currentAccount.email,
										}
									: currentAttendance.validator,
						}
					: currentAttendance,
			);
		} catch (error) {
			setValidationError(
				error instanceof ApiError
					? error.message
					: t("activity.attendanceScan.states.errorDescription"),
			);
		} finally {
			setPendingValidationStatus(null);
		}
	}

	async function handleCameraReady() {
		const availableLenses = await cameraRef.current?.getAvailableLensesAsync();

		if (availableLenses && availableLenses.length > 0) {
			const nextLenses = [...availableLenses].sort((left, right) =>
				left.localeCompare(right),
			);

			setAvailableLenses(nextLenses);
			setSelectedLens(currentLens =>
				currentLens && nextLenses.includes(currentLens)
					? currentLens
					: (nextLenses[0] ?? null),
			);
		}
	}

	function handleAvailableLensesChanged(lenses: string[]) {
		const nextLenses = [...lenses].sort((left, right) =>
			left.localeCompare(right),
		);

		setAvailableLenses(nextLenses);
		setSelectedLens(currentLens =>
			currentLens && nextLenses.includes(currentLens)
				? currentLens
				: (nextLenses[0] ?? null),
		);
	}

	function cycleCameraLens() {
		if (availableLenses.length <= 1) {
			return;
		}

		setSelectedLens(currentLens => {
			const currentIndex = currentLens
				? availableLenses.indexOf(currentLens)
				: -1;
			const nextIndex =
				currentIndex >= 0 ? (currentIndex + 1) % availableLenses.length : 0;

			return availableLenses[nextIndex] ?? currentLens;
		});
	}

	function toggleCameraFacing() {
		setCameraFacing(currentFacing =>
			currentFacing === "back" ? "front" : "back",
		);
	}

	function renderStateCard(
		tone: "danger" | "neutral" | "warning",
		title: string,
		description: string,
	) {
		return (
			<View style={styles.stateCard}>
				<Badge
					style={styles.stateBadge}
					tone={tone}
					variant="primary"
				>
					{t("activity.attendanceScan.badge")}
				</Badge>
				<View style={styles.stateBody}>
					<Label role="field">{title}</Label>
					<Label role="helper">{description}</Label>
				</View>
			</View>
		);
	}

	const canMarkPresent =
		resolvedAttendance?.status.status === "WAITING" ||
		resolvedAttendance?.status.status === "ABSENT";
	const canMarkAbsent =
		resolvedAttendance?.status.status === "WAITING" ||
		resolvedAttendance?.status.status === "PRESENT";
	const footer = resolvedAttendance ? (
		<View style={styles.footer}>
			{validationError ? (
				<Label
					role="helper"
					tone="danger"
				>
					{validationError}
				</Label>
			) : null}
			<View style={styles.footerActions}>
				{canMarkAbsent ? (
					<Button
						variant="secondary"
						loading={pendingValidationStatus === "ABSENT"}
						onPress={() => {
							void validateAttendance("ABSENT");
						}}
					>
						Mark absent
					</Button>
				) : null}
				{canMarkPresent ? (
					<Button
						loading={pendingValidationStatus === "PRESENT"}
						onPress={() => {
							void validateAttendance("PRESENT");
						}}
					>
						Mark present
					</Button>
				) : null}
			</View>
		</View>
	) : !permission?.granted ? (
		<View style={styles.footer}>
			<Button
				loading={permission == null}
				onPress={() => {
					void requestPermission();
				}}
			>
				{t("activity.attendanceScan.actions.allowCamera")}
			</Button>
		</View>
	) : null;

	return (
		<View style={[styles.screen, { backgroundColor: spec.screenBackground }]}>
			<ModalScreenScaffold
				title={t("activity.attendanceScan.title")}
				subtitle={t("activity.attendanceScan.subtitle")}
				footer={footer}
			>
				<ScrollView
					contentContainerStyle={[
						styles.content,
						{ paddingBottom: Math.max(insets.bottom, theme.space[4]) },
					]}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.shell}>
						{resolvedAttendance ? (
							<View style={styles.resultCard}>
								<View style={styles.headerBlock}>
									<View style={styles.headerMetaRow}>
										<Badge
											style={styles.headerBadge}
											tone={resolveAttendanceStatusTone(
												resolvedAttendance.status.status,
											)}
											variant="primary"
										>
											{resolvedAttendance.status.statusFormatted}
										</Badge>
										<Badge
											style={styles.headerBadgeRight}
											tone="info"
											variant="secondary"
										>
											{t("activity.attendance.duration", {
												count: resolvedAttendance.qrValidationInfo.duration,
											})}
										</Badge>
									</View>
									<Label
										role="title"
										style={styles.title}
									>
										{resolvedAttendance.project.name}
									</Label>
								</View>
								<View style={styles.rowGroup}>
									<View style={styles.row}>
										<Label role="helper">
											{t("activity.attendanceDetail.fields.formerStudent")}
										</Label>
										<Label role="field">
											{resolvedAttendance.student.account.name}
										</Label>
									</View>
									<View style={styles.row}>
										<Label role="helper">
											{t("activity.attendanceDetail.fields.registration")}
										</Label>
										<Label role="field">
											{resolvedAttendance.student.academicRegistration}
										</Label>
									</View>
									<View style={styles.row}>
										<Label role="helper">
											{t("activity.attendanceDetail.metrics.createdAt")}
										</Label>
										<Label role="field">
											{
												resolvedAttendance.attendanceInfo.auditInfo
													.createdAtFormatted
											}
										</Label>
									</View>
									<View style={styles.row}>
										<Label role="helper">
											{t("activity.attendanceDetail.metrics.validatedAt")}
										</Label>
										<Label role="field">
											{resolvedAttendance.attendanceInfo.validatedAtFormatted ||
												t("activity.attendance.waiting")}
										</Label>
									</View>
									<View style={styles.row}>
										<Label role="helper">
											{t("activity.attendanceDetail.metrics.validator")}
										</Label>
										<Label role="field">
											{resolvedAttendance.validator?.name ||
												t("activity.attendanceDetail.values.notValidated")}
										</Label>
									</View>
								</View>
							</View>
						) : scanError ? (
							renderStateCard(
								"warning",
								t("activity.attendanceScan.states.notFoundTitle"),
								scanError,
							)
						) : !permission ? (
							renderStateCard(
								"neutral",
								t("activity.attendanceScan.states.permissionLoadingTitle"),
								t(
									"activity.attendanceScan.states.permissionLoadingDescription",
								),
							)
						) : !permission.granted ? (
							renderStateCard(
								"warning",
								t("activity.attendanceScan.states.permissionDeniedTitle"),
								t("activity.attendanceScan.states.permissionDeniedDescription"),
							)
						) : (
							<View style={styles.cameraCard}>
								<View style={styles.cameraFrame}>
									<CameraView
										ref={cameraRef}
										barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
										facing={cameraFacing}
										onAvailableLensesChanged={event => {
											handleAvailableLensesChanged(event.lenses);
										}}
										onBarcodeScanned={
											isResolving
												? undefined
												: event => {
														const qrValidationHash = event.data.trim();
														if (!qrValidationHash) {
															return;
														}

														void resolveAttendanceFromQrHash(qrValidationHash);
													}
										}
										onCameraReady={() => {
											void handleCameraReady();
										}}
										selectedLens={selectedLens ?? undefined}
										style={styles.camera}
									/>
									<View style={styles.cameraControls}>
										<Pressable
											accessibilityLabel="Cycle camera lens"
											disabled={availableLenses.length <= 1}
											onPress={cycleCameraLens}
											style={({ pressed }) => [
												styles.cameraControlButton,
												{
													backgroundColor: pressed
														? withAlpha(theme.colors.surface1, 0.92)
														: withAlpha(theme.colors.surface1, 0.84),
													borderColor: withAlpha(theme.colors.surface2, 0.28),
													opacity: availableLenses.length <= 1 ? 0.56 : 1,
												},
											]}
										>
											<RefreshCcw
												color={theme.colors.text}
												size={18}
											/>
										</Pressable>
										<Pressable
											accessibilityLabel="Switch front or back camera"
											onPress={toggleCameraFacing}
											style={({ pressed }) => [
												styles.cameraControlButton,
												{
													backgroundColor: pressed
														? withAlpha(theme.colors.surface1, 0.92)
														: withAlpha(theme.colors.surface1, 0.84),
													borderColor: withAlpha(theme.colors.surface2, 0.28),
												},
											]}
										>
											<RotateCcw
												color={theme.colors.text}
												size={18}
											/>
										</Pressable>
									</View>
								</View>
								<View style={styles.cameraCopy}>
									<Label role="field">
										{t("activity.attendanceScan.scanTitle")}
									</Label>
									<Label role="helper">
										{t("activity.attendanceScan.scanHelper")}
									</Label>
								</View>
								{isResolving ? (
									<LoadingBlock
										height={theme.form.controlHeight}
										radius={theme.form.controlRadius}
										width="100%"
									/>
								) : null}
							</View>
						)}
					</View>
				</ScrollView>
			</ModalScreenScaffold>
		</View>
	);
}
