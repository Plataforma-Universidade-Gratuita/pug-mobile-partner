import React from "react";

import type { ProjectDetailContentProps } from "@/types/client";

import { ProjectEntityCard } from "./ProjectEntityCard";
import { ProjectOverviewCard } from "./ProjectOverviewCard";

export function ProjectDetailContent(props: ProjectDetailContentProps) {
	const isLoading = props.isLoading ?? false;

	return (
		<>
			<ProjectOverviewCard
				activeParticipantsValue={props.activeParticipantsValue}
				completedHoursValue={props.completedHoursValue}
				{...(props.ctaDisabled !== undefined
					? { ctaDisabled: props.ctaDisabled }
					: {})}
				ctaLabel={props.ctaLabel}
				description={props.project.description}
				isLoading={isLoading}
				maxParticipantsValue={props.maxParticipantsValue}
				onPressCta={props.onPressCta}
				offeredHoursValue={props.offeredHoursValue}
				progressRatio={props.completionRatio}
				progressValueLabel={props.completionPercentLabel}
				statusLabel={props.project.status.statusFormatted}
				statusTone={props.statusTone}
				title={props.project.name}
			/>
			<ProjectEntityCard
				addressValue={props.addressValue}
				cityValue={props.cityValue}
				cnpjValue={props.cnpjValue}
				entityName={props.entityName}
				isLoading={isLoading}
				staffItems={props.staffItems}
				staffStateLabel={props.staffStateLabel}
			/>
		</>
	);
}
