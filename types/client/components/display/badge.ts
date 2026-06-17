import type { ReactNode } from "react";

import type { ViewProps } from "react-native";

import { BADGE_TONES, BADGE_VARIANTS } from "@/constants/ui";

export type BadgeTone = (typeof BADGE_TONES)[number];
export type BadgeVariant = (typeof BADGE_VARIANTS)[number];

export interface BadgeProps extends Omit<ViewProps, "children"> {
	children?: ReactNode;
	tone?: BadgeTone;
	variant?: BadgeVariant;
	onRemove?: () => void;
	removeLabel?: string;
}
