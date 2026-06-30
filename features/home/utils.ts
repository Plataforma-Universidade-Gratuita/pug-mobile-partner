import { FolderKanban, QrCode, Search, UserRound } from "lucide-react-native";

import type {
	AttendanceComplexSearchItem,
	AttendanceStatus,
	EnrollmentResponse,
	EnrollmentStatus,
	ProjectResponse,
} from "@/types/api";
import type {
	HomeQuickActionBuildArgs,
	HomeActivitySnapshotCardProps,
	HomeQuickActionItem,
	HomeSnapshotCardBuildArgs,
	PrimitiveBadgeProps,
} from "@/types/client";

const ACTIVE_ENROLLMENT_STATUSES = new Set<EnrollmentStatus>([
	"APPROVED",
	"ON_HOLD",
]);
const PENDING_ENROLLMENT_STATUSES = new Set<EnrollmentStatus>(["PENDING"]);

export function countHomeActiveEnrollments(items: EnrollmentResponse[]) {
	return items.filter(item =>
		ACTIVE_ENROLLMENT_STATUSES.has(item.status.status),
	).length;
}

export function countHomePendingEnrollments(items: EnrollmentResponse[]) {
	return items.filter(item =>
		PENDING_ENROLLMENT_STATUSES.has(item.status.status),
	).length;
}

export function findLatestEnrollment(items: EnrollmentResponse[]) {
	return (
		[...items].sort((left, right) => {
			return (
				Date.parse(right.enrollmentInfo.auditInfo.createdAt) -
				Date.parse(left.enrollmentInfo.auditInfo.createdAt)
			);
		})[0] ?? null
	);
}

export function findLatestAttendance(items: AttendanceComplexSearchItem[]) {
	return (
		[...items].sort((left, right) => {
			return (
				Date.parse(right.attendanceInfo.auditInfo.createdAt) -
				Date.parse(left.attendanceInfo.auditInfo.createdAt)
			);
		})[0] ?? null
	);
}

export function resolveHomeEnrollmentStatusTone(
	status: EnrollmentStatus,
): PrimitiveBadgeProps["tone"] {
	switch (status) {
		case "APPROVED":
		case "COMPLETED":
			return "success";
		case "ON_HOLD":
			return "warning";
		case "REJECTED":
		case "CANCELED":
		case "REMOVED":
		case "EXITED":
			return "danger";
		case "PENDING":
		default:
			return "info";
	}
}

export function resolveHomeAttendanceStatusTone(
	status: AttendanceStatus,
): PrimitiveBadgeProps["tone"] {
	switch (status) {
		case "PRESENT":
			return "success";
		case "ABSENT":
			return "warning";
		case "WAITING":
		default:
			return "info";
	}
}

export function resolveHomeEnrollmentProjectName(
	projectId: string,
	projectsById: Map<string, ProjectResponse>,
	fallback: string,
) {
	return projectsById.get(projectId)?.name ?? fallback;
}

export function formatHomeProgressValue(
	progress: number | null | undefined,
	t: HomeQuickActionBuildArgs["t"],
) {
	return t("home.summary.progressValue", {
		value: Math.round(progress ?? 0),
	});
}

export function buildHomeSummaryMetrics({
	activeEnrollments,
	pendingEnrollments,
	attendanceCount,
	t,
}: {
	activeEnrollments: number;
	pendingEnrollments: number;
	attendanceCount: number;
	t: HomeQuickActionBuildArgs["t"];
}) {
	return [
		{
			label: t("home.summary.activeEnrollments"),
			value: String(activeEnrollments),
		},
		{
			label: t("home.summary.pendingEnrollments"),
			value: String(pendingEnrollments),
		},
		{
			label: t("home.summary.attendances"),
			value: String(attendanceCount),
		},
	];
}

export function buildQuickActionItems({
	latestAttendanceId,
	onAttendancesPress,
	onDiscoverPress,
	onEnrollmentsPress,
	onLatestQrPress,
	onProfilePress,
	t,
}: HomeQuickActionBuildArgs): HomeQuickActionItem[] {
	const items: HomeQuickActionItem[] = [
		{
			icon: Search,
			label: t("home.actions.discover"),
			helper: t("home.actions.discoverHelper"),
			onPress: onDiscoverPress,
		},
		{
			icon: FolderKanban,
			label: t("home.actions.enrollments"),
			helper: t("home.actions.enrollmentsHelper"),
			onPress: onEnrollmentsPress,
		},
		{
			icon: QrCode,
			label: t("home.actions.attendances"),
			helper: t("home.actions.attendancesHelper"),
			onPress: onAttendancesPress,
		},
		{
			icon: UserRound,
			label: t("home.actions.profile"),
			helper: t("home.actions.profileHelper"),
			onPress: onProfilePress,
		},
	];

	if (latestAttendanceId !== null) {
		items.push({
			icon: QrCode,
			label: t("home.actions.latestQr"),
			helper: t("home.actions.latestQrHelper"),
			onPress: onLatestQrPress,
		});
	}

	return items;
}

export function buildHomeEnrollmentSnapshotCard({
	latestEnrollment,
	onOpenEnrollment,
	projectsById,
	t,
}: HomeSnapshotCardBuildArgs): HomeActivitySnapshotCardProps {
	return {
		badgeLabel:
			latestEnrollment?.status.statusFormatted ?? t("home.states.emptyBadge"),
		badgeTone: latestEnrollment
			? resolveHomeEnrollmentStatusTone(latestEnrollment.status.status)
			: "neutral",
		ctaLabel: latestEnrollment ? t("home.actions.openEnrollment") : null,
		description: latestEnrollment
			? t("home.recent.latestEnrollmentDescription", {
					createdAt:
						latestEnrollment.enrollmentInfo.auditInfo.createdAtFormatted,
				})
			: t("home.recent.emptyEnrollmentDescription"),
		eyebrow: t("home.recent.latestEnrollment"),
		onPress: latestEnrollment
			? () => {
					onOpenEnrollment(latestEnrollment.projectId);
				}
			: undefined,
		title: latestEnrollment
			? resolveHomeEnrollmentProjectName(
					latestEnrollment.projectId,
					projectsById,
					t("home.values.projectUnavailable"),
				)
			: t("home.recent.emptyEnrollmentTitle"),
	};
}

export function buildHomeAttendanceSnapshotCard({
	latestAttendance,
	onOpenAttendance,
	t,
}: HomeSnapshotCardBuildArgs): HomeActivitySnapshotCardProps {
	return {
		badgeLabel:
			latestAttendance?.status.statusFormatted ?? t("home.states.emptyBadge"),
		badgeTone: latestAttendance
			? resolveHomeAttendanceStatusTone(latestAttendance.status.status)
			: "neutral",
		ctaLabel: latestAttendance ? t("home.actions.openAttendance") : null,
		description: latestAttendance
			? t("home.recent.latestAttendanceDescription", {
					createdAt:
						latestAttendance.attendanceInfo.auditInfo.createdAtFormatted,
				})
			: t("home.recent.emptyAttendanceDescription"),
		eyebrow: t("home.recent.latestAttendance"),
		onPress: latestAttendance
			? () => {
					onOpenAttendance(latestAttendance.id);
				}
			: undefined,
		title:
			latestAttendance?.project.name ?? t("home.recent.emptyAttendanceTitle"),
	};
}
