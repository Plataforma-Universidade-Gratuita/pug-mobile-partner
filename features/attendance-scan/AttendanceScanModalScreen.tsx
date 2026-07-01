import React, { useMemo, useState } from "react";

import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as api from "@/api";
import { HeaderActionButton } from "@/components";
import {
	Badge,
	Button,
	Label,
	LoadingBlock,
	ModalScreenScaffold,
} from "@/components/primitives";
import { resolveAttendanceStatusTone } from "@/features/activity/utils";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { AttendanceComplexSearchItem } from "@/types/api";

import {
	ATTENDANCE_SCAN_LOOKUP_PAGE,
	ATTENDANCE_SCAN_LOOKUP_SIZE,
} from "./constants";
import { createStyles } from "./styles";
import { buildAttendanceScanLookupRequest } from "./utils";

export function AttendanceScanModalScreen() {
	const { t } = useTranslation();
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const [permission, requestPermission] = useCameraPermissions();
	const [isResolving, setIsResolving] = useState(false);
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

	function resetScanState() {
		setResolvedAttendance(null);
		setScanError(null);
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

	const footer = resolvedAttendance ? (
		<View style={styles.footer}>
			<Button
				variant="secondary"
				onPress={resetScanState}
			>
				{t("activity.attendanceScan.actions.scanAnother")}
			</Button>
			<Button
				onPress={() => {
					router.back();
				}}
			>
				{t("activity.attendanceScan.actions.done")}
			</Button>
		</View>
	) : scanError ? (
		<View style={styles.footer}>
			<Button
				variant="secondary"
				onPress={resetScanState}
			>
				{t("activity.attendanceScan.actions.tryAgain")}
			</Button>
			<Button
				onPress={() => {
					router.back();
				}}
			>
				{t("activity.attendanceScan.actions.done")}
			</Button>
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
				leftAccessory={
					<HeaderActionButton
						accessibilityLabel={t("activity.attendanceScan.actions.close")}
						icon={X}
						onPress={() => {
							router.back();
						}}
					/>
				}
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
									<Badge
										tone={resolveAttendanceStatusTone(
											resolvedAttendance.status.status,
										)}
										variant="primary"
									>
										{resolvedAttendance.status.statusFormatted}
									</Badge>
									<Label
										role="title"
										style={styles.title}
									>
										{resolvedAttendance.project.name}
									</Label>
									<Label role="helper">
										{t("activity.attendanceScan.resultHelper")}
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
											{t("activity.attendanceQr.fields.duration")}
										</Label>
										<Label role="field">
											{t("activity.attendance.duration", {
												count: resolvedAttendance.qrValidationInfo.duration,
											})}
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
										barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
										facing="back"
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
										style={styles.camera}
									/>
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
