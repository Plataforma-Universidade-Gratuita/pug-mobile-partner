/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { BrandScreenHeader, Button } from "@/components";
import { Label } from "@/components/primitives";
import { useFeedbackStore, useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";

import { createStyles } from "./styles";

export function HomeScreen() {
	const { t } = useTranslation();
	const theme = useThemeStore(state => state.theme);
	const showSuccess = useFeedbackStore(state => state.showSuccess);
	const showDanger = useFeedbackStore(state => state.showDanger);
	const showWarning = useFeedbackStore(state => state.showWarning);
	const showInfo = useFeedbackStore(state => state.showInfo);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<View style={[styles.screen, { backgroundColor: spec.screenBackground }]}>
			<BrandScreenHeader title={t("home.title")} />
			<View style={styles.content}>
				<View style={styles.shell}>
					{/* Temporary snackbar test controls. Remove after mobile feedback styling is approved. */}
					<View style={styles.panel}>
						<View style={styles.copyBlock}>
							<Label
								role="field"
								style={styles.title}
							>
								{t("home.snackbarTests.title")}
							</Label>
							<Label role="helper">{t("home.snackbarTests.description")}</Label>
						</View>
						<View style={styles.actions}>
							<Button
								onPress={() => {
									showSuccess(t("home.snackbarTests.success.title"), {
										description: t("home.snackbarTests.success.description"),
									});
								}}
							>
								{t("home.snackbarTests.actions.success")}
							</Button>
							<Button
								onPress={() => {
									showDanger(t("home.snackbarTests.danger.title"), {
										description: t("home.snackbarTests.danger.description"),
									});
								}}
							>
								{t("home.snackbarTests.actions.danger")}
							</Button>
							<Button
								onPress={() => {
									showWarning(t("home.snackbarTests.warning.title"), {
										description: t("home.snackbarTests.warning.description"),
									});
								}}
							>
								{t("home.snackbarTests.actions.warning")}
							</Button>
							<Button
								onPress={() => {
									showInfo(t("home.snackbarTests.info.title"), {
										description: t("home.snackbarTests.info.description"),
									});
								}}
							>
								{t("home.snackbarTests.actions.info")}
							</Button>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}
