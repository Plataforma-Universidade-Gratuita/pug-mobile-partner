/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import React, { useMemo, useState } from "react";
import type { ComponentProps } from "react";

import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { TextInput as PaperTextInput } from "react-native-paper";

import { useThemeStore } from "@/stores";
import { createPrimitiveFormStyleSpec } from "@/styles";
import type { PrimitiveInputProps } from "@/types/client";

import { Label } from "../label";
import { styles } from "./styles";
import {
	resolveInputAutoCapitalize,
	resolveInputAutoComplete,
	resolveInputColors,
	resolveInputKeyboardType,
	resolveInputPlaceholder,
	resolvePasswordToggleIcon,
	resolveSecureTextEntry,
	shouldRenderPasswordToggle,
} from "./utils";

export function Input({
	value,
	onChangeText,
	type = "text",
	placeholder,
	disabled = false,
	error = null,
	helperText,
	autoFocus = false,
	autoCapitalize,
	autoCorrect = false,
	autoComplete,
	keyboardType,
	returnKeyType,
	blurOnSubmit,
	onBlur,
	onSubmitEditing,
	inputRef,
	style,
}: PrimitiveInputProps) {
	const { t } = useTranslation();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveFormStyleSpec(theme), [theme]);
	const [passwordVisible, setPasswordVisible] = useState(false);
	const hasError = Boolean(error);
	const resolvedAutoCapitalize = resolveInputAutoCapitalize(
		type,
		autoCapitalize,
	);
	const resolvedAutoComplete = resolveInputAutoComplete(type, autoComplete);
	const colors = useMemo(
		() => resolveInputColors(hasError, theme, spec),
		[hasError, spec, theme],
	);
	const shouldShowPasswordToggle = shouldRenderPasswordToggle(type);
	const blurProps = onBlur ? { onBlur } : {};
	const changeTextProps = onChangeText ? { onChangeText } : {};
	const resolvedPlaceholder = resolveInputPlaceholder(type, placeholder, t);
	const placeholderProps = resolvedPlaceholder
		? { placeholder: resolvedPlaceholder }
		: {};
	const submitProps = onSubmitEditing ? { onSubmitEditing } : {};
	const autoCapitalizeProps = {
		autoCapitalize: resolvedAutoCapitalize,
	};
	const autoCompleteProps =
	const autoCompleteProps = { autoComplete: resolvedAutoComplete };
		? { keyboardType: resolveInputKeyboardType(type, keyboardType) }
		: type === "email"
			? { keyboardType: resolveInputKeyboardType(type, keyboardType) }
			: {};
	const returnKeyTypeProps = returnKeyType ? { returnKeyType } : {};
	const blurOnSubmitProps = blurOnSubmit !== undefined ? { blurOnSubmit } : {};
	const rightAdornmentProps = shouldShowPasswordToggle
		? {
				right: (
					<PaperTextInput.Icon
						icon={resolvePasswordToggleIcon(passwordVisible)}
						onPress={() => setPasswordVisible(current => !current)}
						forceTextInputFocus={false}
					/>
				),
			}
		: {};

	return (
		<View style={[styles.root, style]}>
			<PaperTextInput
				mode="outlined"
				value={value}
				disabled={disabled}
				error={hasError}
				autoFocus={autoFocus}
				autoCorrect={autoCorrect}
				secureTextEntry={resolveSecureTextEntry(type, passwordVisible)}
				textColor={colors.textColor}
				placeholderTextColor={colors.placeholderTextColor}
				outlineColor={colors.outlineColor}
				activeOutlineColor={colors.activeOutlineColor}
				ref={inputRef as ComponentProps<typeof PaperTextInput>["ref"]}
				{...changeTextProps}
				{...placeholderProps}
				{...autoCapitalizeProps}
				{...autoCompleteProps}
				{...keyboardTypeProps}
				{...returnKeyTypeProps}
				{...blurOnSubmitProps}
				{...blurProps}
				{...submitProps}
				contentStyle={styles.content}
				{...rightAdornmentProps}
				style={[
					styles.input,
					{
						backgroundColor: spec.inputBackground,
						fontFamily: theme.font.sans,
						fontSize: theme.type.md,
						fontWeight: theme.weight.regular,
					},
				]}
				outlineStyle={[
					styles.outline,
					{
						borderRadius: theme.form.controlRadius,
					},
				]}
			/>

			{error ? (
				<Label
					role="helper"
					tone="danger"
					style={styles.helper}
				>
					{error}
				</Label>
			) : helperText ? (
				<Label
					role="helper"
					tone="muted"
					style={styles.helper}
				>
					{helperText}
				</Label>
			) : null}
		</View>
	);
}
