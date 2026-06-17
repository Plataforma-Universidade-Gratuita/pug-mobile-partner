import { z } from "zod";

import { AccountTypeEnum } from "@/schemas/api/shared/shared";

// ─── Responses ───────────────────────────────────────────────────────────────

export const TokenResponseSchema = z.object({
	token: z.string(),
	refreshToken: z.string(),
	accountId: z.string(),
	accountType: AccountTypeEnum,
	expiresIn: z.number(),
	refreshExpiresIn: z.number(),
});

// ─── Requests ────────────────────────────────────────────────────────────────

export const LoginRequestSchema = z.object({
	email: z.string(),
	password: z.string(),
});

export const RefreshRequestSchema = z.object({
	refreshToken: z.string(),
});

export const LogoutRequestSchema = z.object({
	refreshToken: z.string(),
});
