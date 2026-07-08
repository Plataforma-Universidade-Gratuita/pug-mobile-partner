import type { ReactNode } from "react";

import type { StyleProp, TextStyle } from "react-native";

export type LabelRole = "title" | "subtitle" | "field" | "helper" | "caption";
export type LabelTone = "default" | "muted" | "brand" | "danger" | "success";
export type LabelAlign = "left" | "center" | "right";

export interface PrimitiveLabelProps {
	children: ReactNode;
	role?: LabelRole;
	tone?: LabelTone;
	align?: LabelAlign;
	numberOfLines?: number;
	style?: StyleProp<TextStyle>;
}
