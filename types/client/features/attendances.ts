
import type { AttendanceStatus, EnrollmentStatus } from "@/types/api";
import type { BadgeTone } from "@/types/client";

export interface AttendanceHistoryCardProps {
	projectName: string;
	statusLabel: string;
	statusTone: BadgeTone;
	durationLabel: string;
	dateLabel: string;
	onPress: () => void;
	isLoading?: boolean;
}

export interface AttendanceStatusToneResolver {
	(status: AttendanceStatus): BadgeTone;
}

export interface EnrollmentStatusToneResolver {
	(status: EnrollmentStatus): BadgeTone;
}
