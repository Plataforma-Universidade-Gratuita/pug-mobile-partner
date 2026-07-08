import React from "react";

import { Plus, Settings2 } from "lucide-react-native";
import { useTranslation } from "react-i18next";

import { HeaderActionButton } from "@/components";
import type { ProjectDetailHeaderActionsProps } from "@/types/client";

export function ProjectDetailHeaderActions({
	canApply,
	canManage,
	disabled,
	onApply,
	onManage,
}: ProjectDetailHeaderActionsProps) {
	const { t } = useTranslation();

	if (canManage) {
		return (
			<HeaderActionButton
				accessibilityLabel={t("projectDetail.actions.manage")}
				disabled={disabled}
				icon={Settings2}
				onPress={onManage}
			/>
		);
	}

	if (!canApply) {
		return null;
	}

	return (
		<HeaderActionButton
			accessibilityLabel={t("projectDetail.actions.apply")}
			disabled={disabled}
			icon={Plus}
			onPress={onApply}
		/>
	);
}
