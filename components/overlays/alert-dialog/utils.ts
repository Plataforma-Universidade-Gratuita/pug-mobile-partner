import type { AlertDialogVariant, ButtonUsage } from "@/types/client";

export function getActionUsage(variant: AlertDialogVariant): ButtonUsage {
	switch (variant) {
		case "success":
			return "success";
		case "warning":
			return "warning";
		case "danger":
			return "danger";
		case "default":
		default:
			return "primary";
	}
}
