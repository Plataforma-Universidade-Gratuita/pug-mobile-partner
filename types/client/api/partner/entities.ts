
import type { EntityCreateRequest, EntityUpdateRequest } from "@/types/api";

export type EntityEditorMode = "create" | "duplicate" | "update";

export interface EntityComplexSearchFilters {
	cityIdsFilter: string[];
	dateFrom: string;
	dateTo: string;
}

export interface EntityCreateMutationVariables {
	body: EntityCreateRequest;
}

export interface EntityUpdateMutationVariables {
	id: string;
	body: EntityUpdateRequest;
}

export interface RemoveEntityMutationVariables {
	id: string;
}

export interface UseEntitiesSearchQueryFilters {
	cityIdsFilter: string[];
	dateFrom: string;
	dateTo: string;
}
