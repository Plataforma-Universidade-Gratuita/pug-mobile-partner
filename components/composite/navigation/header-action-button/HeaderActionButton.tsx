import React, { useMemo } from "react";

import { Pressable } from "react-native";

import { useThemeStore } from "@/stores";
import type { HeaderActionButtonProps } from "@/types/client";
import { withAlpha } from "@/utils";

import { createStyles } from "./styles";

export function HeaderActionButton({
	icon: Icon,
	accessibilityLabel,
	onPress,
	disabled = false,
	style,
}: HeaderActionButtonProps) {
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);
	const backgroundColor = withAlpha(
		theme.colors.brand,
		theme.mode === "dark" ? 0.12 : 0.11,
	);
	const pressedBackgroundColor = withAlpha(
		theme.colors.brand,
		theme.mode === "dark" ? 0.2 : 0.18,
	);
	const borderColor = withAlpha(
		theme.colors.brand,
		theme.mode === "dark" ? 0.18 : 0.2,
	);

	return (
		<Pressable
			accessibilityRole="button"
			accessibilityLabel={accessibilityLabel}
			disabled={disabled}
			onPress={onPress}
			style={({ pressed }) => [
				styles.actionButton,
				{
					backgroundColor: pressed ? pressedBackgroundColor : backgroundColor,
					borderColor: theme.mode === "dark" ? borderColor : "transparent",
					borderRadius: theme.radius.md,
					opacity: disabled ? 0.5 : 1,
				},
				style,
			]}
		>
			<Icon
				color={theme.colors.brand}
				size={18}
				strokeWidth={2.25}
			/>
		</Pressable>
	);
}
