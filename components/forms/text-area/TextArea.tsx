import React, { forwardRef, useMemo, useState } from "react";

import { TextInput, View } from "react-native";

import { useThemeStore } from "@/store";
import type { TextAreaProps } from "@/types/client";

import { createStyles, getShellStateStyle } from "./styles";

export const TextArea = forwardRef<TextInput, TextAreaProps>(function TextArea(
	{
		defaultValue,
		editable = true,
		error = false,
		multiline = true,
		numberOfLines = 5,
		onBlur,
		onFocus,
		placeholderTextColor,
		textAlignVertical = "top",
		value,
		...props
	},
	ref,
) {
	const theme = useThemeStore(state => state.theme);
	const styles = useMemo(() => createStyles(theme), [theme]);
	const [isFocused, setIsFocused] = useState(false);

	return (
		<View
			style={[
				styles.shell,
				getShellStateStyle(theme, isFocused, error, !editable),
			]}
		>
			<TextInput
				ref={ref}
				defaultValue={defaultValue}
				editable={editable}
				multiline={multiline}
				numberOfLines={numberOfLines}
				onBlur={event => {
					setIsFocused(false);
					onBlur?.(event);
				}}
				onFocus={event => {
					setIsFocused(true);
					onFocus?.(event);
				}}
				placeholderTextColor={placeholderTextColor ?? theme.colors.muted}
				selectionColor={theme.colors.brand}
				style={styles.input}
				textAlignVertical={textAlignVertical}
				value={value}
				{...props}
			/>
		</View>
	);
});
