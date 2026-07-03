/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import type { StaffCreateRequest, StaffUpdateRequest } from "@/types/api";

export type StaffEditorMode = "create" | "duplicate" | "update";

export interface StaffComplexSearchFilters {
	name: string;
	cpf: string;
	email: string;
	dateFrom: string;
	dateTo: string;
	activeOnly: boolean;
	entityIds: string[];
}

export interface StaffCreateMutationVariables {
	body: StaffCreateRequest;
}

export interface StaffUpdateMutationVariables {
	id: string;
	body: StaffUpdateRequest;
}

export interface StaffSetActiveMutationVariables {
	id: string;
	active: boolean;
}

export interface StaffRemoveMutationVariables {
	accountId: string;
	userId: string;
}

export interface PatchStaffCachesArgs {
	accountId: string;
	accountActive: boolean;
}
