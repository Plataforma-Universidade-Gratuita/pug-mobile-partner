/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { jwtDecode } from "jwt-decode";

import { ApiError } from "@/api/errors";
import type {
	PugJwtPayload,
	TokenValidationResult,
	WireCredentialsPasswordRequirements,
} from "@/types/client";

export function validatePartnerToken(token: string): TokenValidationResult {
	try {
		const payload = jwtDecode<PugJwtPayload>(token);

		const isExpired = payload.exp * 1000 < Date.now();
		if (isExpired) return { isValid: false };

		if (!payload.groups?.includes("PARTNER")) return { isValid: false };

		return { isValid: true, payload };
	} catch {
		return { isValid: false };
	}
}

export function evaluateWireCredentialsPasswordRequirements(
	password: string,
): WireCredentialsPasswordRequirements {
	return {
		hasMinimumLength: password.length >= 8,
		hasUppercaseLetter: /[A-Z]/.test(password),
		hasLowercaseLetter: /[a-z]/.test(password),
		hasNumber: /\d/.test(password),
		hasSpecialSymbol: /[^A-Za-z0-9]/.test(password),
	};
}

export function doesWireCredentialsPasswordMeetRequirements(password: string) {
	const requirements = evaluateWireCredentialsPasswordRequirements(password);

	return Object.values(requirements).every(Boolean);
}

export function resolveWireCredentialsErrorMessage(error: unknown) {
	return resolveWireCredentialsErrorMessageWithFallback(
		error,
		"Unable to finish setup right now. Try again in a moment.",
	);
}

export function resolveWireCredentialsErrorMessageWithFallback(
	error: unknown,
	fallback: string,
) {
	if (error instanceof ApiError) {
		return error.message;
	}

	if (error instanceof Error && error.message) {
		return error.message;
	}

	return fallback;
}
