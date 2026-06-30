import { create } from "zustand";

import * as api from "@/api";
import type { CurrentFormerStudentStoreState } from "@/types/client";

let currentFormerStudentContextPromise: Promise<void> | null = null;
let currentFormerStudentContextGeneration = 0;

function resolveCurrentFormerStudentContextError(error: unknown) {
	if (error instanceof Error && error.message.trim()) {
		return error.message;
	}

	return "Unable to load current former student context.";
}

export const useCurrentFormerStudentStore =
	create<CurrentFormerStudentStoreState>((set, get) => ({
		currentAccount: null,
		currentUser: null,
		currentFormerStudent: null,
		currentCourse: null,
		isLoading: false,
		isLoaded: false,
		error: null,

		loadCurrentFormerStudentContext: async () => {
			if (get().isLoaded && !get().error) {
				return;
			}

			if (currentFormerStudentContextPromise) {
				return currentFormerStudentContextPromise;
			}

			const generation = currentFormerStudentContextGeneration;
			let loadPromise!: Promise<void>;

			loadPromise = (async () => {
				if (currentFormerStudentContextGeneration === generation) {
					set({ isLoading: true, error: null });
				}

				try {
					const [currentAccount, currentUser, currentFormerStudent] =
						await Promise.all([
							api.identity.accounts.getMe(),
							api.identity.users.getMe(),
							api.academic.formerStudents.getMe(),
						]);

					const currentCourse = currentFormerStudent.courseId
						? await api.academic.courses.get(currentFormerStudent.courseId)
						: null;

					if (currentFormerStudentContextGeneration !== generation) {
						return;
					}

					set({
						currentAccount,
						currentUser,
						currentFormerStudent,
						currentCourse,
						isLoading: false,
						isLoaded: true,
						error: null,
					});
				} catch (error) {
					if (currentFormerStudentContextGeneration !== generation) {
						return;
					}

					set({
						currentAccount: null,
						currentUser: null,
						currentFormerStudent: null,
						currentCourse: null,
						isLoading: false,
						isLoaded: false,
						error: resolveCurrentFormerStudentContextError(error),
					});
				} finally {
					if (currentFormerStudentContextPromise === loadPromise) {
						currentFormerStudentContextPromise = null;
					}
				}
			})();

			currentFormerStudentContextPromise = loadPromise;
			return loadPromise;
		},

		clearCurrentFormerStudentContext: () => {
			currentFormerStudentContextGeneration += 1;
			currentFormerStudentContextPromise = null;

			set({
				currentAccount: null,
				currentUser: null,
				currentFormerStudent: null,
				currentCourse: null,
				isLoading: false,
				isLoaded: false,
				error: null,
			});
		},
	}));
