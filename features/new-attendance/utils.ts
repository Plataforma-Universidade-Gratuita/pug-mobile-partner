import * as api from "@/api";
import type { EnrollmentResponse, ProjectResponse } from "@/types/api";
import type {
	AppResolvedTheme,
	NewAttendanceProjectOption,
	PrimitiveSurfaceStyleSpec,
} from "@/types/client";
import { withAlpha } from "@/utils";

import { ATTENDANCE_ELIGIBLE_ENROLLMENT_STATUS } from "./constants";

const { ApiError } = api;

export function buildNewAttendanceProjectOptions(
	enrollments: EnrollmentResponse[],
	projectsById: Map<string, ProjectResponse>,
): NewAttendanceProjectOption[] {
	return enrollments
		.filter(
			enrollment =>
				enrollment.status.status === ATTENDANCE_ELIGIBLE_ENROLLMENT_STATUS,
		)
		.map(enrollment => {
			const project = projectsById.get(enrollment.projectId);

			return project
				? {
						projectId: project.id,
						projectName: project.name,
						entityName: project.entity.name,
						project,
						enrollment,
					}
				: null;
		})
		.filter(option => option !== null)
		.sort((left, right) => left.projectName.localeCompare(right.projectName));
}

export function resolveInitialProjectId(
	requestedProjectId: string | null,
	options: NewAttendanceProjectOption[],
) {
	if (requestedProjectId) {
		return options.some(option => option.projectId === requestedProjectId)
			? requestedProjectId
			: null;
	}

	return options.length === 1 ? options[0]!.projectId : null;
}

export function parseAttendanceDuration(value: string) {
	return Number(value.trim());
}

export function resolveNewAttendanceErrorMessageWithFallback(
	error: unknown,
	fallback: string,
) {
	if (error instanceof ApiError) {
		return error.message;
	}

	if (error instanceof Error && error.message) {
		return error.message;
	}

	return fallback;
}

export function createProjectOptionStyle(
	theme: AppResolvedTheme,
	spec: PrimitiveSurfaceStyleSpec,
	options: {
		disabled: boolean;
		isLocked: boolean;
		isSelected: boolean;
		pressed: boolean;
	},
) {
	const borderColor = options.isSelected
		? withAlpha(theme.colors.brand, theme.mode === "dark" ? 0.58 : 0.42)
		: spec.panelBorder;
	const backgroundColor = options.pressed
		? withAlpha(theme.colors.text, theme.mode === "dark" ? 0.08 : 0.04)
		: options.isSelected
			? withAlpha(theme.colors.brand, theme.mode === "dark" ? 0.16 : 0.1)
			: theme.colors.surface2;

	return {
		backgroundColor,
		borderColor,
		opacity: options.disabled ? 0.72 : 1,
	};
}
