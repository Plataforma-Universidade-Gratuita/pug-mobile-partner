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
	_spec: PrimitiveSurfaceStyleSpec,
) {
	return StyleSheet.create({
		modalScreen: {
			flex: 1,
		},
		modalContent: {
			flex: 1,
			paddingHorizontal: theme.layout.screenPadding,
			paddingTop: theme.space[6],
			paddingBottom: theme.space[5],
			gap: theme.space[5],
		},
		modalContentCompact: {
			gap: theme.space[4],
		},
		modalHeaderRow: {
			flexDirection: "row",
			alignItems: "flex-start",
			gap: theme.space[3],
		},
		modalHeaderCopy: {
			flex: 1,
			gap: theme.space[1],
		},
		modalActionSlot: {
			minWidth: 40,
			alignItems: "flex-end",
		},
		modalBody: {
			flex: 1,
		},
		modalFooter: {
			paddingHorizontal: theme.layout.screenPadding,
			paddingBottom: theme.space[6],
		},
	});
}
