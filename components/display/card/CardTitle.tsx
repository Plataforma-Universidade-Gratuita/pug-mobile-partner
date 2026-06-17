import React, { useMemo } from "react";

import { Text } from "react-native";

import { useThemeStore } from "@/store";
import type { CardTitleProps } from "@/types/client";

import { createStyles } from "./styles";

export function CardTitle({ children, style, ...props }: CardTitleProps) {
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);

	return (
		<Text
			style={[styles.title, style]}
			{...props}
		>
			{children}
		</Text>
	);
}
