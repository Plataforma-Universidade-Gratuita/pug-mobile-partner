/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { z } from "zod";

import { AccountTypeEnum } from "@/schemas/api/shared/shared";

// ─── Responses ───────────────────────────────────────────────────────────────

export const TokenResponseSchema = z.object({
	token: z.string(),
	refreshToken: z.string(),
	accountId: z.string(),
	accountType: AccountTypeEnum,
	passwordWired: z.boolean(),
	expiresIn: z.number(),
	refreshExpiresIn: z.number(),
});

// ─── Requests ────────────────────────────────────────────────────────────────

export const LoginRequestSchema = z.object({
	email: z.string(),
	password: z.string().nullable(),
});

export const RefreshRequestSchema = z.object({
	refreshToken: z.string(),
});

export const LogoutRequestSchema = z.object({
	refreshToken: z.string(),
});
