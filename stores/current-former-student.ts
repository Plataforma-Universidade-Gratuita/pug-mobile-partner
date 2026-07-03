/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
/*
 * Temporary compatibility shim for copied student-bound screens that have not
 * been migrated yet. Auth and profile use the real current-staff store.
 */
import { useCurrentStaffStore } from "./current-staff";

interface LegacyCurrentFormerStudentState {
	currentAccount: ReturnType<
		typeof useCurrentStaffStore.getState
	>["currentAccount"];
	currentUser: ReturnType<typeof useCurrentStaffStore.getState>["currentUser"];
	currentFormerStudent: any;
	currentCourse: any;
	isLoading: ReturnType<typeof useCurrentStaffStore.getState>["isLoading"];
	isLoaded: ReturnType<typeof useCurrentStaffStore.getState>["isLoaded"];
	error: ReturnType<typeof useCurrentStaffStore.getState>["error"];
	loadCurrentFormerStudentContext: ReturnType<
		typeof useCurrentStaffStore.getState
	>["loadCurrentStaffContext"];
	refreshCurrentFormerStudentContext: ReturnType<
		typeof useCurrentStaffStore.getState
	>["refreshCurrentStaffContext"];
	clearCurrentFormerStudentContext: ReturnType<
		typeof useCurrentStaffStore.getState
	>["clearCurrentStaffContext"];
}

export const useCurrentFormerStudentStore = (<T>(
	selector?: (state: LegacyCurrentFormerStudentState) => T,
) => {
	const fallbackSelector = (
		state: ReturnType<typeof useCurrentStaffStore.getState>,
	) => ({
		currentAccount: state.currentAccount,
		currentUser: state.currentUser,
		currentFormerStudent: null,
		currentCourse: null,
		isLoading: state.isLoading,
		isLoaded: state.isLoaded,
		error: state.error,
		loadCurrentFormerStudentContext: state.loadCurrentStaffContext,
		refreshCurrentFormerStudentContext: state.refreshCurrentStaffContext,
		clearCurrentFormerStudentContext: state.clearCurrentStaffContext,
	});

	return useCurrentStaffStore((state): T | LegacyCurrentFormerStudentState =>
		selector ? selector(fallbackSelector(state)) : fallbackSelector(state),
	);
}) as <T>(selector: (state: LegacyCurrentFormerStudentState) => T) => T;
