import { API_BASE_URL, JSON_HEADERS } from "@/constants/api";
import {
	ACCESS_TOKEN_STORAGE_KEY,
	REFRESH_TOKEN_STORAGE_KEY,
} from "@/constants/auth";
import { RefreshRequestSchema } from "@/schemas/api/identity/auth";
import { RefreshSessionEnvelopeSchema } from "@/schemas/client/auth";
import type { TokenResponse } from "@/types/api";
import type { StoredSessionTokens } from "@/types/client";
import { validateStudentToken } from "@/utils/auth";
import {
	getStoredValue,
	removeStoredValue,
	setStoredValue,
} from "@/utils/storage";

export async function getAccessToken(): Promise<string | null> {
	return getStoredValue(ACCESS_TOKEN_STORAGE_KEY);
}

export async function getRefreshToken(): Promise<string | null> {
	return getStoredValue(REFRESH_TOKEN_STORAGE_KEY);
}

export async function getStoredSessionTokens(): Promise<StoredSessionTokens | null> {
	const [accessToken, refreshToken] = await Promise.all([
		getAccessToken(),
		getRefreshToken(),
	]);

	if (!accessToken || !refreshToken) {
		return null;
	}

	return {
		accessToken,
		refreshToken,
	};
}

export async function persistStudentSession(
	tokens: TokenResponse,
): Promise<void> {
	await Promise.all([
		setStoredValue(ACCESS_TOKEN_STORAGE_KEY, tokens.token),
		setStoredValue(REFRESH_TOKEN_STORAGE_KEY, tokens.refreshToken),
	]);
}

export async function clearStudentSession(): Promise<void> {
	await Promise.all([
		removeStoredValue(ACCESS_TOKEN_STORAGE_KEY),
		removeStoredValue(REFRESH_TOKEN_STORAGE_KEY),
	]);
}

export async function refreshStudentSession(
	refreshToken?: string,
): Promise<TokenResponse | null> {
	const currentRefreshToken = refreshToken ?? (await getRefreshToken());
	if (!currentRefreshToken) {
		return null;
	}

	try {
		const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
			method: "POST",
			headers: JSON_HEADERS,
			body: JSON.stringify(
				RefreshRequestSchema.parse({ refreshToken: currentRefreshToken }),
			),
		});
		if (!response.ok) {
			await clearStudentSession();
			return null;
		}

		const json = await response.json();
		const envelope = RefreshSessionEnvelopeSchema.parse(json);
		const tokens = envelope.data;

		if (!validateStudentToken(tokens.token).isValid) {
			await clearStudentSession();
			return null;
		}

		await persistStudentSession(tokens);
		return tokens;
	} catch {
		await clearStudentSession();
		return null;
	}
}
