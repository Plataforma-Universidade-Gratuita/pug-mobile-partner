
import type { ProjectResponse, ProjectStatus } from "@/types/api";
import type { BadgeTone } from "@/types/client";

export interface ProjectsFilters {
	query: string;
	statuses: ProjectStatus[];
	availabilityOnly: boolean;
}

export interface ProjectsStatusOption {
	value: ProjectStatus;
	label: string;
}

export interface ProjectsHeaderActionsProps {
	disabled?: boolean;
	onOpenFilters: () => void;
}

export interface ProjectsFilterSheetProps {
	visible: boolean;
	filters: ProjectsFilters;
	statusOptions: ProjectsStatusOption[];
	onApply: (filters: ProjectsFilters) => void;
	onDismiss: () => void;
}

export interface ProjectsSummarySectionProps {
	entityName: string;
	totalProjects: number;
	inProgressCount: number;
	plannedCount: number;
	isLoading?: boolean;
}

export interface ProjectsStateCardProps {
	title: string;
	description: string;
	tone: BadgeTone;
	badgeLabel?: string;
}

export interface ProjectsProjectCardProps {
	project: ProjectResponse | null;
	isLoading?: boolean;
	onPress?: () => void;
	statusTone?: BadgeTone;
	statusLabel?: string;
	availabilityLabel?: string;
}

export interface ProjectsListSectionProps {
	projects: ProjectResponse[];
	isLoading?: boolean;
	onOpenProject: (project: ProjectResponse) => void;
	resolveStatusTone: (status: ProjectStatus) => BadgeTone;
	resolveAvailabilityLabel: (project: ProjectResponse) => string;
}
