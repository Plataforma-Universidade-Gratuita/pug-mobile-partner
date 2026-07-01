import { create } from "zustand";

import * as api from "@/api";
import type { TokenResponse } from "@/types/api";
import type { AuthStoreState, StoredSessionTokens } from "@/types/client";
import { validatePartnerToken } from "@/utils";

import { useCurrentFormerStudentStore } from "./current-former-student";

const { clearApiSession, configureApiSessionProvider, getApiSessionProvider } =
	api;

function buildSessionState(
	tokens: StoredSessionTokens,
	requiresCredentialSetup: boolean,
) {
	const validation = validatePartnerToken(tokens.accessToken);

	if (!validation.isValid || !validation.payload) {
		return null;
	}

	return {
		accessToken: tokens.accessToken,
		refreshToken: tokens.refreshToken,
		sessionPayload: validation.payload,
		isAuthenticated: true,
		requiresCredentialSetup,
	};
}

function toStoredSessionTokens(tokens: TokenResponse): StoredSessionTokens {
	return {
		accessToken: tokens.token,
		refreshToken: tokens.refreshToken,
	};
}

const baseSessionProvider = getApiSessionProvider();

let bootstrapPromise: Promise<boolean> | null = null;

async function synchronizeCurrentFormerStudentContext(passwordWired: boolean) {
	const currentFormerStudentStore = useCurrentFormerStudentStore.getState();

	if (!passwordWired) {
		currentFormerStudentStore.clearCurrentFormerStudentContext();
		return;
	}

	await currentFormerStudentStore.loadCurrentFormerStudentContext();
}

export const useAuthStore = create<AuthStoreState>((set, get) => ({
	isAuthenticated: false,
	isBootstrapping: false,
	isMutatingSession: false,
	requiresCredentialSetup: false,
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

	setRequiresCredentialSetup: value => {
		set({ requiresCredentialSetup: value });
	},

	clearSessionState: () => {
		useCurrentFormerStudentStore.getState().clearCurrentFormerStudentContext();

		set({
			accessToken: null,
			refreshToken: null,
			sessionPayload: null,
			isAuthenticated: false,
			requiresCredentialSetup: false,
		});
	},

	refreshSession: async () => {
		const refreshToken =
			get().refreshToken ?? (await baseSessionProvider.getRefreshToken());

		if (!refreshToken) {
			throw new Error("Missing refresh token.");
		}

		const tokens = await api.identity.auth.refresh({ refreshToken });
		const validation = validatePartnerToken(tokens.token);

		if (!validation.isValid || !validation.payload) {
			await clearApiSession();
			get().clearSessionState();
			throw new Error("Received a non-partner token during refresh.");
		}

		await getApiSessionProvider().persistSession(tokens);
		await synchronizeCurrentFormerStudentContext(tokens.passwordWired);
		return tokens;
	},

	bootstrapSession: async () => {
		if (bootstrapPromise) {
			return bootstrapPromise;
		}

		bootstrapPromise = (async () => {
			set({ isBootstrapping: true });

			try {
				const [accessToken, refreshToken, requiresCredentialSetup] =
					await Promise.all([
						baseSessionProvider.getAccessToken(),
						baseSessionProvider.getRefreshToken(),
						baseSessionProvider.getRequiresCredentialSetup(),
					]);

				if (!accessToken || !refreshToken) {
					get().clearSessionState();
					return false;
				}

				const validStoredSession = buildSessionState(
					{
						accessToken,
						refreshToken,
					},
					requiresCredentialSetup ?? false,
				);

				if (validStoredSession && requiresCredentialSetup !== null) {
					set(validStoredSession);
					await synchronizeCurrentFormerStudentContext(
						!validStoredSession.requiresCredentialSetup,
					);
					return true;
				}

				const refreshedTokens = await api.identity.auth.refresh({
					refreshToken,
				});
				const refreshedSession = buildSessionState(
					toStoredSessionTokens(refreshedTokens),
					!refreshedTokens.passwordWired,
				);

				if (!refreshedSession) {
					await clearApiSession();
					get().clearSessionState();
					return false;
				}

				await getApiSessionProvider().persistSession(refreshedTokens);
				await synchronizeCurrentFormerStudentContext(
					refreshedTokens.passwordWired,
				);
				return true;
			} catch {
				await clearApiSession();
				get().clearSessionState();
				return false;
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
			const tokens = await api.identity.auth.login(credentials);
			const validation = validatePartnerToken(tokens.token);

			if (!validation.isValid || !validation.payload) {
				await clearApiSession();
				get().clearSessionState();
				throw new Error("Received a non-partner token during sign-in.");
			}

			await getApiSessionProvider().persistSession(tokens);
			await synchronizeCurrentFormerStudentContext(tokens.passwordWired);
			return tokens;
		} finally {
			set({ isMutatingSession: false });
		}
	},

	completeCredentialSetup: async body => {
		set({ isMutatingSession: true });

		try {
			await api.identity.auth.wireCredentials(body);
			await get().refreshSession();
		} finally {
			set({ isMutatingSession: false });
		}
	},

	signOut: async () => {
		set({ isMutatingSession: true });

		try {
			const refreshToken =
				get().refreshToken ?? (await baseSessionProvider.getRefreshToken());

			if (refreshToken) {
				try {
					await api.identity.auth.logout({ refreshToken });
				} catch {
					// Local session clearing still needs to complete even if the remote logout fails.
				}
			}

			await clearApiSession();
			get().clearSessionState();
		} finally {
			set({ isMutatingSession: false });
		}
	},

	signOutAll: async () => {
		set({ isMutatingSession: true });

		try {
			try {
				await api.identity.auth.logoutAll();
			} catch {
				// Local session clearing still needs to complete even if the remote logout-all fails.
			}

			await clearApiSession();
			get().clearSessionState();
		} finally {
			set({ isMutatingSession: false });
		}
	},
}));

configureApiSessionProvider({
	...baseSessionProvider,
	clearSession: async () => {
		await baseSessionProvider.clearSession();
		useAuthStore.getState().clearSessionState();
	},
	onSessionInvalidated: async () => {
		await baseSessionProvider.onSessionInvalidated();
		useAuthStore.getState().clearSessionState();
	},
	persistSession: async tokens => {
		await baseSessionProvider.persistSession(tokens);

		const validation = validatePartnerToken(tokens.token);
		if (!validation.isValid || !validation.payload) {
			return;
		}

		useAuthStore
			.getState()
			.setSession(toStoredSessionTokens(tokens), validation.payload);
		useAuthStore.getState().setRequiresCredentialSetup(!tokens.passwordWired);
	},
});
