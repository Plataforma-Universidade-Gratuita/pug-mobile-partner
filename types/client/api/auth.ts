/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import type { TokenResponse } from "@/types/api";

export interface ApiSessionProvider {
	getAccessToken(): Promise<string | null>;
	getRefreshToken(): Promise<string | null>;
	getRequiresCredentialSetup(): Promise<boolean | null>;
	persistSession(tokens: TokenResponse): Promise<void>;
	clearSession(): Promise<void>;
	onSessionInvalidated(): Promise<void> | void;
}

export interface AuthenticatedApiRequestOptions extends Omit<
	RequestInit,
	"headers"
> {
	headers?: HeadersInit;
	locale?: string;
	skipAuthRetry?: boolean;
}
