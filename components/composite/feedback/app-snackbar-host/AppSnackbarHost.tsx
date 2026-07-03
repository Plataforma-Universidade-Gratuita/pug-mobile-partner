import React, { useMemo } from "react";

import { Text, View } from "react-native";
import { Snackbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useFeedbackStore, useThemeStore } from "@/stores";

import { createStyles } from "./styles";
import { resolveFeedbackAccentColor, resolveFeedbackIcon } from "./utils";

const FEEDBACK_SNACKBAR_DURATION = 4000;

export function AppSnackbarHost() {
	const insets = useSafeAreaInsets();
	const theme = useThemeStore(state => state.theme);
	const current = useFeedbackStore(state => state.current);
	const dismissFeedback = useFeedbackStore(state => state.dismissFeedback);
	const styles = useMemo(() => createStyles(theme), [theme]);
	const accentColor = current
		? resolveFeedbackAccentColor(current.tone, theme.colors)
		: theme.colors.info;
	const action =
		current?.actionLabel && current.onAction
			? {
					label: current.actionLabel,
					onPress: current.onAction,
				}
			: null;

	return (
		<Snackbar
			{...(action ? { action } : {})}
			duration={FEEDBACK_SNACKBAR_DURATION}
			onDismiss={dismissFeedback}
			style={[styles.snackbar, { borderColor: accentColor }]}
			visible={current !== null}
			wrapperStyle={[
				styles.wrapper,
				{ bottom: insets.bottom + theme.space[4] },
			]}
		>
			{current ? (
				<View style={styles.message}>
					<Text style={[styles.title, { color: accentColor }]}>
						{resolveFeedbackIcon(current.tone)}
					</Text>
					<View style={styles.content}>
						<Text style={styles.title}>{current.title}</Text>
						{current.description ? (
							<Text style={styles.description}>{current.description}</Text>
						) : null}
					</View>
				</View>
			) : null}
		</Snackbar>
	);
}
