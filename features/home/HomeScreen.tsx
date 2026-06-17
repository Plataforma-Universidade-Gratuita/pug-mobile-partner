import React, { useMemo } from "react";

import { Redirect } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components";
import {
	DEV_LANGUAGE_OPTION_LABEL_KEYS,
	DEV_THEME_OPTION_LABEL_KEYS,
} from "@/constants/dev-controls";
import { SUPPORTED_LANGS } from "@/constants/locale";
import { APP_THEMES } from "@/constants/theme";
import { useAuthStore, useThemeStore } from "@/store";
import { coerceLang } from "@/utils/lang";
import { applyClientLanguage } from "@/utils/locale";

import { createStyles } from "./styles";

export function HomeScreen() {
	const { i18n, t } = useTranslation();
	const theme = useThemeStore(state => state.theme);
	const themeMode = useThemeStore(state => state.mode);
	const setThemeMode = useThemeStore(state => state.setMode);
	const isAuthenticated = useAuthStore(state => state.isAuthenticated);
	const isBootstrapping = useAuthStore(state => state.isBootstrapping);
	const isMutatingSession = useAuthStore(state => state.isMutatingSession);
	const sessionPayload = useAuthStore(state => state.sessionPayload);
	const signOut = useAuthStore(state => state.signOut);
	const styles = useMemo(() => createStyles(theme), [theme]);
	const currentLang = coerceLang(i18n.resolvedLanguage ?? i18n.language);

	if (isBootstrapping) {
		return null;
	}

	if (!isAuthenticated || !sessionPayload) {
		return <Redirect href="/login" />;
	}

	return (
		<View style={styles.container}>
			<Card style={styles.card}>
				<CardHeader>
					<CardTitle>{t("mobile.home.title")}</CardTitle>
					<CardDescription>{t("mobile.home.description")}</CardDescription>
				</CardHeader>

				<CardContent style={styles.content}>
					<View style={styles.devControls}>
						<View style={styles.controlGroup}>
							<Text style={styles.controlLabel}>
								{t("mobile.dev.theme.label")}
							</Text>
							<View style={styles.controlOptions}>
								{APP_THEMES.map(option => (
									<Button
										key={option}
										onPress={() => void setThemeMode(option)}
										size="sm"
										usage="primary"
										variant={themeMode === option ? "primary" : "secondary"}
									>
										{t(DEV_THEME_OPTION_LABEL_KEYS[option])}
									</Button>
								))}
							</View>
						</View>

						<View style={styles.controlGroup}>
							<Text style={styles.controlLabel}>
								{t("mobile.dev.language.label")}
							</Text>
							<View style={styles.controlOptions}>
								{SUPPORTED_LANGS.map(option => (
									<Button
										key={option}
										onPress={() => applyClientLanguage(option, i18n)}
										size="sm"
										usage="primary"
										variant={currentLang === option ? "primary" : "secondary"}
									>
										{t(DEV_LANGUAGE_OPTION_LABEL_KEYS[option])}
									</Button>
								))}
							</View>
						</View>
					</View>

					<View style={styles.detailList}>
						<View style={styles.detailItem}>
							<Text style={styles.detailLabel}>
								{t("mobile.home.fields.email")}
							</Text>
							<Text style={styles.detailValue}>{sessionPayload.upn}</Text>
						</View>

						<View style={styles.detailItem}>
							<Text style={styles.detailLabel}>
								{t("mobile.home.fields.accountId")}
							</Text>
							<Text style={styles.detailValue}>{sessionPayload.accountId}</Text>
						</View>

						<View style={styles.detailItem}>
							<Text style={styles.detailLabel}>
								{t("mobile.home.fields.userId")}
							</Text>
							<Text style={styles.detailValue}>{sessionPayload.userId}</Text>
						</View>

						<View style={styles.detailItem}>
							<Text style={styles.detailLabel}>
								{t("mobile.home.fields.groups")}
							</Text>
							<Text style={styles.detailValue}>
								{sessionPayload.groups.join(", ")}
							</Text>
						</View>
					</View>
				</CardContent>

				<CardFooter>
					<Button
						disabled={isMutatingSession}
						isLoading={isMutatingSession}
						onPress={() => void signOut()}
						usage="danger"
					>
						{t("Navbar.account.logout")}
					</Button>
				</CardFooter>
			</Card>
		</View>
	);
}
