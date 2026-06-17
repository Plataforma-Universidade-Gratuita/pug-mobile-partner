import React, { useMemo } from "react";

import { Text } from "react-native";

import { useThemeStore } from "@/store";
import type { LabelProps } from "@/types/client";

import { createStyles } from "./styles";

export function Label({ children, style, ...props }: LabelProps) {
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);

	return (
		<Text
			style={[styles.label, style]}
			{...props}
		>
			{children}
		</Text>
	);
}
