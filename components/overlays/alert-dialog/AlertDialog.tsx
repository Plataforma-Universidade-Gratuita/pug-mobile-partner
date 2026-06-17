import React, { useState } from "react";

import { Button } from "@/components/actions/button/Button";
import { Dialog } from "@/components/overlays/dialog/Dialog";
import type { AlertDialogProps, ButtonUsage } from "@/types/client";

import { getActionUsage } from "./utils";

export function AlertDialog({
	actionLabel,
	cancelLabel,
	defaultOpen = false,
	description,
	onAction,
	onOpenChange,
	open,
	title,
	variant = "default",
}: AlertDialogProps) {
	const [internalOpen, setInternalOpen] = useState(defaultOpen);
	const isControlled = open !== undefined;
	const isOpen = isControlled ? (open ?? false) : internalOpen;
	const actionUsage = getActionUsage(variant);

	function setOpen(nextValue: boolean) {
		if (!isControlled) {
			setInternalOpen(nextValue);
		}

		onOpenChange?.(nextValue);
	}

	function handleAction() {
		onAction?.();
		setOpen(false);
	}

	return (
		<Dialog
			closeLabel={cancelLabel}
			description={description}
			onOpenChange={setOpen}
			open={isOpen}
			footer={
				<>
					<Button
						onPress={() => setOpen(false)}
						variant="secondary"
					>
						{cancelLabel}
					</Button>
					<Button
						onPress={handleAction}
						usage={actionUsage as ButtonUsage}
					>
						{actionLabel}
					</Button>
				</>
			}
			title={title}
		/>
	);
}
