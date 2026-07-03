/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import type {
	ProjectCreateRequest,
	ProjectStatus,
	ProjectUpdateRequest,
} from "@/types/api";

export type ProjectEditorMode = "create" | "duplicate" | "update";

export type ProjectStatusAction =
	| "cancel"
	| "complete"
	| "hold"
	| "retake"
	| "start";

export interface ProjectComplexSearchFilters {
	name: string;
	entityIds: string[];
	description: string;
	createdByIds: string[];
	statuses: ProjectStatus[];
	maxOfferedHours: string;
	minOfferedHours: string;
	dateFrom: string;
	dateTo: string;
	areaOfExpertiseIds: string[];
	availability: boolean;
}

export interface ProjectCreateMutationVariables {
	body: ProjectCreateRequest;
}

export interface ProjectUpdateMutationVariables {
	body: ProjectUpdateRequest;
	id: string;
}

export interface ProjectRemoveMutationVariables {
	id: string;
}

export interface ProjectStatusMutationVariables {
	action: ProjectStatusAction;
	id: string;
}
