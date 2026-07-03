/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import type { UseFormReturn } from "react-hook-form";

import type {
	CourseCreateRequest,
	CourseResponse,
	CourseUpdateRequest,
} from "@/types/api";
import type { ComboboxOption } from "@/types/client";

export type CourseEditorMode = "create" | "duplicate" | "update";

export interface CoursePageProps {
	courseId: string;
}

export interface CourseRoutePageProps {
	params: Promise<{
		courseId: string;
	}>;
}

export interface CourseSecondaryFilters {
	areaOfExpertiseIds: string[];
	startDate: string;
	endDate: string;
}

export interface CourseEditorFormValues {
	name: string;
	areaOfExpertiseId: string;
}

export interface CourseCreateMutationVariables {
	body: CourseCreateRequest;
}

export interface CourseUpdateMutationVariables {
	id: string;
	body: CourseUpdateRequest;
}

export interface RemoveCourseMutationVariables {
	id: string;
}

export interface CourseEditorDrawerProps {
	courseId: string | null;
	mode: CourseEditorMode;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export interface CourseEditorFormProps {
	canRenderForm: boolean;
	course: CourseResponse | undefined;
	courseError: unknown;
	form: UseFormReturn<CourseEditorFormValues>;
	mode: CourseEditorMode;
	onRefreshCourse: () => void;
	onRefreshAreasOfExpertise: () => void;
	areaOfExpertiseOptions: ComboboxOption[];
	areasOfExpertiseError: unknown;
}

export interface CourseOwnDetailsContentProps {
	course: CourseResponse;
	columns?: 2 | 3;
	includeName?: boolean;
}

export interface CoursesFiltersDrawerProps {
	endDate: string;
	hasActiveFilters: boolean;
	isAreasOfExpertiseLoading: boolean;
	onApply: () => void;
	onClear: () => void;
	onEndDateChange: (value: string) => void;
	onOpenChange: (open: boolean) => void;
	onRefreshAreasOfExpertise: () => void;
	onAreaOfExpertiseIdsChange: (value: string[]) => void;
	onStartDateChange: (value: string) => void;
	open: boolean;
	areaOfExpertiseIds: string[];
	areaOfExpertiseOptions: ComboboxOption[];
	areasOfExpertiseError: boolean;
	startDate: string;
}

export interface CoursesRowActionsProps {
	course: CourseResponse;
	href: string;
	onDelete: (course: CourseResponse) => void;
	onDuplicate: (course: CourseResponse) => void;
	onOpenEditor: (id: string, mode: CourseEditorMode) => void;
}

export interface CourseFilterArgs {
	endDate: string;
	query: string;
	areaOfExpertiseIds: string[];
	startDate: string;
}
