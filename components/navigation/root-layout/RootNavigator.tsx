import React, { useEffect, useMemo, useRef } from "react";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { View, useColorScheme } from "react-native";

import { useAuthStore, useThemeStore } from "@/store";
import { coerceResolvedTheme, getStatusBarStyle } from "@/utils/theme-value";

import { BootstrapScreen } from "./BootstrapScreen";
import { createStyles } from "./styles";

export function RootNavigator() {
	const bootstrapSession = useAuthStore(state => state.bootstrapSession);
	const isBootstrapping = useAuthStore(state => state.isBootstrapping);
	const theme = useThemeStore(state => state.theme);
	const resolvedMode = useThemeStore(state => state.resolvedMode);
	const hydrateTheme = useThemeStore(state => state.hydrateTheme);
	const setSystemMode = useThemeStore(state => state.setSystemMode);
	const systemColorScheme = useColorScheme();
	const styles = useMemo(() => createStyles(theme), [theme]);
	const hasBootstrappedAuth = useRef(false);
	const hasHydratedTheme = useRef(false);

	useEffect(() => {
		if (hasHydratedTheme.current) {
			return;
		}

		hasHydratedTheme.current = true;
		void hydrateTheme();
	}, [hydrateTheme]);

	useEffect(() => {
		setSystemMode(coerceResolvedTheme(systemColorScheme));
	}, [setSystemMode, systemColorScheme]);

	useEffect(() => {
		if (hasBootstrappedAuth.current) {
			return;
		}

		hasBootstrappedAuth.current = true;
		void bootstrapSession();
	}, [bootstrapSession]);

	useEffect(() => {
		void SystemUI.setBackgroundColorAsync(theme.colors.surface1).catch(
			() => undefined,
		);
	}, [theme.colors.surface1]);

	return (
		<View style={styles.container}>
			<StatusBar
				backgroundColor={theme.colors.surface1}
				style={getStatusBarStyle(resolvedMode)}
			/>

			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: theme.colors.surface1 },
				}}
			>
				<Stack.Screen name="index" />
				<Stack.Screen name="login" />
			</Stack>

			{isBootstrapping ? (
				<View style={styles.bootstrapOverlay}>
					<BootstrapScreen />
				</View>
			) : null}
		</View>
	);
}
