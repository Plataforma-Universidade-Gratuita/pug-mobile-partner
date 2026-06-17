import type { ReactNode } from "react";

import type { TextProps } from "react-native";

export interface LabelProps extends TextProps {
	children?: ReactNode;
}
