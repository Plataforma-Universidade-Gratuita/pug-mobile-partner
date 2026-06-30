import React, { useEffect, useMemo, useRef } from "react";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { View, useColorScheme } from "react-native";

import { useAuthStore, useLocaleStore, useThemeStore } from "@/stores";
import { coerceResolvedTheme, getStatusBarStyle } from "@/utils";

import { BootstrapScreen } from "./BootstrapScreen";
import { createStyles } from "./styles";

export function RootNavigator() {
	const bootstrapSession = useAuthStore(state => state.bootstrapSession);
	const isBootstrapping = useAuthStore(state => state.isBootstrapping);
	const theme = useThemeStore(state => state.theme);
	const isThemeHydrated = useThemeStore(state => state.isHydrated);
	const resolvedMode = useThemeStore(state => state.resolvedMode);
	const hydrateTheme = useThemeStore(state => state.hydrateTheme);
	const setSystemMode = useThemeStore(state => state.setSystemMode);
	const isLanguageHydrated = useLocaleStore(state => state.isHydrated);
	const hydrateLanguage = useLocaleStore(state => state.hydrateLanguage);
	const systemColorScheme = useColorScheme();
	const styles = useMemo(() => createStyles(theme), [theme]);
	const hasBootstrappedAuth = useRef(false);
	const hasHydratedTheme = useRef(false);
	const hasHydratedLanguage = useRef(false);

	useEffect(() => {
		if (hasHydratedTheme.current) {
			return;
		}

		hasHydratedTheme.current = true;
		void hydrateTheme();
	}, [hydrateTheme]);

	useEffect(() => {
		if (hasHydratedLanguage.current) {
			return;
		}

		hasHydratedLanguage.current = true;
		void hydrateLanguage();
	}, [hydrateLanguage]);

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

	const isAppBootstrapping =
		isBootstrapping || !isThemeHydrated || !isLanguageHydrated;

	return (
		<>
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
				<Stack.Screen name="(public)" />
				<Stack.Screen name="(protected)" />
			</Stack>

			{isAppBootstrapping ? (
				<View style={styles.bootstrapOverlay}>
					<BootstrapScreen />
				</View>
			) : null}
		</>
	);
}
