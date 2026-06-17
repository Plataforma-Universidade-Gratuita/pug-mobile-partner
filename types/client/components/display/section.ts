import type { ReactNode } from "react";

import type { ViewProps } from "react-native";

export interface SectionProps extends Omit<ViewProps, "children"> {
	title?: ReactNode;
	description?: ReactNode;
	actions?: ReactNode;
	children?: ReactNode;
}
