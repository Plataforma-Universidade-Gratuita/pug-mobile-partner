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
		sheetHeader: {
			gap: theme.space[1],
		},
		sheetFooter: {
			marginTop: theme.space[2],
		},
	});
}
