import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";

import { Eye, EyeOff, X } from "lucide-react-native";
import { Pressable, TextInput, View } from "react-native";

import { useThemeStore } from "@/store";
import type { InputProps, InputRef } from "@/types/client";

import { createStyles, getShellStateStyle } from "./styles";

export const Input = forwardRef<InputRef, InputProps>(function Input(
	{
		clearLabel,
		defaultValue,
		editable = true,
		error = false,
		hidePasswordLabel,
		leadingIcon,
		onBlur,
		onChangeText,
		onFocus,
		placeholderTextColor,
		secureTextEntry,
		showPasswordLabel,
		showPasswordToggle = false,
		trailingIcon,
		value,
		...props
	},
	ref,
) {
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);
	const [isFocused, setIsFocused] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [currentValue, setCurrentValue] = useState(
		String(value ?? defaultValue ?? ""),
	);
	const internalRef = useRef<InputRef | null>(null);
	const isPasswordField = secureTextEntry ?? false;
	const isSearchField =
		props.inputMode === "search" || props.enterKeyHint === "search";
	const resolvedSecureTextEntry =
		isPasswordField && showPasswordToggle
			? !isPasswordVisible
			: isPasswordField;
	const hasSearchValue = isSearchField && currentValue.length > 0;

	useEffect(() => {
		if (value !== undefined) {
			setCurrentValue(String(value));
		}
	}, [value]);

	function assignRef(node: InputRef | null) {
		internalRef.current = node;

		if (typeof ref === "function") {
			ref(node);
			return;
		}

		if (ref) {
			ref.current = node;
		}
	}

	function clearSearchValue() {
		internalRef.current?.clear();
		setCurrentValue("");
		onChangeText?.("");
		internalRef.current?.focus();
	}

	return (
		<View
			style={[
				styles.shell,
				getShellStateStyle(theme, isFocused, error, !editable),
			]}
		>
			{leadingIcon ? (
				<View style={styles.leadingIcon}>{leadingIcon}</View>
			) : null}

			<TextInput
				ref={assignRef}
				defaultValue={defaultValue}
				editable={editable}
				onBlur={event => {
					setIsFocused(false);
					onBlur?.(event);
				}}
				onChangeText={text => {
					setCurrentValue(text);
					onChangeText?.(text);
				}}
				onFocus={event => {
					setIsFocused(true);
					onFocus?.(event);
				}}
				placeholderTextColor={placeholderTextColor ?? theme.colors.muted}
				secureTextEntry={resolvedSecureTextEntry}
				selectionColor={theme.colors.brand}
				style={[
					styles.input,
					leadingIcon ? styles.inputLeading : null,
					trailingIcon ||
					(isPasswordField && showPasswordToggle) ||
					hasSearchValue
						? styles.inputTrailing
						: null,
				]}
				value={value}
				{...props}
			/>

			{hasSearchValue ? (
				<Pressable
					accessibilityLabel={clearLabel}
					disabled={!editable}
					onPress={clearSearchValue}
					style={({ pressed }) => [
						styles.iconButton,
						styles.clearButton,
						pressed ? styles.iconButtonPressed : null,
					]}
				>
					<X
						color={theme.colors.muted}
						size={14}
						strokeWidth={2}
					/>
				</Pressable>
			) : isPasswordField && showPasswordToggle ? (
				<Pressable
					accessibilityLabel={
						isPasswordVisible ? hidePasswordLabel : showPasswordLabel
					}
					disabled={!editable}
					onPress={() => setIsPasswordVisible(current => !current)}
					style={({ pressed }) => [
						styles.iconButton,
						styles.toggleButton,
						pressed ? styles.iconButtonPressed : null,
					]}
				>
					{isPasswordVisible ? (
						<EyeOff
							color={theme.colors.muted}
							size={16}
							strokeWidth={2}
						/>
					) : (
						<Eye
							color={theme.colors.muted}
							size={16}
							strokeWidth={2}
						/>
					)}
				</Pressable>
			) : trailingIcon ? (
				<View style={styles.trailingIcon}>{trailingIcon}</View>
			) : null}
		</View>
	);
});
