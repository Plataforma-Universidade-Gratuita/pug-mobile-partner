import React, { useMemo } from "react";

import { Text, View } from "react-native";

import { useThemeStore } from "@/store";
import type { SectionProps } from "@/types/client";

import { createStyles } from "./styles";

export function Section({
	actions,
	children,
	description,
	style,
	title,
	...props
}: SectionProps) {
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);

	return (
		<View
			style={[styles.root, style]}
			{...props}
		>
			{title || description || actions ? (
				<View style={styles.header}>
					<View style={styles.copy}>
						{title ? (
							typeof title === "string" || typeof title === "number" ? (
								<Text style={styles.title}>{title}</Text>
							) : (
								title
							)
						) : null}

						{description ? (
							typeof description === "string" ||
							typeof description === "number" ? (
								<Text style={styles.description}>{description}</Text>
							) : (
								description
							)
						) : null}
					</View>

					{actions ? <View style={styles.actions}>{actions}</View> : null}
				</View>
			) : null}

			{children ? <View style={styles.content}>{children}</View> : null}
		</View>
	);
}
