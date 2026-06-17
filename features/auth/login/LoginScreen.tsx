import React, { useMemo, useState } from "react";

import { Redirect } from "expo-router";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";

import { Button, Card, CardContent, Input } from "@/components";
import {
	DEV_LANGUAGE_OPTION_LABEL_KEYS,
	DEV_THEME_OPTION_LABEL_KEYS,
} from "@/constants/dev-controls";
import { SUPPORTED_LANGS } from "@/constants/locale";
import { APP_THEMES } from "@/constants/theme";
import { useLocalizedZodForm } from "@/hooks";
import { createLoginFormSchema } from "@/schemas/client";
import { useAuthStore, useThemeStore } from "@/store";
import { getApiErrorMessage } from "@/utils/api-errors";
import { coerceLang } from "@/utils/lang";
import { applyClientLanguage } from "@/utils/locale";

import { createStyles } from "./styles";

export function LoginScreen() {
	const { i18n, t } = useTranslation();
	const theme = useThemeStore(state => state.theme);
	const themeMode = useThemeStore(state => state.mode);
	const setThemeMode = useThemeStore(state => state.setMode);
	const isAuthenticated = useAuthStore(state => state.isAuthenticated);
	const isBootstrapping = useAuthStore(state => state.isBootstrapping);
	const isMutatingSession = useAuthStore(state => state.isMutatingSession);
	const signIn = useAuthStore(state => state.signIn);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const styles = useMemo(() => createStyles(theme), [theme]);
	const currentLang = coerceLang(i18n.resolvedLanguage ?? i18n.language);

	const form = useLocalizedZodForm({
		schemaFactory: createLoginFormSchema,
		defaultValues: {
			email: "",
			password: "",
		},
	});

	if (isBootstrapping) {
		return null;
	}

	if (isAuthenticated) {
		return <Redirect href="/" />;
	}

	const onSubmit = form.handleSubmit(async values => {
		setSubmitError(null);

		try {
			await signIn(values);
		} catch (error) {
			setSubmitError(
				getApiErrorMessage(error) ?? t("auth.login.feedback.error"),
			);
		}
	});

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			style={styles.container}
		>
			<Card style={styles.card}>
				<CardContent style={styles.cardContent}>
					<View>
						<Text style={styles.brand}>{t("auth.login.brand.name")}</Text>
						<Text style={styles.subtitle}>
							{t("auth.login.brand.subtitle")}
						</Text>
					</View>

					<View style={styles.header}>
						<Text style={styles.title}>{t("auth.login.form.title")}</Text>
						<Text style={styles.description}>
							{t("auth.login.form.description")}
						</Text>
					</View>

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

					<View style={styles.form}>
						<Controller
							control={form.control}
							name="email"
							render={({ field: { onBlur, onChange, value } }) => (
								<View style={styles.field}>
									<Text style={styles.label}>
										{t("auth.login.form.fields.email.label")}
									</Text>
									<Input
										autoCapitalize="none"
										autoComplete="email"
										error={Boolean(form.formState.errors.email)}
										keyboardType="email-address"
										onBlur={onBlur}
										onChangeText={onChange}
										placeholder={t("auth.login.form.fields.email.placeholder")}
										value={value}
									/>
									{form.formState.errors.email ? (
										<Text style={styles.errorText}>
											{form.formState.errors.email.message}
										</Text>
									) : null}
								</View>
							)}
						/>

						<Controller
							control={form.control}
							name="password"
							render={({ field: { onBlur, onChange, value } }) => (
								<View style={styles.field}>
									<Text style={styles.label}>
										{t("auth.login.form.fields.password.label")}
									</Text>
									<Input
										autoCapitalize="none"
										autoComplete="password"
										error={Boolean(form.formState.errors.password)}
										onBlur={onBlur}
										onChangeText={onChange}
										placeholder={t(
											"auth.login.form.fields.password.placeholder",
										)}
										secureTextEntry
										value={value}
									/>
									{form.formState.errors.password ? (
										<Text style={styles.errorText}>
											{form.formState.errors.password.message}
										</Text>
									) : null}
								</View>
							)}
						/>

						{submitError ? (
							<Text style={styles.errorText}>{submitError}</Text>
						) : null}

						<Button
							disabled={isMutatingSession}
							isLoading={isMutatingSession}
							onPress={() => void onSubmit()}
							style={styles.submitButton}
						>
							{t("auth.login.form.submit")}
						</Button>
					</View>
				</CardContent>
			</Card>
		</KeyboardAvoidingView>
	);
}
