import React, { useEffect, useMemo } from "react";

import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as api from "@/api";
import {
	Badge,
	Button,
	Label,
	ModalScreenScaffold,
} from "@/components/primitives";
import { useCurrentFormerStudentStore, useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";

import { createStyles } from "./styles";
import { buildQrMatrix } from "./utils";

export function AttendanceQrModalScreen() {
	const { t } = useTranslation();
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const { width: windowWidth } = useWindowDimensions();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const params = useLocalSearchParams<{ id?: string | string[] }>();
	const attendanceId =
		typeof params.id === "string" && params.id.trim() ? params.id : null;
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
	const attendancesQuery =
		api.project.attendances.useAttendancesByFormerStudentQuery(
			currentFormerStudent?.accountId ?? null,
		);

	useEffect(() => {
		if (!isCurrentFormerStudentLoaded && !isCurrentFormerStudentLoading) {
			void loadCurrentFormerStudentContext();
		}
	}, [
		isCurrentFormerStudentLoaded,
		isCurrentFormerStudentLoading,
		loadCurrentFormerStudentContext,
	]);

	const attendance = useMemo(
		() =>
			(attendancesQuery.data ?? []).find(item => item.id === attendanceId) ??
			null,
		[attendanceId, attendancesQuery.data],
	);
	const qrMatrix = useMemo(
		() =>
			attendance?.qrValidationInfo.qrValidationHash
				? buildQrMatrix(attendance.qrValidationInfo.qrValidationHash)
				: null,
		[attendance?.qrValidationInfo.qrValidationHash],
	);
	const qrSize = Math.min(
		windowWidth - theme.layout.screenPadding * 2 - theme.space[8],
		280,
	);
	const cellSize = qrMatrix
		? Math.max(4, Math.floor(qrSize / qrMatrix.length))
		: 0;
	const qrRenderSize = qrMatrix ? cellSize * qrMatrix.length : 0;
	const hasQueryError =
		currentFormerStudentError != null || attendancesQuery.error != null;
	const isInitialLoading =
		attendanceId === null ||
		(!isCurrentFormerStudentLoaded && isCurrentFormerStudentLoading) ||
		attendancesQuery.isLoading;

	function renderStateCard(options: {
		badgeTone: "danger" | "neutral" | "warning";
		title: string;
		description: string;
	}) {
		return (
			<View
				style={[
					styles.stateCard,
					{
						backgroundColor: spec.panelBackground,
						borderColor: spec.panelBorder,
					},
				]}
			>
				<Badge
					style={styles.stateBadge}
					tone={options.badgeTone}
					variant="primary"
				>
					{t("activity.states.badge")}
				</Badge>
				<View style={styles.stateBody}>
					<Label role="field">{options.title}</Label>
					<Label role="helper">{options.description}</Label>
				</View>
			</View>
		);
	}

	return (
		<View style={[styles.screen, { backgroundColor: spec.screenBackground }]}>
			<ModalScreenScaffold
				title={t("activity.attendanceQr.title")}
				subtitle={t("activity.attendanceQr.subtitle")}
				subtitleNumberOfLines={1}
				compactHeader
				actionSlotMinWidth={0}
				footer={
					<View style={styles.footerContent}>
						<Button
							onPress={() => {
								router.back();
							}}
							style={styles.footerButton}
						>
							{t("activity.attendanceQr.actions.done")}
						</Button>
					</View>
				}
			>
				<ScrollView
					contentContainerStyle={[
						styles.content,
						{ paddingBottom: Math.max(insets.bottom, theme.space[4]) },
					]}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.shell}>
						{hasQueryError ? (
							renderStateCard({
								badgeTone: "danger",
								title: t("activity.attendanceQr.states.errorTitle"),
								description: t("activity.attendanceQr.states.errorDescription"),
							})
						) : isInitialLoading ? (
							renderStateCard({
								badgeTone: "neutral",
								title: t("activity.attendanceQr.states.loadingTitle"),
								description: t(
									"activity.attendanceQr.states.loadingDescription",
								),
							})
						) : attendance && qrMatrix ? (
							<View
								style={[
									styles.qrCard,
									{
										backgroundColor: spec.panelBackground,
										borderColor: spec.panelBorder,
									},
								]}
							>
								<View style={styles.heroCopy}>
									<Label
										role="title"
										style={styles.heroTitle}
									>
										{attendance.project.name}
									</Label>
									<Label role="helper">
										{t("activity.attendanceQr.helper")}
									</Label>
								</View>

								<View style={styles.qrFrame}>
									<View
										style={[
											styles.qrRows,
											{ width: qrRenderSize, height: qrRenderSize },
										]}
									>
										{qrMatrix.map((row, rowIndex) => (
											<View
												key={rowIndex}
												style={styles.qrRow}
											>
												{row.map((isDark, columnIndex) => (
													<View
														key={columnIndex}
														style={[
															styles.qrCell,
															{
																width: cellSize,
																height: cellSize,
																backgroundColor: isDark ? "#000000" : "#FFFFFF",
															},
														]}
													/>
												))}
											</View>
										))}
									</View>
								</View>
							</View>
						) : (
							renderStateCard({
								badgeTone: "warning",
								title: t("activity.attendanceQr.states.missingTitle"),
								description: t(
									"activity.attendanceQr.states.missingDescription",
								),
							})
						)}
					</View>
				</ScrollView>
			</ModalScreenScaffold>
		</View>
	);
}
