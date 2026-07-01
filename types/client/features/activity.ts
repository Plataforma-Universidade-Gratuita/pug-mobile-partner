import type {
	AttendanceComplexSearchItem,
	AttendanceStatus,
	EnrollmentResponse,
	EnrollmentStatus,
	ProjectResponse,
} from "@/types/api";
import type { BadgeTone } from "@/types/client";

export type ActivityTab = "enrollments" | "attendances";

export interface ActivityFilters {
	query: string;
	enrollmentStatuses: EnrollmentStatus[];
	attendanceStatuses: AttendanceStatus[];
}

export interface ActivityFilterStatusOption {
	value: string;
	label: string;
}

export interface ActivityFilterSheetProps {
	visible: boolean;
	activeTab: ActivityTab;
	filters: ActivityFilters;
	statusOptions: ActivityFilterStatusOption[];
	onApply: (filters: ActivityFilters) => void;
	onDismiss: () => void;
}

export interface ActivityHeaderActionsProps {
	disabled: boolean;
	onOpenFilters: () => void;
}

export interface ActivityFloatingCtaProps {
	bottomOffset: number;
	disabled: boolean;
	onPress: () => void;
}

export interface ActivityEnrollmentCardProps {
	projectName: string;
	statusLabel: string;
	statusTone: BadgeTone;
	metaLabel: string;
	onPress: () => void;
	isLoading?: boolean;
}

export interface ActivityAttendanceCardProps {
	projectName: string;
	statusLabel: string;
	statusTone: BadgeTone;
	durationLabel: string;
	dateLabel: string;
	onPress: () => void;
	isLoading?: boolean;
}

export interface ActivitySummarySectionProps {
	activeCount: string;
	pendingCount: string;
	attendanceCount: string;
	focusTitle: string;
	focusDescription: string;
	chipLabels: string[];
	isLoading?: boolean;
}

export interface ActivitySegmentedControlProps {
	activeTab: ActivityTab;
	onTabChange: (tab: ActivityTab) => void;
}

export interface ActivityEnrollmentItem {
	enrollment: EnrollmentResponse;
	project: ProjectResponse | null;
}

export interface ActivityAttendanceItem {
	attendance: AttendanceComplexSearchItem;
	project: ProjectResponse | null;
}

export interface ActivityStateCardProps {
	badgeLabel: string;
	description: string;
	title: string;
	tone: NonNullable<BadgeTone>;
}

export interface ActivityStateCopy {
	badgeTone: NonNullable<BadgeTone>;
	description: string;
	title: string;
}

export interface ActivityListSectionProps {
	activeTab: ActivityTab;
	attendanceItems: ActivityAttendanceItem[];
	enrollmentItems: ActivityEnrollmentItem[];
	resolveAttendanceStatusLabel: (label: string) => string;
	resolveAttendanceStatusTone: (status: AttendanceStatus) => BadgeTone;
	resolveEnrollmentStatusLabel: (label: string) => string;
	resolveEnrollmentStatusTone: (status: EnrollmentStatus) => BadgeTone;
	resolveProjectName: (
		project: ProjectResponse | null,
		fallback: string,
	) => string;
	t: (...args: any[]) => any;
	isLoading?: boolean;
}
