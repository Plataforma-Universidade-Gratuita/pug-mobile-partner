
import { API_ROUTE_BASES } from "@/api/constants";
import { apiFetch, authVoid } from "@/api/utils";
import { TokenResponseSchema } from "@/schemas/api";
import type {
	CredentialsRequest,
	LoginRequest,
	LogoutRequest,
	RefreshRequest,
	TokenResponse,
} from "@/types/api";

export async function login(body: LoginRequest): Promise<TokenResponse> {
	return apiFetch(
		`${API_ROUTE_BASES.identity.auth}/login`,
		TokenResponseSchema,
		{
			method: "POST",
			body: JSON.stringify(body),
		},
	);
}

export async function refresh(body: RefreshRequest): Promise<TokenResponse> {
	return apiFetch(
		`${API_ROUTE_BASES.identity.auth}/refresh`,
		TokenResponseSchema,
		{
			method: "POST",
			body: JSON.stringify(body),
		},
	);
}

export async function logout(body?: LogoutRequest): Promise<void> {
	return authVoid(
		`${API_ROUTE_BASES.identity.auth}/logout`,
		body
			? {
					method: "POST",
					body: JSON.stringify(body),
				}
			: { method: "POST" },
	);
}

export async function logoutAll(): Promise<void> {
	return authVoid(`${API_ROUTE_BASES.identity.auth}/logout-all`, {
		method: "POST",
	});
}

export async function wireCredentials(body: CredentialsRequest): Promise<void> {
	return authVoid(`${API_ROUTE_BASES.identity.auth}/wire-credentials`, {
		method: "POST",
		body: JSON.stringify(body),
	});
}
