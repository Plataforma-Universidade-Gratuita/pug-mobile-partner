import { StyleSheet } from "react-native";

import type { AppResolvedTheme } from "@/types/client";

export function createStyles(theme: AppResolvedTheme) {
	return StyleSheet.create({
		actionButton: {
			width: 40,
			height: 40,
			alignItems: "center",
			justifyContent: "center",
			borderWidth: 1,
		},
	});
}
