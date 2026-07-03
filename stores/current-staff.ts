/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { create } from "zustand";

import * as api from "@/api";
import type { CurrentStaffStoreState } from "@/types/client";

let currentStaffContextPromise: Promise<void> | null = null;
let currentStaffContextGeneration = 0;

function resolveCurrentStaffContextError(error: unknown) {
	if (error instanceof Error && error.message.trim()) {
		return error.message;
	}

	return "Unable to load current staff context.";
}

export const useCurrentStaffStore = create<CurrentStaffStoreState>(
	(set, get) => {
		async function loadCurrentStaffContext(force: boolean) {
			if (!force && get().isLoaded && !get().error) {
				return;
			}

			if (currentStaffContextPromise) {
				return currentStaffContextPromise;
			}

			const generation = currentStaffContextGeneration;
			let loadPromise!: Promise<void>;

			loadPromise = (async () => {
				if (currentStaffContextGeneration === generation) {
					set({ isLoading: true, error: null });
				}

				try {
					const [currentAccount, currentUser, currentStaff] = await Promise.all(
						[
							api.identity.accounts.getMe(),
							api.identity.users.getMe(),
							api.partner.staff.getMe(),
						],
					);
					const currentEntity = await api.partner.entities.get(
						currentStaff.entityId,
					);

					if (currentStaffContextGeneration !== generation) {
						return;
					}

					set({
						currentAccount,
						currentUser,
						currentStaff,
						currentEntity,
						isLoading: false,
						isLoaded: true,
						error: null,
					});
				} catch (error) {
					if (currentStaffContextGeneration !== generation) {
						return;
					}

					set({
						currentAccount: null,
						currentUser: null,
						currentStaff: null,
						currentEntity: null,
						isLoading: false,
						isLoaded: false,
						error: resolveCurrentStaffContextError(error),
					});
				} finally {
					if (currentStaffContextPromise === loadPromise) {
						currentStaffContextPromise = null;
					}
				}
			})();

			currentStaffContextPromise = loadPromise;
			return loadPromise;
		}

		return {
			currentAccount: null,
			currentUser: null,
			currentStaff: null,
			currentEntity: null,
			isLoading: false,
			isLoaded: false,
			error: null,
			loadCurrentStaffContext: async () => {
				return loadCurrentStaffContext(false);
			},
			refreshCurrentStaffContext: async () => {
				return loadCurrentStaffContext(true);
			},
			clearCurrentStaffContext: () => {
				currentStaffContextGeneration += 1;
				currentStaffContextPromise = null;

				set({
					currentAccount: null,
					currentUser: null,
					currentStaff: null,
					currentEntity: null,
					isLoading: false,
					isLoaded: false,
					error: null,
				});
			},
		};
	},
);
