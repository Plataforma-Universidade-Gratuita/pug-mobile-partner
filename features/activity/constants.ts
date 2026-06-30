import type { AttendanceStatus, EnrollmentStatus } from "@/types/api";

export const ACTIVE_ENROLLMENT_STATUSES: EnrollmentStatus[] = [
	"APPROVED",
	"ON_HOLD",
];

export const PENDING_ENROLLMENT_STATUS = "PENDING" as const;

export const ENROLLMENT_STATUS_ORDER: EnrollmentStatus[] = [
	"PENDING",
	"APPROVED",
	"ON_HOLD",
	"COMPLETED",
	"EXITED",
	"CANCELED",
	"REJECTED",
	"REMOVED",
];

export const ATTENDANCE_STATUS_ORDER: Record<AttendanceStatus, number> = {
	WAITING: 0,
	PRESENT: 1,
	ABSENT: 2,
};
