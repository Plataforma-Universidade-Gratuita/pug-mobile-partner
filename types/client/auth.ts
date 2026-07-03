/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */

export interface PugJwtPayload {
	upn: string;
	groups: ("ADMIN" | "PARTNER" | "FORMER_STUDENT")[];
	accountId: string;
	userId: string;
	iat: number;
	exp: number;
}

export interface TokenValidationResult {
	isValid: boolean;
	payload?: PugJwtPayload;
}

export interface LoginFormValues {
	email: string;
	password: string | null;
}

export interface WireCredentialsFormValues {
	password: string | null;
	confirmPassword: string;
}

export interface WireCredentialsPasswordRequirements {
	hasMinimumLength: boolean;
	hasUppercaseLetter: boolean;
	hasLowercaseLetter: boolean;
	hasNumber: boolean;
	hasSpecialSymbol: boolean;
}

export interface StoredSessionTokens {
	accessToken: string;
	refreshToken: string;
}
