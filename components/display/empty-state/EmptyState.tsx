import React, { useMemo } from "react";

import { Text, View } from "react-native";

import { useThemeStore } from "@/store";
import type { EmptyStateProps } from "@/types/client";

import { createStyles } from "./styles";

export function EmptyState({
	actions,
	children,
	description,
	icon,
	style,
	title,
	...props
}: EmptyStateProps) {
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);

	return (
		<View
			style={[styles.root, style]}
			{...props}
		>
			{icon ? <View style={styles.iconShell}>{icon}</View> : null}

			<View style={styles.copy}>
				{typeof title === "string" || typeof title === "number" ? (
					<Text style={styles.title}>{title}</Text>
				) : (
					title
				)}

				{description ? (
					typeof description === "string" || typeof description === "number" ? (
						<Text style={styles.description}>{description}</Text>
					) : (
						description
					)
				) : null}
			</View>

			{children ? <View style={styles.content}>{children}</View> : null}
			{actions ? <View style={styles.actions}>{actions}</View> : null}
		</View>
	);
}
