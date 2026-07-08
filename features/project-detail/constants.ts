
import type { EnrollmentStatus } from "@/types/api";

export const ACTIVE_PARTICIPANT_STATUSES = [
	"APPROVED",
	"ON_HOLD",
] satisfies EnrollmentStatus[];

export const MANAGEABLE_ENROLLMENT_STATUSES = [
	"APPROVED",
] satisfies EnrollmentStatus[];

export const PROJECT_DETAIL_STICKY_CTA_CLEARANCE = 88;
