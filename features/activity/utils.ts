import type { TFunction } from "i18next";

import type {
	AttendanceStatus,
	EnrollmentResponse,
	EnrollmentStatus,
	ProjectResponse,
} from "@/types/api";
import type {
	ActivityAttendanceItem,
	ActivityEnrollmentItem,
	ActivityFilterStatusOption,
	ActivityFilters,
	ActivityStateCopy,
	ActivityTab,
	BadgeTone,
} from "@/types/client";

import {
	ACTIVE_ENROLLMENT_STATUSES,
	ATTENDANCE_STATUS_ORDER,
	ENROLLMENT_STATUS_ORDER,
	PENDING_ENROLLMENT_STATUS,
} from "./constants";

const activeEnrollmentStatusSet = new Set<EnrollmentStatus>(
	ACTIVE_ENROLLMENT_STATUSES,
);

function normalizeActivitySearchValue(value: string) {
	return value
		.toLocaleLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
}

export function createDefaultActivityFilters(): ActivityFilters {
	return {
		query: "",
		enrollmentStatuses: [],
		attendanceStatuses: [],
	};
}

export function hasActiveActivityFilters(filters: ActivityFilters) {
	return (
		filters.query.trim().length > 0 ||
		filters.enrollmentStatuses.length > 0 ||
		filters.attendanceStatuses.length > 0
	);
}

export function countActiveEnrollments(enrollments: EnrollmentResponse[]) {
	return enrollments.filter(enrollment =>
		activeEnrollmentStatusSet.has(enrollment.status.status),
	).length;
}

export function countPendingEnrollments(enrollments: EnrollmentResponse[]) {
	return enrollments.filter(
		enrollment => enrollment.status.status === PENDING_ENROLLMENT_STATUS,
	).length;
}

export function sortActivityEnrollmentItems(
	left: ActivityEnrollmentItem,
	right: ActivityEnrollmentItem,
) {
	return (left.project?.name ?? "").localeCompare(right.project?.name ?? "");
}

export function sortActivityAttendanceItems(
	left: ActivityAttendanceItem,
	right: ActivityAttendanceItem,
) {
	const leftOrder = ATTENDANCE_STATUS_ORDER[left.attendance.status.status];
	const rightOrder = ATTENDANCE_STATUS_ORDER[right.attendance.status.status];

	if (leftOrder !== rightOrder) {
		return leftOrder - rightOrder;
	}

	const leftDate = left.attendance.attendanceInfo.auditInfo.createdAt ?? "";
	const rightDate = right.attendance.attendanceInfo.auditInfo.createdAt ?? "";

	return rightDate.localeCompare(leftDate);
}

export function buildEnrollmentStatusOptions(
	items: ActivityEnrollmentItem[],
): ActivityFilterStatusOption[] {
	const optionMap = new Map<EnrollmentStatus, string>();

	for (const item of items) {
		optionMap.set(
			item.enrollment.status.status,
			resolveActivityEnrollmentStatusLabel(
				item.enrollment.status.statusFormatted,
			),
		);
	}

	return [...optionMap.entries()]
		.sort((left, right) => {
			const leftIndex = ENROLLMENT_STATUS_ORDER.indexOf(left[0]);
			const rightIndex = ENROLLMENT_STATUS_ORDER.indexOf(right[0]);

			if (leftIndex === -1 || rightIndex === -1) {
				return left[1].localeCompare(right[1]);
			}

			return leftIndex - rightIndex;
		})
		.map(([value, label]) => ({
			value,
			label,
		}));
}

export function buildAttendanceStatusOptions(
	items: ActivityAttendanceItem[],
): ActivityFilterStatusOption[] {
	const optionMap = new Map<AttendanceStatus, string>();

	for (const item of items) {
		optionMap.set(
			item.attendance.status.status,
			resolveActivityAttendanceStatusLabel(
				item.attendance.status.statusFormatted,
			),
		);
	}

	return [...optionMap.entries()]
		.sort(
			(left, right) =>
				ATTENDANCE_STATUS_ORDER[left[0]] - ATTENDANCE_STATUS_ORDER[right[0]],
		)
		.map(([value, label]) => ({
			value,
			label,
		}));
}

function matchesQuery(value: string, query: string) {
	return normalizeActivitySearchValue(value).includes(query);
}

export function filterActivityEnrollmentItems(
	items: ActivityEnrollmentItem[],
	filters: ActivityFilters,
) {
	const query = normalizeActivitySearchValue(filters.query.trim());

	return items.filter(item => {
		if (
			filters.enrollmentStatuses.length > 0 &&
			!filters.enrollmentStatuses.includes(item.enrollment.status.status)
		) {
			return false;
		}

		if (!query) {
			return true;
		}

		const haystack = [
			item.project?.name ?? "",
			item.project?.entity.name ?? "",
		].join(" ");

		return matchesQuery(haystack, query);
	});
}

export function applyActivityAttendanceFilters(
	items: ActivityAttendanceItem[],
	filters: ActivityFilters,
) {
	const query = normalizeActivitySearchValue(filters.query.trim());

	return items.filter(item => {
		if (
			filters.attendanceStatuses.length > 0 &&
			!filters.attendanceStatuses.includes(item.attendance.status.status)
		) {
			return false;
		}

		if (!query) {
			return true;
		}

		const haystack = item.project?.name ?? item.attendance.project.name;

		return matchesQuery(haystack, query);
	});
}

export function resolveActivityEnrollmentStatusLabel(label: string) {
	return label;
}

export function resolveActivityAttendanceStatusLabel(label: string) {
	if (label === "Waiting validation") {
		return "Waiting";
	}

	if (label === "Aguardando valida??o") {
		return "Aguardando";
	}

	return label;
}

export function resolveEnrollmentStatusTone(
	status: EnrollmentStatus,
): BadgeTone {
	if (status === "COMPLETED") {
		return "success";
	}
	if (status === "APPROVED") {
		return "info";
	}
	if (status === "PENDING") {
		return "brand";
	}
	if (status === "ON_HOLD" || status === "CANCELED") {
		return "warning";
	}
	if (status === "EXITED" || status === "REJECTED" || status === "REMOVED") {
		return "danger";
	}
	return "neutral";
}

export function resolveAttendanceStatusTone(
	status: AttendanceStatus,
): BadgeTone {
	if (status === "PRESENT") {
		return "success";
	}

	if (status === "WAITING") {
		return "warning";
	}

	if (status === "ABSENT") {
		return "danger";
	}

	return "neutral";
}

export function buildActivitySummaryCopy(options: {
	activeCount: number;
	pendingCount: number;
	attendanceCount: number;
	tab: ActivityTab;
	t: TFunction;
}) {
	if (options.tab === "attendances") {
		return {
			title: options.t("activity.focus.attendancesTitle", {
				count: options.attendanceCount,
			}),
			description: options.t("activity.focus.attendancesDescription"),
			chips: [
				options.t("activity.chips.waiting"),
				options.t("activity.chips.recent"),
			],
		};
	}

	if (options.pendingCount > 0) {
		return {
			title: options.t("activity.focus.pendingTitle", {
				count: options.pendingCount,
			}),
			description: options.t("activity.focus.pendingDescription"),
			chips: [
				options.t("activity.chips.active"),
				options.t("activity.chips.pending"),
			],
		};
	}

	return {
		title: options.t("activity.focus.activeTitle", {
			count: options.activeCount,
		}),
		description: options.t("activity.focus.activeDescription"),
		chips: [
			options.t("activity.chips.active"),
			options.t("activity.chips.needsAttendance"),
		],
	};
}

export function resolveActivityStateCopy(options: {
	activeTab: ActivityTab;
	hasActiveFilters: boolean;
	hasQueryError: boolean;
	isInitialLoading: boolean;
	t: TFunction;
	visibleAttendanceCount: number;
	visibleEnrollmentCount: number;
}): ActivityStateCopy | null {
	if (options.hasQueryError) {
		return {
			title: options.t("activity.states.errorTitle"),
			description: options.t("activity.states.errorDescription"),
			badgeTone: "danger",
		};
	}

	if (options.isInitialLoading) {
		return {
			title: options.t("activity.states.loadingTitle"),
			description: options.t("activity.states.loadingDescription"),
			badgeTone: "neutral",
		};
	}

	if (
		options.activeTab === "enrollments" &&
		options.visibleEnrollmentCount === 0
	) {
		return {
			title: options.hasActiveFilters
				? options.t("activity.states.filteredEmptyEnrollmentsTitle")
				: options.t("activity.states.emptyEnrollmentsTitle"),
			description: options.hasActiveFilters
				? options.t("activity.states.filteredEmptyEnrollmentsDescription")
				: options.t("activity.states.emptyEnrollmentsDescription"),
			badgeTone: "neutral",
		};
	}

	if (
		options.activeTab === "attendances" &&
		options.visibleAttendanceCount === 0
	) {
		return {
			title: options.hasActiveFilters
				? options.t("activity.states.filteredEmptyAttendancesTitle")
				: options.t("activity.states.emptyAttendancesTitle"),
			description: options.hasActiveFilters
				? options.t("activity.states.filteredEmptyAttendancesDescription")
				: options.t("activity.states.emptyAttendancesDescription"),
			badgeTone: "neutral",
		};
	}

	return null;
}

export function resolveProjectName(
	project: ProjectResponse | null,
	fallback: string,
) {
	return project?.name ?? fallback;
}
