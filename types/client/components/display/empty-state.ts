import type { ReactNode } from "react";

import type { ViewProps } from "react-native";

export interface EmptyStateProps extends Omit<ViewProps, "children"> {
	title: ReactNode;
	description?: ReactNode;
	icon?: ReactNode;
	children?: ReactNode;
	actions?: ReactNode;
}
