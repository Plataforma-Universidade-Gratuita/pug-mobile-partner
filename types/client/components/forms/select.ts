import type { ReactNode } from "react";

export interface SelectOption {
	value: string;
	label: ReactNode;
	description?: ReactNode;
	disabled?: boolean;
}

export interface SelectProps {
	options: SelectOption[];
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
	clearLabel?: string;
	title?: ReactNode;
	searchable?: boolean;
	searchPlaceholder?: string;
	emptyMessage?: ReactNode;
}
