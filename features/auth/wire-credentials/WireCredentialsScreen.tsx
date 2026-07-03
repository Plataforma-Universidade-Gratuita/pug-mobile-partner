/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import React, { useRef, useState } from "react";

import { ChevronDown, ChevronUp } from "lucide-react-native";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	View,
} from "react-native";

import { Button, Badge, Input, Label } from "@/components/primitives";
import {
	useAuthScreen,
	useLocalizedZodForm,
	useServerErrorState,
} from "@/hooks";
import { createWireCredentialsFormSchema } from "@/schemas/client";
import { useAuthStore } from "@/stores";
import type {
	PrimitiveInputFocusHandle,
	WireCredentialsFormValues,
	WireCredentialsPasswordRequirements,
} from "@/types/client";
import {
	evaluateWireCredentialsPasswordRequirements,
	resolveWireCredentialsErrorMessageWithFallback,
} from "@/utils";

import { createStyles } from "./styles";

export function WireCredentialsScreen() {
	const { t } = useTranslation();
	const completeCredentialSetup = useAuthStore(
		state => state.completeCredentialSetup,
	);
	const sessionPayload = useAuthStore(state => state.sessionPayload);
	const signOut = useAuthStore(state => state.signOut);
	const { isMutatingSession, styles } = useAuthScreen(createStyles);
	const { clearServerError, serverError, setServerError } =
		useServerErrorState();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isRequirementsExpanded, setIsRequirementsExpanded] = useState(false);
	const confirmPasswordInputRef = useRef<PrimitiveInputFocusHandle | null>(
		null,
	);
	const email = sessionPayload?.upn ?? "";
	const isBusy = isSubmitting || isMutatingSession;
	const form = useLocalizedZodForm<WireCredentialsFormValues>({
		schemaFactory: createWireCredentialsFormSchema,
		defaultValues: {
			password: null,
			confirmPassword: "",
		},
		mode: "onSubmit",
		reValidateMode: "onChange",
	});
	const passwordValue = form.watch("password") ?? "";
	const passwordRequirements =
		evaluateWireCredentialsPasswordRequirements(passwordValue);

	async function onSubmit(values: WireCredentialsFormValues) {
		clearServerError();

		if (!email) {
			setServerError(t("auth.wireCredentials.errors.missingEmail"));
			return;
		}

		const password = values.password?.trim() ?? "";

		setIsSubmitting(true);

		try {
			await completeCredentialSetup({
				email,
				password: password.trim(),
			});
		} catch (error) {
			setServerError(
				resolveWireCredentialsErrorMessageWithFallback(
					error,
					t("auth.wireCredentials.errors.fallback"),
				),
			);
		} finally {
			setIsSubmitting(false);
		}
	}

	async function handleFinishLater() {
		await signOut();
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
							tone="warning"
							variant="secondary"
						>
							{t("auth.wireCredentials.badge")}
						</Badge>

						<View style={styles.header}>
							<Label role="title">{t("auth.wireCredentials.title")}</Label>
							<Label role="subtitle">
								{t("auth.wireCredentials.subtitle")}
							</Label>
						</View>

						<View style={styles.form}>
							<View style={styles.field}>
								<Label role="field">
									{t("auth.wireCredentials.passwordLabel")}
								</Label>
								<Controller
									control={form.control}
									name="password"
									render={({ field, fieldState }) => (
										<Input
											autoComplete="password-new"
											blurOnSubmit={false}
											error={fieldState.error?.message ?? null}
											onBlur={() => {
												field.onBlur();
											}}
											onChangeText={value => {
												field.onChange(value);
												clearServerError();
											}}
											onSubmitEditing={() => {
												confirmPasswordInputRef.current?.focus();
											}}
											placeholder={t(
												"auth.wireCredentials.passwordPlaceholder",
											)}
											returnKeyType="next"
											type="password"
											value={field.value ?? ""}
										/>
									)}
								/>
								<View style={styles.requirementsCard}>
									<Pressable
										onPress={() => {
											setIsRequirementsExpanded(current => !current);
										}}
										style={styles.requirementsHeader}
									>
										<Label
											role="helper"
											style={styles.requirementsTitle}
										>
											{t("auth.wireCredentials.passwordChecklistTitle")}
										</Label>
										{isRequirementsExpanded ? (
											<ChevronUp
												color={styles.requirementsChevron.color}
												size={18}
											/>
										) : (
											<ChevronDown
												color={styles.requirementsChevron.color}
												size={18}
											/>
										)}
									</Pressable>
									{isRequirementsExpanded ? (
										<View style={styles.requirementsList}>
											{[
												[
													"hasMinimumLength",
													t("auth.wireCredentials.passwordChecklist.minLength"),
												],
												[
													"hasUppercaseLetter",
													t("auth.wireCredentials.passwordChecklist.uppercase"),
												],
												[
													"hasLowercaseLetter",
													t("auth.wireCredentials.passwordChecklist.lowercase"),
												],
												[
													"hasNumber",
													t("auth.wireCredentials.passwordChecklist.number"),
												],
												[
													"hasSpecialSymbol",
													t(
														"auth.wireCredentials.passwordChecklist.specialSymbol",
													),
												],
											].map(([key, label]) => {
												const isSatisfied =
													passwordRequirements[
														key as keyof WireCredentialsPasswordRequirements
													];

												return (
													<View
														key={String(key)}
														style={styles.requirementRow}
													>
														<View
															style={[
																styles.requirementIndicator,
																isSatisfied
																	? styles.requirementIndicatorSatisfied
																	: styles.requirementIndicatorPending,
															]}
														/>
														<Label
															role="helper"
															tone={isSatisfied ? "success" : "muted"}
														>
															{label}
														</Label>
													</View>
												);
											})}
										</View>
									) : null}
								</View>
							</View>

							<View style={styles.field}>
								<Label role="field">
									{t("auth.wireCredentials.confirmPasswordLabel")}
								</Label>
								<Controller
									control={form.control}
									name="confirmPassword"
									render={({ field, fieldState }) => (
										<Input
											autoComplete="password-new"
											inputRef={confirmPasswordInputRef}
											error={fieldState.error?.message ?? null}
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
											placeholder={t(
												"auth.wireCredentials.confirmPasswordPlaceholder",
											)}
											returnKeyType="done"
											type="password"
											value={field.value}
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

							<View style={styles.actions}>
								<Button
									disabled={isBusy}
									loading={isSubmitting}
									onPress={() => {
										void form.handleSubmit(onSubmit)();
									}}
								>
									{t("auth.wireCredentials.submit")}
								</Button>

								<Button
									disabled={isBusy}
									onPress={() => {
										void handleFinishLater();
									}}
									variant="text"
								>
									{t("auth.wireCredentials.finishLater")}
								</Button>
							</View>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
}
