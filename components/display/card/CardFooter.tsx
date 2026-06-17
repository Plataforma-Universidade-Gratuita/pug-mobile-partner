import React, { useMemo } from "react";

import { View } from "react-native";

import { useThemeStore } from "@/store";
import type { CardFooterProps } from "@/types/client";

import { createStyles } from "./styles";

export function CardFooter({ children, style, ...props }: CardFooterProps) {
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);

	return (
		<View
			style={[styles.footer, style]}
			{...props}
		>
			{children}
		</View>
	);
}
