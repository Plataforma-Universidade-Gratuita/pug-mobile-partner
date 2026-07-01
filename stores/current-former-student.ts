import { create } from "zustand";

import * as api from "@/api";
import type { CurrentFormerStudentStoreState } from "@/types/client";

let currentFormerStudentContextPromise: Promise<void> | null = null;
let currentFormerStudentContextGeneration = 0;

function resolveCurrentFormerStudentContextError(error: unknown) {
	if (error instanceof Error && error.message.trim()) {
		return error.message;
	}

	return "Unable to load current partner context.";
}

export const useCurrentFormerStudentStore =
	create<CurrentFormerStudentStoreState>((set, get) => {
		async function loadCurrentFormerStudentContext(force: boolean) {
			if (!force && get().isLoaded && !get().error) {
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
					const [currentAccount, currentUser] = await Promise.all([
						api.identity.accounts.getMe(),
						api.identity.users.getMe(),
						api.partner.staff.getMe(),
					]);

					if (currentFormerStudentContextGeneration !== generation) {
						return;
					}

					set({
						currentAccount,
						currentUser,
						currentFormerStudent: null,
						currentCourse: null,
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
		}

		return {
			currentAccount: null,
			currentUser: null,
			currentFormerStudent: null,
			currentCourse: null,
			isLoading: false,
			isLoaded: false,
			error: null,
			loadCurrentFormerStudentContext: async () => {
				return loadCurrentFormerStudentContext(false);
			},
			refreshCurrentFormerStudentContext: async () => {
				return loadCurrentFormerStudentContext(true);
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
		};
	});
