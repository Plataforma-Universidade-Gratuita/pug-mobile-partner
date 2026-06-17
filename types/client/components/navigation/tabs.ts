import type { ReactNode } from "react";

import { TABS_VARIANTS } from "@/constants/ui";

export type TabsVariant = (typeof TABS_VARIANTS)[number];

export interface TabsItem {
	value: string;
	label: ReactNode;
	icon?: ReactNode;
	content: ReactNode;
	tooltipContent?: string;
	disabled?: boolean;
}

export interface TabsProps {
	items: TabsItem[];
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	variant?: TabsVariant;
}
