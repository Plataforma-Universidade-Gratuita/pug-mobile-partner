
import type {
	AttendanceComplexSearchItem,
	EnrollmentStatus,
	ProjectStatus,
} from "@/types/api";
import type { BadgeTone } from "@/types/client";

export interface EnrollmentDetailScreenProps {
	projectId?: string | null;
}

export interface EnrollmentDetailContentProps {
	attendanceItems: AttendanceComplexSearchItem[];
	canManage: boolean;
	contentBottomPadding: number;
	disabled: boolean;
	hasEnrollment: boolean;
	hasQueryError: boolean;
	isInitialLoading: boolean;
	isRefreshing: boolean;
	onManage: () => void;
	onOpenProject: () => void;
	onRefresh: () => void;
	enrollmentStatus: {
		status: EnrollmentStatus;
		statusFormatted: string;
	} | null;
	project: {
		description: string;
		id: string;
		name: string;
		projectInfo: {
			completedHours: number | null;
			offeredHours: number | null;
		};
		status: {
			status: ProjectStatus;
			statusFormatted: string;
		};
	} | null;
	t: (...args: any[]) => any;
	themeBrandColor: string;
}

export interface EnrollmentProjectCardProps {
	canManage: boolean;
	description: string;
	disabled: boolean;
	isLoading?: boolean;
	onManage: () => void;
	onOpenProject: () => void;
	progressRatio: number;
	progressValueLabel: string;
	statusLabel: string;
	statusTone: BadgeTone;
	title: string;
	viewProjectLabel: string;
}
