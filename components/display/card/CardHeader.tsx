import React, { useMemo } from "react";

import { View } from "react-native";

import { useThemeStore } from "@/store";
import type { CardHeaderProps } from "@/types/client";

import { createStyles } from "./styles";

export function CardHeader({
	children,
	icon,
	style,
	...props
}: CardHeaderProps) {
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);

	return (
		<View
			style={[styles.header, style]}
			{...props}
		>
			{icon ? <View style={styles.headerIcon}>{icon}</View> : null}
			<View style={styles.headerCopy}>{children}</View>
		</View>
	);
}
