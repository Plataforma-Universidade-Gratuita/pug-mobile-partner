/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { StyleSheet } from "react-native";

import type {
	AppResolvedTheme,
	PrimitiveSurfaceStyleSpec,
} from "@/types/client";

export function createStyles(
	theme: AppResolvedTheme,
	spec: PrimitiveSurfaceStyleSpec,
) {
	return StyleSheet.create({
		screen: { flex: 1 },
		content: {
			alignItems: "center",
			paddingBottom: theme.space[5],
			paddingHorizontal: theme.layout.screenPadding,
			paddingTop: theme.space[3],
		},
		shell: {
			gap: theme.space[4],
			maxWidth: theme.layout.contentMaxWidth,
			width: "100%",
		},
		projectSection: {
			gap: theme.space[3],
		},
		projectHeader: {
			alignItems: "flex-start",
			gap: theme.space[3],
		},
		projectTitleCopy: {
			flex: 1,
			gap: theme.space[1],
		},
		title: {
			color: theme.colors.text,
			flex: 1,
		},
		progressBlock: { gap: theme.space[2] },
		progressTrack: {
			backgroundColor: theme.colors.surface3,
			borderRadius: theme.radius.circle,
			height: 10,
			overflow: "hidden",
			borderWidth: 1,
			borderColor: spec.panelBorder,
		},
		progressFill: {
			backgroundColor: theme.colors.brand,
			borderRadius: theme.radius.circle,
			height: "100%",
		},
		sectionTitle: { color: theme.colors.text },
		attendanceSection: { gap: theme.space[3] },
		sectionHeader: { gap: theme.space[1] },
		attendanceSkeletonCard: {
			flexDirection: "row",
			alignItems: "flex-start",
			justifyContent: "space-between",
			gap: theme.space[3],
			paddingVertical: theme.space[2],
		},
		attendanceSkeletonCopy: {
			flex: 1,
			gap: theme.space[2],
		},
	});
}
