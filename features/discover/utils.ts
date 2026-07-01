import type { TFunction } from "i18next";

import type {
	EnrollmentResponse,
	EnrollmentStatus,
	ProjectResponse,
	ProjectStatus,
} from "@/types/api";
import type { BadgeTone, DiscoverFilters } from "@/types/client";

import {
	DISCOVER_EXCLUDED_ENROLLMENT_STATUSES,
	DISCOVERABLE_PROJECT_STATUSES,
	DISCOVER_PROJECT_STATUS_ORDER,
} from "./constants";

const DISCOVERABLE_PROJECT_STATUS_SET: ReadonlySet<ProjectStatus> = new Set(
	DISCOVERABLE_PROJECT_STATUSES,
);
const DISCOVER_EXCLUDED_ENROLLMENT_STATUS_SET: ReadonlySet<EnrollmentStatus> =
	new Set(DISCOVER_EXCLUDED_ENROLLMENT_STATUSES);

function normalizeDiscoverSearchValue(value: string) {
	return value
		.toLocaleLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
}

export function createDefaultDiscoverFilters(): DiscoverFilters {
	return {
		query: "",
		entityIds: [],
		statuses: [],
	};
}

export function hasDiscoverFilters(filters: DiscoverFilters) {
	return (
		filters.query.trim().length > 0 ||
		filters.entityIds.length > 0 ||
		filters.statuses.length > 0
	);
}

export function filterDiscoverProjects(
	projects: ProjectResponse[],
	filters: DiscoverFilters,
) {
	const query = normalizeDiscoverSearchValue(filters.query.trim());

	return projects.filter(project => {
		if (
			filters.entityIds.length > 0 &&
			!filters.entityIds.includes(project.entity.id)
		) {
			return false;
		}

		if (
			filters.statuses.length > 0 &&
			!filters.statuses.includes(project.status.status)
		) {
			return false;
		}

		if (!query) {
			return true;
		}

		const normalizedName = normalizeDiscoverSearchValue(project.name);
		const normalizedDescription = normalizeDiscoverSearchValue(
			project.description,
		);
		const normalizedEntityName = normalizeDiscoverSearchValue(
			project.entity.name,
		);

		return (
			normalizedName.includes(query) ||
			normalizedDescription.includes(query) ||
			normalizedEntityName.includes(query)
		);
	});
}

export function excludeProjectsWithOngoingEnrollments(
	projects: ProjectResponse[],
	enrollments: EnrollmentResponse[],
) {
	const excludedProjectIds = new Set(
		enrollments
			.filter(enrollment =>
				DISCOVER_EXCLUDED_ENROLLMENT_STATUS_SET.has(enrollment.status.status),
			)
			.map(enrollment => enrollment.projectId),
	);

	return projects.filter(project => !excludedProjectIds.has(project.id));
}

export function getProjectRemainingHours(project: ProjectResponse) {
	const offeredHours = project.projectInfo.offeredHours;
	const completedHours = project.projectInfo.completedHours;

	if (offeredHours == null || completedHours == null) {
		return null;
	}

	return Math.max(offeredHours - completedHours, 0);
}

export function getProjectAvailableSeats(project: ProjectResponse) {
	const maxParticipants = project.projectInfo.maxParticipants;
	const currentParticipants = project.projectInfo.currentParticipants;

	if (maxParticipants == null || currentParticipants == null) {
		return null;
	}

	return Math.max(maxParticipants - currentParticipants, 0);
}

export function hasProjectRemainingHours(project: ProjectResponse) {
	const remainingHours = getProjectRemainingHours(project);

	return remainingHours == null || remainingHours > 0;
}

export function hasProjectAvailableSeats(project: ProjectResponse) {
	const availableSeats = getProjectAvailableSeats(project);

	return availableSeats == null || availableSeats > 0;
}

export function isDiscoverableProject(project: ProjectResponse) {
	return (
		DISCOVERABLE_PROJECT_STATUS_SET.has(project.status.status) &&
		hasProjectRemainingHours(project) &&
		hasProjectAvailableSeats(project)
	);
}

export function sortDiscoverProjects(
	left: ProjectResponse,
	right: ProjectResponse,
) {
	const leftOrder = DISCOVER_PROJECT_STATUS_ORDER[left.status.status];
	const rightOrder = DISCOVER_PROJECT_STATUS_ORDER[right.status.status];

	if (leftOrder !== rightOrder) {
		return leftOrder - rightOrder;
	}

	return left.name.localeCompare(right.name);
}

export function resolveDiscoverProjectStatusTone(
	status: ProjectStatus,
): BadgeTone {
	if (status === "PLANNED") {
		return "brand";
	}
	if (status === "IN_PROGRESS") {
		return "info";
	}
	if (status === "ON_HOLD") {
		return "warning";
	}
	if (status === "CANCELED") {
		return "danger";
	}
	if (status === "COMPLETED") {
		return "success";
	}
	return "neutral";
}

export function resolveDiscoverQueryStateCopy(
	t: TFunction,
	options: {
		hasProfileError: boolean;
		hasProjectError: boolean;
		isProfileLoading: boolean;
		isProjectsLoading: boolean;
		hasAreaOfExpertise: boolean;
		projectCount: number;
	},
) {
	if (options.hasProfileError || options.hasProjectError) {
		return {
			title: t("discover.states.errorTitle"),
			description: t("discover.states.errorDescription"),
			badgeTone: "danger" as const,
		};
	}

	if (options.isProfileLoading || options.isProjectsLoading) {
		return {
			title: t("discover.states.loadingTitle"),
			description: t("discover.states.loadingDescription"),
			badgeTone: "neutral" as const,
		};
	}

	if (!options.hasAreaOfExpertise) {
		return {
			title: t("discover.states.missingAreaTitle"),
			description: t("discover.states.missingAreaDescription"),
			badgeTone: "warning" as const,
		};
	}

	if (options.projectCount === 0) {
		return {
			title: t("discover.states.emptyTitle"),
			description: t("discover.states.emptyDescription"),
			badgeTone: "neutral" as const,
		};
	}

	return null;
}
