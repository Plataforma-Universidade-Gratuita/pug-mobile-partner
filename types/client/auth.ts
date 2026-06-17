export interface PugJwtPayload {
	upn: string;
	groups: ("ADMIN" | "PARTNER" | "STUDENT")[];
	accountId: string;
	userId: string;
	iat: number;
	exp: number;
}

export interface StudentTokenValidationResult {
	isValid: boolean;
	payload?: PugJwtPayload;
}

export interface StoredSessionTokens {
	accessToken: string;
	refreshToken: string;
}

export interface LoginFormValues {
	email: string;
	password: string;
}
