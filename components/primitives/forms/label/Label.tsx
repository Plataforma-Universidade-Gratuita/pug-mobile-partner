
import React, { useMemo } from "react";

import { Text as PaperText } from "react-native-paper";

import { useThemeStore } from "@/stores";
import { createPrimitiveFormStyleSpec } from "@/styles";
import type { PrimitiveLabelProps } from "@/types/client";

import { styles } from "./styles";
import {
	resolveLabelColor,
	resolveLabelRoleStyle,
	resolveLabelVariant,
} from "./utils";

export function Label({
	children,
	role = "field",
	tone = "default",
	align = "left",
	numberOfLines,
	style,
}: PrimitiveLabelProps) {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveFormStyleSpec(theme), [theme]);

	const color = useMemo(
		() => resolveLabelColor(role, tone, theme, spec),
		[role, tone, theme, spec],
	);

	const roleStyle = useMemo(
		() => resolveLabelRoleStyle(role, theme, spec),
		[role, theme, spec],
	);

	return (
		<PaperText
			variant={resolveLabelVariant(role)}
			numberOfLines={numberOfLines}
			style={[
				styles.base,
				{
					color,
					textAlign: align,
				},
				roleStyle,
				style,
			]}
		>
			{children}
		</PaperText>
	);
}
