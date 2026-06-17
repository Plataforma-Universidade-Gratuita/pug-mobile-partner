import type { ReactNode } from "react";

import { ALERT_DIALOG_VARIANTS } from "@/constants/ui";

export type AlertDialogVariant = (typeof ALERT_DIALOG_VARIANTS)[number];

export interface AlertDialogProps {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	title: ReactNode;
	description?: ReactNode;
	actionLabel: string;
	cancelLabel: string;
	onAction?: () => void;
	variant?: AlertDialogVariant;
}
