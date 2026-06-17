import type { ReactNode } from "react";

import type { PressableProps } from "react-native";

export interface SwitchProps extends Omit<PressableProps, "children"> {
	checked?: boolean;
	defaultChecked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	label?: ReactNode;
	description?: ReactNode;
}
