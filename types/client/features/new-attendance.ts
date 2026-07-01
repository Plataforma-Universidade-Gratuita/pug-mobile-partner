import type { UseFormReturn } from "react-hook-form";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";

import type { EnrollmentResponse, ProjectResponse } from "@/types/api";

export interface NewAttendanceFormValues {
	projectId: string;
	duration: string;
}

export interface NewAttendanceProjectOption {
	projectId: string;
	projectName: string;
	entityName: string;
	project: ProjectResponse;
	enrollment: EnrollmentResponse;
}

export interface NewAttendanceStateCardProps {
	badgeLabel: string;
	description: string;
	title: string;
	tone: "danger" | "neutral" | "warning";
}

export interface NewAttendanceProjectOptionCardProps {
	disabled: boolean;
	entityName: string;
	isLocked: boolean;
	isSelected: boolean;
	onPress: () => void;
	projectName: string;
}

export interface NewAttendanceProjectSectionStyles {
	errorText: StyleProp<TextStyle>;
	projectOptionCard: StyleProp<ViewStyle>;
	projectOptionList: StyleProp<ViewStyle>;
	projectOptionListContainer: StyleProp<ViewStyle>;
	section: StyleProp<ViewStyle>;
	sectionHeader: StyleProp<ViewStyle>;
}

export interface NewAttendanceProjectSectionProps {
	clearServerError: () => void;
	errorMessage: string | undefined;
	isProjectLocked: boolean;
	isRefreshingOptions: boolean;
	isSubmitting: boolean;
	onSelectProject: (projectId: string) => void;
	options: NewAttendanceProjectOption[];
	selectedProjectId: string;
	styles: NewAttendanceProjectSectionStyles;
}

export interface NewAttendanceContentStyles {
	errorText: StyleProp<TextStyle>;
	field: StyleProp<ViewStyle>;
	formCard: StyleProp<ViewStyle>;
	projectOptionCard: StyleProp<ViewStyle>;
	projectOptionList: StyleProp<ViewStyle>;
	projectOptionListContainer: StyleProp<ViewStyle>;
	section: StyleProp<ViewStyle>;
	sectionHeader: StyleProp<ViewStyle>;
}

export interface NewAttendanceContentProps {
	clearServerError: () => void;
	durationErrorMessage: string | null;
	durationHelperText: string;
	durationLabel: string;
	durationPlaceholder: string;
	durationValue: string;
	formFooterError: string | null;
	hasEligibleProjects: boolean;
	hasQueryError: boolean;
	isInitialLoading: boolean;
	isProjectLocked: boolean;
	isRefreshingOptions: boolean;
	isSubmitting: boolean;
	onChangeDuration: (value: string) => void;
	onDurationBlur: () => void;
	onSelectProject: (projectId: string) => void;
	onSubmit: () => void;
	projectErrorMessage: string | undefined;
	projectOptions: NewAttendanceProjectOption[];
	selectedProjectId: string;
	stateBadgeLabel: string;
	states: {
		emptyDescription: string;
		emptyTitle: string;
		errorDescription: string;
		errorTitle: string;
		loadingDescription: string;
		loadingTitle: string;
	};
	styles: NewAttendanceContentStyles;
}

export interface NewAttendanceModalBodyProps {
	clearServerError: () => void;
	durationValue: string;
	form: UseFormReturn<NewAttendanceFormValues>;
	formFooterError: string | null;
	hasEligibleProjects: boolean;
	hasQueryError: boolean;
	insetBottom: number;
	isInitialLoading: boolean;
	isProjectLocked: boolean;
	isRefreshingOptions: boolean;
	isSubmitting: boolean;
	onSelectProject: (projectId: string) => void;
	onSubmit: () => void;
	projectOptions: NewAttendanceProjectOption[];
	selectedProjectId: string;
	styles: {
		content: StyleProp<ViewStyle>;
		contentShell: StyleProp<ViewStyle>;
		errorText: StyleProp<TextStyle>;
		field: StyleProp<ViewStyle>;
		formCard: StyleProp<ViewStyle>;
		keyboard: StyleProp<ViewStyle>;
		projectOptionCard: StyleProp<ViewStyle>;
		projectOptionList: StyleProp<ViewStyle>;
		projectOptionListContainer: StyleProp<ViewStyle>;
		section: StyleProp<ViewStyle>;
		sectionHeader: StyleProp<ViewStyle>;
	};
}
