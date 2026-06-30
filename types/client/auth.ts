export interface PugJwtPayload {
	upn: string;
	groups: ("ADMIN" | "PARTNER" | "FORMER_STUDENT")[];
	accountId: string;
	userId: string;
	iat: number;
	exp: number;
}

export interface PartnerTokenValidationResult {
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

export interface StoredSessionTokens {
	accessToken: string;
	refreshToken: string;
}
