import React from "react";

import { useTranslation } from "react-i18next";

import { Button } from "@/components/primitives";
import type { ProjectDetailAttendanceActionProps } from "@/types/client";

export function ProjectDetailAttendanceAction({
	onPress,
}: ProjectDetailAttendanceActionProps) {
	const { t } = useTranslation();

	return (
		<Button onPress={onPress}>
			{t("projectDetail.actions.newAttendance")}
		</Button>
	);
}
