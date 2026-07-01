import type { ProjectStatus } from "@/types/api";

import type { BadgeTone } from "../components/primitives/display/badge";

export interface ProjectDetailScreenProps {
	titleOverride?: string;
}

export interface ProjectDetailHeaderActionsProps {
	canApply: boolean;
	canManage: boolean;
	disabled: boolean;
	onApply: () => void;
	onManage: () => void;
}

export interface ProjectDetailBottomCtaProps {
	canApply: boolean;
	canManage: boolean;
	disabled: boolean;
	onApply: () => void;
	onManage: () => void;
}

export interface ProjectDetailStaffItem {
	name: string;
	email: string;
}

export interface ProjectOverviewCardProps {
	title: string;
	description: string;
	statusLabel: string;
	statusTone: BadgeTone;
	isLoading?: boolean;
	activeParticipantsValue: string;
	maxParticipantsValue: string;
	completedHoursValue: string;
	offeredHoursValue: string;
	progressRatio: number;
	progressValueLabel: string;
	ctaLabel?: string | null | undefined;
	ctaDisabled?: boolean;
	onPressCta?: (() => void) | undefined;
}

export interface ProjectEntityCardProps {
	entityName: string;
	addressValue: string | null;
	cnpjValue: string;
	cityValue: string;
	isLoading?: boolean;
	staffItems: ProjectDetailStaffItem[];
	staffStateLabel: string;
}

export interface ManageEnrollmentSheetProps {
	visible: boolean;
	projectName: string;
	isBusy: boolean;
	onDismiss: () => void;
	onExitProject: () => void;
}

export interface ApplyEnrollmentSheetProps {
	visible: boolean;
	projectName: string;
	isBusy: boolean;
	onApply: () => void;
	onDismiss: () => void;
}

export interface ProjectDetailStateCardProps {
	badgeLabel: string;
	description: string;
	title: string;
	tone: NonNullable<BadgeTone>;
}

export interface ProjectDetailResolvedContentProps {
	activeParticipantsValue: string;
	addressValue: string | null;
	canApply: boolean;
	canManage: boolean;
	cityValue: string;
	cnpjValue: string;
	completedHoursValue: string;
	completionPercentLabel: string;
	completionRatio: number;
	disabled: boolean;
	entityName: string;
	isLoading?: boolean;
	maxParticipantsValue: string;
	offeredHoursValue: string;
	onApply: () => void;
	onManage: () => void;
	project: {
		description: string;
		id: string;
		name: string;
		status: {
			status: ProjectStatus;
			statusFormatted: string;
		};
	} | null;
	staffItems: ProjectDetailStaffItem[];
	staffStateLabel: string;
}

export interface ProjectDetailContentProps {
	activeParticipantsValue: string;
	addressValue: string | null;
	cityValue: string;
	cnpjValue: string;
	completedHoursValue: string;
	completionPercentLabel: string;
	completionRatio: number;
	ctaLabel?: string | null;
	ctaDisabled?: boolean;
	entityName: string;
	isLoading?: boolean;
	maxParticipantsValue: string;
	onPressCta?: (() => void) | undefined;
	offeredHoursValue: string;
	project: {
		description: string;
		name: string;
		status: { statusFormatted: string };
	};
	staffItems: ProjectDetailStaffItem[];
	staffStateLabel: string;
	statusTone: BadgeTone;
}

export interface ProjectDetailScrollContentProps {
	activeParticipantsValue: string;
	addressValue: string | null;
	badgeLabel: string;
	canApply: boolean;
	canManage: boolean;
	cityValue: string;
	cnpjValue: string;
	completedHoursValue: string;
	completionPercentLabel: string;
	completionRatio: number;
	contentBottomPadding: number;
	descriptionError: string;
	descriptionLoading: string;
	descriptionMissing: string;
	disabled: boolean;
	entityName: string;
	hasQueryError: boolean;
	isInitialLoading: boolean;
	isRefreshing: boolean;
	maxParticipantsValue: string;
	offeredHoursValue: string;
	onApply: () => void;
	onManage: () => void;
	onRefresh: () => void;
	project: {
		description: string;
		id: string;
		name: string;
		status: {
			status: ProjectStatus;
			statusFormatted: string;
		};
	} | null;
	staffItems: ProjectDetailStaffItem[];
	staffStateLabel: string;
	themeBrandColor: string;
	titleError: string;
	titleLoading: string;
	titleMissing: string;
}
