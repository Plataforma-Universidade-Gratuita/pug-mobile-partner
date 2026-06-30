import type { BadgeTone } from "../components/primitives/display/badge";

export interface AcademicCounterpartCardProps {
	completedHoursLabel: string;
	completedHoursValue: string;
	isConcluded: boolean;
	missingHoursLabel: string;
	missingHoursValue: string;
	progressTitle: string;
	progressRatio: number;
	progressValueLabel: string;
	requiredHoursLabel: string;
	requiredHoursValue: string;
	sectionTitle: string;
	statusLabel: string;
}

export interface AcademicPeriodCardProps {
	dueDateLabel: string;
	dueDateValue: string;
	remainingDaysLabel: string;
	remainingDaysValue: string;
	sectionTitle: string;
	startDateLabel: string;
	startDateValue: string;
}

export interface AcademicRecordCardProps {
	academicRegistrationLabel: string;
	academicRegistrationValue: string;
	areaOfExpertiseLabel: string;
	areaOfExpertiseValue: string;
	campusLabel: string;
	campusValue: string;
	courseLabel: string;
	courseValue: string;
	sectionTitle: string;
}

export interface AcademicDetailsStateCardProps {
	badgeLabel: string;
	description: string;
	title: string;
	tone: NonNullable<BadgeTone>;
}
