import React from "react";

import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import type { ProjectDetailResolvedContentProps } from "@/types/client";

import {
	ProjectDetailAttendanceAction,
	ProjectDetailStateCard,
	ProjectDetailContent,
} from "./project-detail-sections";
import { resolveProjectDetailStatusTone } from "./utils";

export function ProjectDetailResolvedContent({
	activeParticipantsValue,
	addressValue,
	canCreateAttendance,
	cityValue,
	cnpjValue,
	completedHoursValue,
	completionPercentLabel,
	completionRatio,
	entityName,
	maxParticipantsValue,
	offeredHoursValue,
	project,
	staffItems,
	staffStateLabel,
}: ProjectDetailResolvedContentProps) {
	const { t } = useTranslation();
	const router = useRouter();

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
		<>
			<ProjectDetailContent
				activeParticipantsValue={activeParticipantsValue}
				addressValue={addressValue}
				cityValue={cityValue}
				cnpjValue={cnpjValue}
				completedHoursValue={completedHoursValue}
				completionPercentLabel={completionPercentLabel}
				completionRatio={completionRatio}
				entityName={entityName}
				maxParticipantsValue={maxParticipantsValue}
				offeredHoursValue={offeredHoursValue}
				project={project}
				staffItems={staffItems}
				staffStateLabel={staffStateLabel}
				statusTone={resolveProjectDetailStatusTone(project.status.status)}
			/>
			{canCreateAttendance ? (
				<ProjectDetailAttendanceAction
					onPress={() => {
						router.push({
							pathname: "/attendance/new",
							params: { projectId: project.id },
						});
					}}
				/>
			) : null}
		</>
	);
}
