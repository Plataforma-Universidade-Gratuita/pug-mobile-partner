import { create } from "zustand";

import * as authApi from "@/api/identity/auth";
import type { AuthStoreState, StoredSessionTokens } from "@/types/client";
import { validateStudentToken } from "@/utils/auth";
import {
	clearStudentSession,
	getStoredSessionTokens,
	persistStudentSession,
	refreshStudentSession,
} from "@/utils/session";

function buildSessionState(tokens: StoredSessionTokens) {
	const validation = validateStudentToken(tokens.accessToken);

	if (!validation.isValid || !validation.payload) {
		return null;
	}

	return {
		accessToken: tokens.accessToken,
		refreshToken: tokens.refreshToken,
		sessionPayload: validation.payload,
		isAuthenticated: true,
	};
}

let bootstrapPromise: Promise<boolean> | null = null;

export const useAuthStore = create<AuthStoreState>((set, get) => ({
	isAuthenticated: false,
	isBootstrapping: false,
	isMutatingSession: false,
	accessToken: null,
	refreshToken: null,
	sessionPayload: null,

	setSession: (tokens, payload) => {
		set({
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken,
			sessionPayload: payload,
			isAuthenticated: true,
		});
	},

	clearSessionState: () => {
		set({
			accessToken: null,
			refreshToken: null,
			sessionPayload: null,
			isAuthenticated: false,
		});
	},

	bootstrapSession: async () => {
		if (bootstrapPromise) {
			return bootstrapPromise;
		}

		bootstrapPromise = (async () => {
			set({ isBootstrapping: true });

			try {
				const storedTokens = await getStoredSessionTokens();
				if (!storedTokens) {
					get().clearSessionState();
					return false;
				}

				const validStoredSession = buildSessionState(storedTokens);
				if (validStoredSession) {
					set(validStoredSession);
					return true;
				}

				const refreshedTokens = await refreshStudentSession(
					storedTokens.refreshToken,
				);
				if (!refreshedTokens) {
					get().clearSessionState();
					return false;
				}

				const refreshedSession = buildSessionState({
					accessToken: refreshedTokens.token,
					refreshToken: refreshedTokens.refreshToken,
				});

				if (!refreshedSession) {
					await clearStudentSession();
					get().clearSessionState();
					return false;
				}

				set(refreshedSession);
				return true;
			} finally {
				set({ isBootstrapping: false });
				bootstrapPromise = null;
			}
		})();

		return bootstrapPromise;
	},

	signIn: async credentials => {
		set({ isMutatingSession: true });

		try {
			const tokens = await authApi.login(credentials);
			const validation = validateStudentToken(tokens.token);

			if (!validation.isValid || !validation.payload) {
				await clearStudentSession();
				get().clearSessionState();
				throw new Error("Received a non-student token during sign-in.");
			}

			await persistStudentSession(tokens);
			get().setSession(
				{
					accessToken: tokens.token,
					refreshToken: tokens.refreshToken,
				},
				validation.payload,
			);
		} finally {
			set({ isMutatingSession: false });
		}
	},

	signOut: async () => {
		set({ isMutatingSession: true });

		try {
			const refreshToken = get().refreshToken;

			if (refreshToken) {
				try {
					await authApi.logout({ refreshToken });
				} catch {
					// Local session clearing still needs to complete even if the remote logout fails.
				}
			}

			await clearStudentSession();
			get().clearSessionState();
		} finally {
			set({ isMutatingSession: false });
		}
	},
}));
