/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
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
