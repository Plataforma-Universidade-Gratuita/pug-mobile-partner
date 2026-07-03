/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import type { UseFormReturn } from "react-hook-form";

import type {
	AccountResponse,
	Campi,
	CourseResponse,
	FormerStudentCreateRequest,
	FormerStudentResponse,
	FormerStudentUpdateRequest,
	UserResponse,
} from "@/types/api";
import type {
	BadgeTone,
	ComboboxOption,
	CpfFormFieldExistingUser,
} from "@/types/client";

export type FormerStudentEditorMode = "create" | "duplicate" | "update";

export interface FormerStudentPageProps {
	formerStudentId: string;
}

export interface FormerStudentRoutePageProps {
	params: Promise<{
		formerStudentId: string;
	}>;
}

export interface FormerStudentSecondaryFilters {
	name: string;
	cpf: string;
	email: string;
	academicRegistration: string;
	activeOnly: boolean;
	campi: Campi[];
	courseIds: string[];
	areaOfExpertiseIds: string[];
	includeConcluded: boolean;
	periodFrom: string;
	periodTo: string;
	dateFrom: string;
	dateTo: string;
}

export interface FormerStudentEditorFormValues {
	cpf: string;
	name: string;
	email: string;
	academicRegistration: string;
	campus: Campi;
	courseId: string;
	requiredHours: string;
	startDate: string;
	dueDate: string;
}

export interface FormerStudentDirectoryItem extends FormerStudentResponse {
	account: AccountResponse | null;
	course: CourseResponse | null;
	user: UserResponse | null;
}

export interface FormerStudentCreateMutationVariables {
	body: FormerStudentCreateRequest;
}

export interface FormerStudentUpdateMutationVariables {
	id: string;
	body: FormerStudentUpdateRequest;
}

export interface FormerStudentSetActiveMutationVariables {
	id: string;
	active: boolean;
}

export interface RemoveFormerStudentMutationVariables {
	accountId: string;
	userId: string;
}

export interface FormerStudentEditorDrawerProps {
	mode: FormerStudentEditorMode;
	onOpenChange: (open: boolean) => void;
	open: boolean;
	formerStudentId: string | null;
}

export interface FormerStudentEditorFormProps {
	canRenderForm: boolean;
	courseById: Map<string, CourseResponse>;
	courseOptions: ComboboxOption[];
	coursesError: unknown;
	existingUsers: CpfFormFieldExistingUser[];
	form: UseFormReturn<FormerStudentEditorFormValues>;
	linkedAccount: AccountResponse | null;
	linkedAccountError: unknown;
	mode: FormerStudentEditorMode;
	onRefreshCourses: () => void;
	onRefreshFormerStudent: () => void;
	onRefreshUser: () => void;
	formerStudent: FormerStudentResponse | undefined;
	formerStudentError: unknown;
	userError: unknown;
}

export interface FormerStudentCampusOption {
	label: string;
	value: Campi;
}

export interface FormerStudentProfileSectionProps {
	existingUsers: CpfFormFieldExistingUser[];
	form: UseFormReturn<FormerStudentEditorFormValues>;
	isCreateLikeMode: boolean;
	isNameDisabled: boolean;
	onMatchedExistingUserChange: (user: CpfFormFieldExistingUser | null) => void;
}

export interface FormerStudentAcademicSectionProps {
	accountStatusLabel: string;
	accountStatusTone: BadgeTone;
	accountTypeLabel: string;
	accountTypeTone: BadgeTone;
	campusOptions: FormerStudentCampusOption[];
	courseOptions: ComboboxOption[];
	form: UseFormReturn<FormerStudentEditorFormValues>;
}

export interface FormerStudentOwnDetailsContentProps {
	formerStudent: FormerStudentResponse;
	columns?: 2 | 3;
	includeEditableFields?: boolean;
}

export interface FormerStudentsFiltersDrawerProps {
	name: string;
	cpf: string;
	email: string;
	academicRegistration: string;
	activeOnly: boolean;
	campi: Campi[];
	courseIds: string[];
	areaOfExpertiseIds: string[];
	includeConcluded: boolean;
	periodFrom: string;
	periodTo: string;
	dateFrom: string;
	dateTo: string;
	hasActiveFilters: boolean;
	isCoursesLoading: boolean;
	isAreasOfExpertiseLoading: boolean;
	onNameChange: (value: string) => void;
	onCpfChange: (value: string) => void;
	onEmailChange: (value: string) => void;
	onAcademicRegistrationChange: (value: string) => void;
	onActiveOnlyChange: (value: boolean) => void;
	onApply: () => void;
	onCampiChange: (value: Campi[]) => void;
	onClear: () => void;
	onCourseIdsChange: (value: string[]) => void;
	onAreaOfExpertiseIdsChange: (value: string[]) => void;
	onIncludeConcludedChange: (value: boolean) => void;
	onPeriodFromChange: (value: string) => void;
	onPeriodToChange: (value: string) => void;
	onDateFromChange: (value: string) => void;
	onDateToChange: (value: string) => void;
	onOpenChange: (open: boolean) => void;
	onRefreshCourses: () => void;
	open: boolean;
	courseOptions: ComboboxOption[];
	areaOfExpertiseOptions: ComboboxOption[];
	coursesError: boolean;
}

export interface FormerStudentsRowActionsProps {
	href: string;
	onDelete: (formerStudent: FormerStudentDirectoryItem) => void;
	onDuplicate: (formerStudent: FormerStudentDirectoryItem) => void;
	onOpenEditor: (id: string, mode: FormerStudentEditorMode) => void;
	onSetActive: (formerStudent: FormerStudentDirectoryItem) => void;
	formerStudent: FormerStudentDirectoryItem;
}

export interface FormerStudentFilterArgs {
	name: string;
	cpf: string;
	email: string;
	academicRegistration: string;
	activeOnly: boolean;
	campi: Campi[];
	courseById: Map<string, CourseResponse>;
	courseIds: string[];
	areaOfExpertiseIds: string[];
	includeConcluded: boolean;
	periodFrom: string;
	periodTo: string;
	dateFrom: string;
	dateTo: string;
	query: string;
	registrationQuery: string;
}
