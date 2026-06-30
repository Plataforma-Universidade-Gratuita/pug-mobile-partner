import React, { useMemo } from "react";

import { Chip } from "react-native-paper";

import { useThemeStore } from "@/stores";
import { createPrimitiveFormStyleSpec } from "@/styles";
import type { PrimitiveBadgeProps } from "@/types/client";

import { styles } from "./styles";
import { resolveBadgeColors, resolveBadgeMode } from "./utils";

export function Badge({
	children,
	tone = "brand",
	variant = "primary",
	style,
}: PrimitiveBadgeProps) {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveFormStyleSpec(theme), [theme]);

	const colors = useMemo(
		() => resolveBadgeColors(tone, variant, theme, spec),
		[spec, theme, tone, variant],
	);

	return (
		<Chip
			mode={resolveBadgeMode(variant)}
			compact
			style={[
				styles.base,
				{
					backgroundColor: colors.backgroundColor,
					borderColor: colors.borderColor,
					borderRadius: theme.radius.circle,
				},
				style,
			]}
			textStyle={[
				styles.text,
				{
					color: colors.textColor,
					fontFamily: theme.font.sans,
					fontSize: theme.type.xs,
					fontWeight: theme.weight.semibold,
				},
			]}
		>
			{children}
		</Chip>
	);
}
