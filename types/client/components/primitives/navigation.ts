/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
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
