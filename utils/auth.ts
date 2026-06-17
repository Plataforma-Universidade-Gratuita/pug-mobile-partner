import { jwtDecode } from "jwt-decode";

import type {
	PugJwtPayload,
	StudentTokenValidationResult,
} from "@/types/client";

export function validateStudentToken(
	token: string,
): StudentTokenValidationResult {
	try {
		const payload = jwtDecode<PugJwtPayload>(token);

		const isExpired = payload.exp * 1000 < Date.now();
		if (isExpired) return { isValid: false };

		if (!payload.groups?.includes("STUDENT")) return { isValid: false };

		return { isValid: true, payload };
	} catch {
		return { isValid: false };
	}
}
