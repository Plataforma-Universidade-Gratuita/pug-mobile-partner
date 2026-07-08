
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
