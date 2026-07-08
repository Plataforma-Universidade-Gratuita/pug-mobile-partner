
import type { ReactNode } from "react";

export interface OverflowActionSheetProps {
	visible: boolean;
	onDismiss: () => void;
	children: ReactNode;
}

export interface FilterSheetScaffoldProps {
	title: string;
	subtitle?: string;
	children: ReactNode;
	footer?: ReactNode;
}

export interface ModalScreenScaffoldProps {
	title: string;
	subtitle?: string;
	subtitleNumberOfLines?: number;
	children: ReactNode;
	footer?: ReactNode;
	leftAccessory?: ReactNode;
	rightAccessory?: ReactNode;
	compactHeader?: boolean;
	actionSlotMinWidth?: number;
}
