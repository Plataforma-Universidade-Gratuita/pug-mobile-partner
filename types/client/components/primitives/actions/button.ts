
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
