import React, { useMemo } from "react";

import { X } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { useThemeStore } from "@/store";
import type { BadgeProps } from "@/types/client";

import { createStyles, getContainerStyle, getLabelStyle } from "./styles";

export function Badge({
	children,
	onRemove,
	removeLabel = "Remove badge",
	style,
	tone = "neutral",
	variant = "primary",
	...props
}: BadgeProps) {
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);
	const label = typeof children === "string" || typeof children === "number";
	const removeColor =
		getLabelStyle(theme, tone, variant).color ?? theme.colors.text;

	return (
		<View
			style={[styles.root, getContainerStyle(theme, tone, variant), style]}
			{...props}
		>
			{onRemove ? (
				<Pressable
					accessibilityLabel={removeLabel}
					hitSlop={8}
					onPress={onRemove}
					style={({ pressed }) => [
						styles.removeButton,
						pressed ? styles.removeButtonPressed : null,
					]}
				>
					<X
						color={removeColor}
						size={12}
						strokeWidth={2}
					/>
				</Pressable>
			) : null}

			{label ? (
				<Text style={[styles.label, getLabelStyle(theme, tone, variant)]}>
					{children}
				</Text>
			) : (
				children
			)}
		</View>
	);
}
