
import type {
	AttendanceCreateRequest,
	AttendanceStatus,
	AttendanceValidateRequest,
} from "@/types/api";

export type AttendanceEditorMode = "create" | "update";

export interface AttendanceComplexSearchFilters {
	projectIds: string[];
	formerStudentIds: string[];
	statuses: AttendanceStatus[];
	validatedByIds: string[];
	durationFrom: string;
	durationTo: string;
	dateFrom: string;
	dateTo: string;
}

export interface AttendanceCreateMutationVariables {
	body: AttendanceCreateRequest;
}

export interface AttendanceRemoveMutationVariables {
	id: string;
}

export interface AttendanceValidateMutationVariables {
	body: AttendanceValidateRequest;
	id: string;
}
