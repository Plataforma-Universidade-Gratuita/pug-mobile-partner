import { API_ROUTE_BASES } from "@/constants/api";
import { TokenResponseSchema } from "@/schemas/api/identity/auth";
import type {
	LoginRequest,
	LogoutRequest,
	RefreshRequest,
	TokenResponse,
} from "@/types/api";
import { zfetch, zvoid } from "@/utils/api";

const BASE = API_ROUTE_BASES.identity.auth;

export async function login(body: LoginRequest): Promise<TokenResponse> {
	return zfetch(
		`${BASE}/login`,
		{ method: "POST", body: JSON.stringify(body) },
		TokenResponseSchema,
	);
}

export async function refresh(body: RefreshRequest): Promise<TokenResponse> {
	return zfetch(
		`${BASE}/refresh`,
		{ method: "POST", body: JSON.stringify(body) },
		TokenResponseSchema,
	);
}

export async function logout(body: LogoutRequest): Promise<void> {
	return zvoid(`${BASE}/logout`, {
		method: "POST",
		body: JSON.stringify(body),
	});
}

export async function logoutAll(token?: string): Promise<void> {
	return zvoid(`${BASE}/logout-all`, { method: "POST" }, token);
}
