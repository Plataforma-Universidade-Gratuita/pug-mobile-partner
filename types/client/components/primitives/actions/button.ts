/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import type { ReactNode } from "react";

import type {
	GestureResponderEvent,
	StyleProp,
	TextStyle,
	ViewStyle,
} from "react-native";

export type PrimitiveButtonVariant = "primary" | "secondary" | "text";

export interface PrimitiveButtonProps {
	children: ReactNode;
	variant?: PrimitiveButtonVariant;
	disabled?: boolean;
	loading?: boolean;
	fullWidth?: boolean;
	onPress?: (event: GestureResponderEvent) => void;
	style?: StyleProp<ViewStyle>;
	labelStyle?: StyleProp<TextStyle>;
}
