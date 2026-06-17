import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, View } from "react-native";

import { useThemeStore } from "@/store";

import { createStyles } from "./styles";

export function BootstrapScreen() {
	const { t } = useTranslation();
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);

	return (
		<View style={styles.centered}>
			<ActivityIndicator
				size="large"
				color={theme.colors.brand}
			/>
			<Text style={styles.bootText}>{t("mobile.bootstrapping")}</Text>
		</View>
	);
}
