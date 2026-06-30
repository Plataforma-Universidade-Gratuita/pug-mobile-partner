import React from "react";

import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Button } from "@/components";
import type { ProjectDetailBottomCtaProps } from "@/types/client";

export function ProjectDetailBottomCta({
	canApply,
	canManage,
	disabled,
	onApply,
	onManage,
}: ProjectDetailBottomCtaProps) {
	const { t } = useTranslation();

	if (!canApply && !canManage) {
		return null;
	}

	return (
		<View>
			<Button
				disabled={disabled}
				onPress={canManage ? onManage : onApply}
			>
				{canManage
					? t("projectDetail.actions.manage")
					: t("projectDetail.actions.apply")}
			</Button>
		</View>
	);
}
