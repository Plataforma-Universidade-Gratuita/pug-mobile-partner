/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import React from "react";

import { useTranslation } from "react-i18next";

import type { ProjectDetailResolvedContentProps } from "@/types/client";

import {
	ProjectDetailStateCard,
	ProjectDetailContent,
} from "./project-detail-sections";
import { resolveProjectDetailStatusTone } from "./utils";

export function ProjectDetailResolvedContent({
	activeParticipantsValue,
	addressValue,
	canApply,
	canManage,
	cityValue,
	cnpjValue,
	completedHoursValue,
	completionPercentLabel,
	completionRatio,
	disabled,
	entityName,
	isLoading = false,
	maxParticipantsValue,
	offeredHoursValue,
	onApply,
	onManage,
	project,
	staffItems,
	staffStateLabel,
}: ProjectDetailResolvedContentProps) {
	const { t } = useTranslation();

	if (!project) {
		return (
			<ProjectDetailStateCard
				badgeLabel={t("projectDetail.states.badge")}
				description={t("projectDetail.states.missingDescription")}
				title={t("projectDetail.states.missingTitle")}
				tone="warning"
			/>
		);
	}

	return (
		<ProjectDetailContent
			activeParticipantsValue={activeParticipantsValue}
			addressValue={addressValue}
			cityValue={cityValue}
			cnpjValue={cnpjValue}
			completedHoursValue={completedHoursValue}
			completionPercentLabel={completionPercentLabel}
			completionRatio={completionRatio}
			ctaDisabled={disabled}
			ctaLabel={
				canManage
					? t("projectDetail.actions.manage")
					: canApply
						? t("projectDetail.actions.apply")
						: null
			}
			entityName={entityName}
			isLoading={isLoading}
			maxParticipantsValue={maxParticipantsValue}
			onPressCta={canManage ? onManage : canApply ? onApply : undefined}
			offeredHoursValue={offeredHoursValue}
			project={project}
			staffItems={staffItems}
			staffStateLabel={staffStateLabel}
			statusTone={resolveProjectDetailStatusTone(project.status.status)}
		/>
	);
}
