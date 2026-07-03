/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import type { AttendanceStatus, EnrollmentStatus } from "@/types/api";
import type { BadgeTone } from "@/types/client";

export function resolveAttendanceStatusTone(
	status: AttendanceStatus,
): BadgeTone {
	if (status === "PRESENT") {
		return "success";
	}

	if (status === "WAITING") {
		return "warning";
	}

	if (status === "ABSENT") {
		return "danger";
	}

	return "neutral";
}

export function resolveEnrollmentStatusTone(
	status: EnrollmentStatus,
): BadgeTone {
	if (status === "COMPLETED") {
		return "success";
	}

	if (status === "APPROVED") {
		return "info";
	}

	if (status === "PENDING") {
		return "brand";
	}

	if (status === "ON_HOLD" || status === "CANCELED") {
		return "warning";
	}

	if (status === "EXITED" || status === "REJECTED" || status === "REMOVED") {
		return "danger";
	}

	return "neutral";
}
