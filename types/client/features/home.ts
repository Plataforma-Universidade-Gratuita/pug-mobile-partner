import type { LucideIcon } from "lucide-react-native";

import type {
	AttendanceComplexSearchItem,
	EnrollmentResponse,
	ProjectResponse,
} from "@/types/api";
import type { PrimitiveBadgeProps } from "@/types/client/components";

export interface HomeSummaryMetricItem {
	label: string;
	value: string;
}

export interface HomeCounterpartSummaryCardProps {
	badgeLabel: string;
	courseLabel: string;
	dueDateLabel: string;
	name: string;
	progressLabel: string;
	progressRatio: number;
	remainingDaysLabel: string;
	summaryMetrics: HomeSummaryMetricItem[];
}

export interface HomeQuickActionItem {
	helper: string;
	icon: LucideIcon;
	label: string;
	onPress: () => void;
}

export interface HomeQuickActionsSectionProps {
	items: HomeQuickActionItem[];
}

export interface HomeActivitySnapshotCardProps {
	badgeLabel: string;
	badgeTone: PrimitiveBadgeProps["tone"];
	ctaLabel: string | null;
	description: string;
	eyebrow: string;
	onPress?: (() => void) | undefined;
	title: string;
}

export interface HomeQuickActionBuildArgs {
	latestAttendanceId: string | null;
	onAttendancesPress: () => void;
	onDiscoverPress: () => void;
	onEnrollmentsPress: () => void;
	onLatestQrPress: () => void;
	onProfilePress: () => void;
	t: (...args: any[]) => any;
}

export interface HomeStateCardProps {
	badgeLabel: string;
	description: string;
	title: string;
	tone: NonNullable<PrimitiveBadgeProps["tone"]>;
}

export interface HomeRecentSectionProps {
	attendanceCard: HomeActivitySnapshotCardProps;
	enrollmentCard: HomeActivitySnapshotCardProps;
	helper: string;
	title: string;
}

export interface HomeSnapshotCardBuildArgs {
	latestAttendance: AttendanceComplexSearchItem | null;
	latestEnrollment: EnrollmentResponse | null;
	onOpenAttendance: (attendanceId: string) => void;
	onOpenEnrollment: (projectId: string) => void;
	projectsById: Map<string, ProjectResponse>;
	t: (...args: any[]) => any;
}
