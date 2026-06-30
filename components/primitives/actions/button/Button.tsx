import React, { useMemo } from "react";

import { Button as PaperButton } from "react-native-paper";

import { useThemeStore } from "@/stores";
import { createPrimitiveFormStyleSpec } from "@/styles";
import type { PrimitiveButtonProps } from "@/types/client";

import { styles } from "./styles";
import { resolveButtonColors, resolveButtonMode } from "./utils";

export function Button({
	children,
	variant = "primary",
	disabled = false,
	loading = false,
	fullWidth = true,
	onPress,
	style,
	labelStyle,
}: PrimitiveButtonProps) {
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveFormStyleSpec(theme), [theme]);
	const colors = useMemo(
		() => resolveButtonColors(variant, theme, spec),
		[spec, theme, variant],
	);
	const actionProps = onPress ? { onPress } : {};

	return (
		<PaperButton
			mode={resolveButtonMode(variant)}
			disabled={disabled}
			loading={loading}
			buttonColor={colors.buttonColor}
			textColor={colors.textColor}
			contentStyle={styles.content}
			{...actionProps}
			style={[
				styles.base,
				fullWidth ? styles.fullWidth : null,
				{
					borderColor: colors.borderColor,
					borderRadius: theme.form.controlRadius,
				},
				style,
			]}
			labelStyle={[
				styles.label,
				{
					fontFamily: theme.font.sans,
					fontSize: theme.type.md,
					fontWeight: theme.weight.semibold,
				},
				labelStyle,
			]}
		>
			{children}
		</PaperButton>
	);
}
