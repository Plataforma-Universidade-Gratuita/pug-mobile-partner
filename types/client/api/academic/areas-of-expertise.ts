/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import type {
	AreaOfExpertiseCreateRequest,
	AreaOfExpertiseUpdateRequest,
} from "@/types/api";

export interface AreaOfExpertiseCreateMutationVariables {
	body: AreaOfExpertiseCreateRequest;
}

export interface AreaOfExpertiseUpdateMutationVariables {
	id: string;
	body: AreaOfExpertiseUpdateRequest;
}

export interface RemoveAreaOfExpertiseMutationVariables {
	id: string;
}
