import type { TextInputProps } from "react-native";

import type {
	AppResolvedTheme,
	PrimitiveFormStyleSpec,
	PrimitiveInputProps,
} from "@/types/client";

export function resolveInputKeyboardType(
	type: NonNullable<PrimitiveInputProps["type"]>,
	explicitKeyboardType?: PrimitiveInputProps["keyboardType"],
) {
	if (explicitKeyboardType) {
		return explicitKeyboardType;
	}

	if (type === "email") {
		return "email-address" as const;
	}

	return "default" as const;
}

export function resolveInputAutoCapitalize(
	type: NonNullable<PrimitiveInputProps["type"]>,
	explicitAutoCapitalize?: PrimitiveInputProps["autoCapitalize"],
): TextInputProps["autoCapitalize"] {
	if (explicitAutoCapitalize) {
		return explicitAutoCapitalize;
	}

	if (type === "email" || type === "password") {
		return "none";
	}

	return "sentences";
}

export function resolveInputAutoComplete(
	type: NonNullable<PrimitiveInputProps["type"]>,
	explicitAutoComplete?: PrimitiveInputProps["autoComplete"],
): TextInputProps["autoComplete"] {
	if (explicitAutoComplete) {
		return explicitAutoComplete;
	}

	switch (type) {
		case "email":
			return "email";
		case "password":
			return "password";
		case "text":
		default:
			return "off";
	}
}

export function resolveInputPlaceholder(
	type: NonNullable<PrimitiveInputProps["type"]>,
	explicitPlaceholder: PrimitiveInputProps["placeholder"],
	getText: (key: string) => string,
) {
	if (explicitPlaceholder) {
		return explicitPlaceholder;
	}

	switch (type) {
		case "email":
			return getText("common.primitives.input.placeholders.email");
		case "password":
			return getText("common.primitives.input.placeholders.password");
		case "text":
		default:
			return getText("common.primitives.input.placeholders.text");
	}
}

export function resolveSecureTextEntry(
	type: NonNullable<PrimitiveInputProps["type"]>,
	passwordVisible: boolean,
) {
	return type === "password" && !passwordVisible;
}

export function shouldRenderPasswordToggle(
	type: NonNullable<PrimitiveInputProps["type"]>,
) {
	return type === "password";
}

export function resolvePasswordToggleIcon(passwordVisible: boolean) {
	return passwordVisible ? "eye-off" : "eye";
}

export function resolveInputColors(
	hasError: boolean,
	theme: AppResolvedTheme,
	spec: PrimitiveFormStyleSpec,
) {
	return {
		textColor: theme.colors.text,
		placeholderTextColor: spec.inputPlaceholder,
		outlineColor: hasError ? theme.colors.danger : spec.inputBorder,
		activeOutlineColor: hasError ? theme.colors.danger : theme.colors.brand,
	};
}
