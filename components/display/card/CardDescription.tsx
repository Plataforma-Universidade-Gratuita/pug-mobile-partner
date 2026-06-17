import React, { useMemo } from "react";

import { Text } from "react-native";

import { useThemeStore } from "@/store";
import type { CardDescriptionProps } from "@/types/client";

import { createStyles } from "./styles";

export function CardDescription({
	children,
	style,
	...props
}: CardDescriptionProps) {
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);

	return (
		<Text
			style={[styles.description, style]}
			{...props}
		>
			{children}
		</Text>
	);
}
