
import React from "react";

import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Button } from "@/components";
import { useThemeStore } from "@/stores";
import type { ProjectDetailBottomCtaProps } from "@/types/client";

export function ProjectDetailBottomCta({
	canApply,
	canManage,
	disabled,
	onApply,
	onManage,
}: ProjectDetailBottomCtaProps) {
	const { t } = useTranslation();
	const theme = useThemeStore(state => state.theme);

	if (!canApply && !canManage) {
		return null;
	}

	return (
		<View style={{ marginTop: theme.space[2] }}>
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
