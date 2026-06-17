import React, { useMemo } from "react";

import { View } from "react-native";

import { useThemeStore } from "@/store";
import type { CardContentProps } from "@/types/client";

import { createStyles } from "./styles";

export function CardContent({ children, style, ...props }: CardContentProps) {
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);

	return (
		<View
			style={[styles.content, style]}
			{...props}
		>
			{children}
		</View>
	);
}
