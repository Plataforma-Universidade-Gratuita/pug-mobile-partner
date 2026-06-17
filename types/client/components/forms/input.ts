import type { ReactNode } from "react";

import type { TextInput, TextInputProps } from "react-native";

export interface InputProps extends Omit<
	TextInputProps,
	"style" | "onChange" | "onChangeText"
> {
	clearLabel?: string;
	error?: boolean;
	leadingIcon?: ReactNode;
	onChangeText?: (text: string) => void;
	showPasswordLabel?: string;
	showPasswordToggle?: boolean;
	hidePasswordLabel?: string;
	trailingIcon?: ReactNode;
}

export type InputRef = TextInput;
