import React, { useMemo } from "react";

import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { useThemeStore } from "@/store";
import type { ButtonProps } from "@/types/client";

import {
	createStyles,
	getButtonPalette,
	getContainerStyle,
	getLabelStyle,
	getSizeStyle,
} from "./styles";
import { getAccessibleText } from "./utils";

export function Button({
	accessibilityLabel,
	children,
	disabled,
	isLoading = false,
	leadingIcon,
	loadingText,
	size = "md",
	style,
	trailingIcon,
	title,
	usage,
	variant = "primary",
	...props
}: ButtonProps) {
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);
	const resolvedUsage =
		usage ??
		(variant === "secondary" ? "secondary" : "primary");
	const label = isLoading && loadingText ? loadingText : children;
	const labelText =
		typeof label === "string"
			? label
			: typeof title === "string"
				? title
				: getAccessibleText(children);
	const palette = getButtonPalette(theme, resolvedUsage);
	const isSolidVariant = variant === "primary";
	const isDisabled = disabled || isLoading;

	return (
		<Pressable
			accessibilityLabel={accessibilityLabel ?? title ?? labelText}
			accessibilityRole="button"
			disabled={isDisabled}
			style={state => [
				styles.base,
				getSizeStyle(theme, size),
				getContainerStyle(theme, palette, variant, state.pressed),
				size === "icon" ? styles.iconShape : null,
				isDisabled ? styles.disabled : null,
				typeof style === "function" ? style(state) : style,
			]}
			{...props}
		>
			{isLoading ? (
				<ActivityIndicator
					color={isSolidVariant ? palette.contrast : palette.accent}
					size="small"
				/>
			) : leadingIcon ? (
				<View style={styles.iconSlot}>{leadingIcon}</View>
			) : null}

			{label ? (
				<Text
					style={[styles.label, getLabelStyle(theme, palette, variant, size)]}
				>
					{label}
				</Text>
			) : null}

			{!isLoading && trailingIcon ? (
				<View style={styles.iconSlot}>{trailingIcon}</View>
			) : null}
		</Pressable>
	);
}
