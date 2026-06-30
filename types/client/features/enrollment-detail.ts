import type { AttendanceComplexSearchItem, ProjectStatus } from "@/types/api";
import type { BadgeTone } from "@/types/client";

export interface EnrollmentDetailScreenProps {
	projectId?: string | null;
}

export interface EnrollmentDetailContentProps {
	attendanceItems: AttendanceComplexSearchItem[];
	contentBottomPadding: number;
	hasEnrollment: boolean;
	hasQueryError: boolean;
	isInitialLoading: boolean;
	isRefreshing: boolean;
	onOpenProject: () => void;
	onRefresh: () => void;
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
	description: string;
	onOpenProject: () => void;
	progressRatio: number;
	progressValueLabel: string;
	statusLabel: string;
	statusTone: BadgeTone;
	title: string;
	viewProjectLabel: string;
}
