/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import type { EnrollmentStatus } from "@/types/api";

export type EnrollmentStatusAction =
	| "accept"
	| "cancel"
	| "complete"
	| "reject"
	| "remove";

export type EnrollmentEditorMode = "create" | "update";

export interface EnrollmentComplexSearchFilters {
	projectIds: string[];
	formerStudentIds: string[];
	statuses: EnrollmentStatus[];
	dateFrom: string;
	dateTo: string;
	periodFrom: string;
	periodTo: string;
}

export interface EnrollmentDeleteMutationVariables {
	projectId: string;
	formerStudentId: string;
}

export interface EnrollmentCreateMutationVariables {
	projectId: string;
	formerStudentId?: string;
}

export interface EnrollmentStatusMutationVariables {
	action: EnrollmentStatusAction;
	projectId: string;
	formerStudentId: string;
}

export interface EnrollmentMyStatusMutationVariables {
	projectId: string;
	status: EnrollmentStatus;
}
