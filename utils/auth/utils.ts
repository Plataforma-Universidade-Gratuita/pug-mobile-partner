import { jwtDecode } from "jwt-decode";

import type {
	PugJwtPayload,
	PartnerTokenValidationResult,
} from "@/types/client";

export function validatePartnerToken(
	token: string,
): PartnerTokenValidationResult {
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
