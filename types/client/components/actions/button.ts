import type { ReactNode } from "react";

import type { PressableProps } from "react-native";

import { BUTTON_SIZES, BUTTON_USAGES, BUTTON_VARIANTS } from "@/constants/ui";

export type ButtonUsage = (typeof BUTTON_USAGES)[number];
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];
export type ButtonSize = (typeof BUTTON_SIZES)[number];

export interface ButtonProps extends Omit<PressableProps, "children"> {
	children?: ReactNode;
	isLoading?: boolean;
	leadingIcon?: ReactNode;
	loadingText?: string;
	size?: ButtonSize;
	trailingIcon?: ReactNode;
	title?: string;
	usage?: ButtonUsage;
	variant?: ButtonVariant;
}
