import type { ProjectResponse, ProjectStatus } from "@/types/api";
import type {
	BadgeTone,
	ProjectsFilters,
	ProjectsStatusOption,
} from "@/types/client";

const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
	CANCELED: "Canceled",
	COMPLETED: "Completed",
	IN_PROGRESS: "In progress",
	ON_HOLD: "On hold",
	PLANNED: "Planned",
};

export function createDefaultProjectsFilters(): ProjectsFilters {
	return {
		query: "",
		statuses: [],
		availabilityOnly: false,
	};
}

export function resolveProjectsStatusTone(status: ProjectStatus): BadgeTone {
	if (status === "IN_PROGRESS") {
		return "info";
	}

	if (status === "ON_HOLD") {
		return "warning";
	}

	if (status === "PLANNED") {
		return "brand";
	}

	if (status === "COMPLETED") {
		return "success";
	}

	if (status === "CANCELED") {
		return "danger";
	}

	return "neutral";
}

export function resolveProjectsStatusLabel(status: ProjectStatus) {
	return PROJECT_STATUS_LABELS[status] ?? status;
}

export function buildProjectsStatusOptions(
	projects: ProjectResponse[],
): ProjectsStatusOption[] {
	return [...new Set(projects.map(project => project.status.status))]
		.sort((left, right) =>
			resolveProjectsStatusLabel(left).localeCompare(
				resolveProjectsStatusLabel(right),
			),
		)
		.map(value => ({
			value,
			label: resolveProjectsStatusLabel(value),
		}));
}

export function normalizeProjectsSearchValue(value: string) {
	return value
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.trim();
}

export function hasProjectsOpenSpots(project: ProjectResponse) {
	const maxParticipants = project.projectInfo.maxParticipants;
	const currentParticipants = project.projectInfo.currentParticipants;

	if (maxParticipants == null) {
		return true;
	}

	if (currentParticipants == null) {
		return maxParticipants > 0;
	}

	return currentParticipants < maxParticipants;
}

export function filterProjects(
	projects: ProjectResponse[],
	filters: ProjectsFilters,
) {
	const normalizedQuery = normalizeProjectsSearchValue(filters.query);

	return projects.filter(project => {
		const matchesQuery =
			normalizedQuery.length === 0 ||
			normalizeProjectsSearchValue(project.name).includes(normalizedQuery) ||
			normalizeProjectsSearchValue(project.description).includes(
				normalizedQuery,
			);
		const matchesStatus =
			filters.statuses.length === 0 ||
			filters.statuses.includes(project.status.status);
		const matchesAvailability =
			!filters.availabilityOnly || hasProjectsOpenSpots(project);

		return matchesQuery && matchesStatus && matchesAvailability;
	});
}

export function sortProjects(projects: ProjectResponse[]) {
	return [...projects].sort((left, right) =>
		left.name.localeCompare(right.name),
	);
}

export function countProjectsByStatus(
	projects: ProjectResponse[],
	status: ProjectStatus,
) {
	return projects.filter(project => project.status.status === status).length;
}

export function resolveProjectsAvailabilityLabel(project: ProjectResponse) {
	const maxParticipants = project.projectInfo.maxParticipants;
	const currentParticipants = project.projectInfo.currentParticipants ?? 0;

	if (maxParticipants == null) {
		return "Unlimited seats";
	}

	return `${currentParticipants}/${maxParticipants} participants`;
}

export function hasActiveProjectsFilters(filters: ProjectsFilters) {
	return (
		filters.query.trim().length > 0 ||
		filters.statuses.length > 0 ||
		filters.availabilityOnly
	);
}
