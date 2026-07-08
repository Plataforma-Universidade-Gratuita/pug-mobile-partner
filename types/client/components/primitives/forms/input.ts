
import type { ReactNode, Ref } from "react";

import type {
	KeyboardTypeOptions,
	StyleProp,
	TextInputProps,
	ViewStyle,
} from "react-native";

export interface PrimitiveInputFocusHandle {
	focus: () => void;
}

export type PrimitiveInputType = "text" | "email" | "password";

export interface PrimitiveInputProps {
	value: string;
	onChangeText?: (value: string) => void;
	type?: PrimitiveInputType;
	placeholder?: string;
	disabled?: boolean;
	error?: string | null;
	helperText?: ReactNode;
	autoFocus?: boolean;
	autoCapitalize?: TextInputProps["autoCapitalize"];
	autoCorrect?: boolean;
	autoComplete?: TextInputProps["autoComplete"];
	keyboardType?: KeyboardTypeOptions;
	returnKeyType?: TextInputProps["returnKeyType"];
	blurOnSubmit?: TextInputProps["blurOnSubmit"];
	onBlur?: TextInputProps["onBlur"];
	onSubmitEditing?: TextInputProps["onSubmitEditing"];
	inputRef?: Ref<PrimitiveInputFocusHandle>;
	style?: StyleProp<ViewStyle>;
}
