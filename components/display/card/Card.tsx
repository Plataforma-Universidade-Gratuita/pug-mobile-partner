import React, { useMemo } from "react";

import { View } from "react-native";

import { useThemeStore } from "@/store";
import type { CardProps } from "@/types/client";

import { createStyles } from "./styles";

export function Card({ children, style, ...props }: CardProps) {
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);

	return (
		<View
			style={[styles.root, style]}
			{...props}
		>
			{children}
		</View>
	);
}
