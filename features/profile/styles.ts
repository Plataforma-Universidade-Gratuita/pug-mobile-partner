/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { StyleSheet } from "react-native";

import type { AppResolvedTheme } from "@/types/client";
import { withAlpha } from "@/utils";

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		screen: {
			flex: 1,
		},
		content: {
			paddingHorizontal: theme.layout.screenPadding,
			paddingTop: theme.space[3],
			paddingBottom: theme.space[5],
			alignItems: "center",
		},
		shell: {
			width: "100%",
			maxWidth: theme.layout.contentMaxWidth,
			gap: theme.space[5],
		},
		sheetContent: {
			gap: theme.space[5],
		},
		sheetHeader: {
			gap: theme.space[1],
		},
		sheetCaption: {
			color: theme.colors.muted,
		},
		sheetTitle: {
			color: theme.colors.text,
		},
		sheetSubtitle: {
			color: theme.colors.muted,
		},
		sheetOptions: {
			gap: theme.space[2],
		},
		logoutOption: {
			gap: theme.space[2],
			minHeight: 88,
			justifyContent: "center",
			paddingHorizontal: theme.space[4],
			paddingVertical: theme.space[4],
			borderWidth: 1,
			borderRadius: theme.radius.xl,
		},
		logoutOptionCopy: {
			flex: 1,
			gap: theme.space[1],
		},
		logoutOptionTitle: {
			color: theme.colors.text,
		},
		logoutWarningTitle: {
			color: theme.colors.warningSoftText,
		},
		logoutDangerTitle: {
			color: theme.colors.danger,
		},
		logoutOptionHelper: {
			color: theme.colors.muted,
		},
		logoutWarningHelper: {
			color: theme.colors.warningSoftText,
		},
		logoutDangerHelper: {
			color: withAlpha(
				theme.colors.danger,
				theme.mode === "dark" ? 0.92 : 0.88,
			),
		},
	});
}
