
import type { ReactNode } from "react";

import type { LucideIcon } from "lucide-react-native";
import type { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

export interface HeaderActionButtonProps {
	icon: LucideIcon;
	accessibilityLabel: string;
	onPress?: (event: GestureResponderEvent) => void;
	disabled?: boolean;
	style?: StyleProp<ViewStyle>;
}

export interface AppBackButtonProps {
	accessibilityLabel?: string;
	onPress?: (event: GestureResponderEvent) => void;
	style?: StyleProp<ViewStyle>;
}

export interface AppScreenHeaderProps {
	title: string;
	subtitle?: string;
	showBackButton?: boolean;
	leftAccessory?: ReactNode;
	rightAccessory?: ReactNode;
}

export interface BrandScreenHeaderProps {
	title: string;
	leftAccessory?: ReactNode;
	rightAccessory?: ReactNode;
}
