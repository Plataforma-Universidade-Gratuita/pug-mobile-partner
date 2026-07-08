import React, { useMemo } from "react";

import { View } from "react-native";

import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { FilterSheetScaffoldProps } from "@/types/client";

import { Label } from "../../forms";
import { createStyles } from "./styles";

export function FilterSheetScaffold({
	title,
	subtitle,
	children,
	footer,
}: FilterSheetScaffoldProps) {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<View>
			<View style={styles.sheetHeader}>
				<Label role="field">{title}</Label>
				{subtitle ? <Label role="helper">{subtitle}</Label> : null}
			</View>

			{children}

			{footer ? <View style={styles.sheetFooter}>{footer}</View> : null}
		</View>
	);
}
