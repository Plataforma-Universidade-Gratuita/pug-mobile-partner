
import type {
	EnrollmentResponse,
	EnrollmentStatus,
	ProjectStatus,
} from "@/types/api";
import type { BadgeTone } from "@/types/client";

import {
	ACTIVE_PARTICIPANT_STATUSES,
	MANAGEABLE_ENROLLMENT_STATUSES,
} from "./constants";

const activeParticipantStatusSet = new Set<EnrollmentStatus>(
	ACTIVE_PARTICIPANT_STATUSES,
);
const manageableEnrollmentStatusSet = new Set<EnrollmentStatus>(
	MANAGEABLE_ENROLLMENT_STATUSES,
);

export function countActiveParticipants(enrollments: EnrollmentResponse[]) {
	return enrollments.filter(enrollment =>
		activeParticipantStatusSet.has(enrollment.status.status),
	).length;
}

export function getProjectCompletionRatio(
	completedHours: number | null,
	offeredHours: number | null,
) {
	if (
		completedHours == null ||
		offeredHours == null ||
		!Number.isFinite(completedHours) ||
		!Number.isFinite(offeredHours) ||
		offeredHours <= 0
	) {
		return 0;
	}

	return Math.min(Math.max(completedHours / offeredHours, 0), 1);
}

export function canManageEnrollment(
	status: EnrollmentStatus | null | undefined,
) {
	return status != null && manageableEnrollmentStatusSet.has(status);
}

export function resolveProjectDetailStatusTone(
	status: ProjectStatus,
): BadgeTone {
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

export function resolveOptionalText(
	value: string | null | undefined,
	fallback: string,
) {
	if (value == null) {
		return fallback;
	}

	const trimmed = value.trim();
	return trimmed.length > 0 ? trimmed : fallback;
}

export function resolveOptionalNumberText(
	value: number | null | undefined,
	fallback: string,
) {
	return value == null ? fallback : String(value);
}
