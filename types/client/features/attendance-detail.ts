import type { AttendanceComplexSearchItem } from "@/types/api";
import type { BadgeTone } from "@/types/client";

export interface AttendanceDetailStateCardProps {
	badgeLabel: string;
	description: string;
	title: string;
	tone: NonNullable<BadgeTone>;
}

export interface AttendanceDetailContentProps {
	attendance: AttendanceComplexSearchItem;
	isLoading?: boolean;
	statusTone: BadgeTone;
	t: (...args: any[]) => any;
}
