/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import React, { useEffect, useMemo, useState } from "react";

import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { RefreshControl, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as api from "@/api";
import { AppBackButton, BrandScreenHeader } from "@/components";
import { useCurrentFormerStudentStore, useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import { getTabScreenContentBottomPadding } from "@/utils";

import { resolveAttendanceStatusTone } from "../attendances/utils";
import { AttendanceDetailContent } from "./AttendanceDetailContent";
import { AttendanceDetailLoadingSkeleton } from "./AttendanceDetailLoadingSkeleton";
import { AttendanceDetailStateCard } from "./AttendanceDetailStateCard";
import { createStyles } from "./styles";

export function AttendanceDetailScreen() {
	const { t } = useTranslation();
	const insets = useSafeAreaInsets();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);
	const [isManualRefreshing, setIsManualRefreshing] = useState(false);
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
	const contentBottomPadding = getTabScreenContentBottomPadding(
		theme,
		insets.bottom,
	);
	const hasQueryError =
		currentFormerStudentError != null || attendancesQuery.error != null;
	const isInitialLoading =
		attendanceId === null ||
		(!isCurrentFormerStudentLoaded && isCurrentFormerStudentLoading) ||
		(attendancesQuery.isLoading && attendancesQuery.data == null);
	const isRefreshing = isManualRefreshing;

	return (
		<View style={[styles.screen, { backgroundColor: spec.screenBackground }]}>
			<BrandScreenHeader
				title={t("activity.attendanceDetail.title")}
				leftAccessory={<AppBackButton />}
			/>
			<ScrollView
				contentContainerStyle={[
					styles.content,
					{ paddingBottom: contentBottomPadding },
				]}
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={() => {
							void (async () => {
								setIsManualRefreshing(true);
								try {
									const tasks: Promise<unknown>[] = [];
									if (!isCurrentFormerStudentLoaded) {
										tasks.push(loadCurrentFormerStudentContext());
									}
									tasks.push(attendancesQuery.refetch());
									await Promise.all(tasks);
								} finally {
									setIsManualRefreshing(false);
								}
							})();
						}}
						tintColor={theme.colors.brand}
					/>
				}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.shell}>
					{hasQueryError ? (
						<AttendanceDetailStateCard
							badgeLabel={t("activity.states.badge")}
							description={t(
								"activity.attendanceDetail.states.errorDescription",
							)}
							title={t("activity.attendanceDetail.states.errorTitle")}
							tone="danger"
						/>
					) : isInitialLoading ? (
						<AttendanceDetailLoadingSkeleton />
					) : attendance ? (
						<AttendanceDetailContent
							attendance={attendance}
							isLoading={isRefreshing}
							statusTone={resolveAttendanceStatusTone(attendance.status.status)}
							t={t}
						/>
					) : (
						<AttendanceDetailStateCard
							badgeLabel={t("activity.states.badge")}
							description={t(
								"activity.attendanceDetail.states.missingDescription",
							)}
							title={t("activity.attendanceDetail.states.missingTitle")}
							tone="warning"
						/>
					)}
				</View>
			</ScrollView>
		</View>
	);
}
