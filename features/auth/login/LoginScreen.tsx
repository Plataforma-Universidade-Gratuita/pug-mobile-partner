import React, { useRef } from "react";

import { useRouter } from "expo-router";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { Button, Badge, Input, Label } from "@/components/primitives";
import {
	useAuthScreen,
	useLocalizedZodForm,
	useServerErrorState,
} from "@/hooks";
import { createLoginFormSchema } from "@/schemas/client";
import { useAuthStore } from "@/stores";
import type {
	LoginFormValues,
	PrimitiveInputFocusHandle,
} from "@/types/client";

import { createStyles } from "./styles";
import { resolveLoginErrorMessageWithMessages } from "./utils";

export function LoginScreen() {
	const { t } = useTranslation();
	const router = useRouter();
	const signIn = useAuthStore(state => state.signIn);
	const { isMutatingSession, styles } = useAuthScreen(createStyles);
	const { clearServerError, serverError, setServerError } =
		useServerErrorState();
	const passwordInputRef = useRef<PrimitiveInputFocusHandle | null>(null);
	const form = useLocalizedZodForm<LoginFormValues>({
		schemaFactory: createLoginFormSchema,
		defaultValues: {
			email: "",
			password: null,
		},
		mode: "onSubmit",
		reValidateMode: "onChange",
	});

	async function onSubmit(values: LoginFormValues) {
		clearServerError();

		try {
			const tokens = await signIn({
				email: values.email.trim().toLowerCase(),
				password: values.password,
			});

			if (!tokens.passwordWired) {
				router.replace("/wire-credentials");
				return;
			}

			router.replace("/");
		} catch (error) {
			setServerError(
				resolveLoginErrorMessageWithMessages(error, {
					invalidCredentials: t("auth.login.errors.invalidCredentials"),
					fallback: t("auth.login.errors.fallback"),
				}),
			);
		}
	}

	return (
		<View style={styles.screen}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				style={styles.keyboard}
			>
				<ScrollView
					contentContainerStyle={styles.content}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.panel}>
						<Badge
							style={styles.badge}
							tone="brand"
							variant="primary"
						>
							{t("auth.login.badge")}
						</Badge>

						<View style={styles.header}>
							<Label role="title">{t("auth.login.title")}</Label>
							<Label role="subtitle">{t("auth.login.subtitle")}</Label>
						</View>

						<View style={styles.form}>
							<View style={styles.field}>
								<Label role="field">{t("auth.login.emailLabel")}</Label>
								<Controller
									control={form.control}
									name="email"
									render={({ field, fieldState }) => (
										<Input
											autoComplete="email"
											blurOnSubmit={false}
											onBlur={() => {
												field.onBlur();
											}}
											onChangeText={value => {
												field.onChange(value);
												clearServerError();
											}}
											onSubmitEditing={() => {
												passwordInputRef.current?.focus();
											}}
											returnKeyType="next"
											type="email"
											value={field.value}
											error={fieldState.error?.message ?? null}
										/>
									)}
								/>
							</View>

							<View style={styles.field}>
								<Label role="field">{t("auth.login.passwordLabel")}</Label>
								<Controller
									control={form.control}
									name="password"
									render={({ field, fieldState }) => (
										<Input
											autoComplete="password"
											inputRef={passwordInputRef}
											error={fieldState.error?.message ?? null}
											helperText={t("auth.login.passwordHelper")}
											onBlur={() => {
												field.onBlur();
											}}
											onChangeText={value => {
												field.onChange(value);
												clearServerError();
											}}
											onSubmitEditing={() => {
												void form.handleSubmit(onSubmit)();
											}}
											returnKeyType="done"
											type="password"
											value={field.value ?? ""}
										/>
									)}
								/>
							</View>

							{serverError ? (
								<Label
									role="helper"
									tone="danger"
								>
									{serverError}
								</Label>
							) : null}

							<Button
								loading={isMutatingSession}
								onPress={() => {
									void form.handleSubmit(onSubmit)();
								}}
							>
								{t("auth.login.submit")}
							</Button>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
}
