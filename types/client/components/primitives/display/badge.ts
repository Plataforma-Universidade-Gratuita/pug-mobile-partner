
import type { ReactNode } from "react";

import type { StyleProp, ViewStyle } from "react-native";

export type BadgeTone =
	| "neutral"
	| "brand"
	| "success"
	| "info"
	| "warning"
	| "danger";

export type BadgeVariant = "primary" | "secondary";

export interface PrimitiveBadgeProps {
	children: ReactNode;
	tone?: BadgeTone;
	variant?: BadgeVariant;
	style?: StyleProp<ViewStyle>;
}
