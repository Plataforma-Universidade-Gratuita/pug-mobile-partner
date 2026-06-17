import { z } from "zod";

import {
	LoginRequestSchema,
	LogoutRequestSchema,
	RefreshRequestSchema,
	TokenResponseSchema,
} from "@/schemas/api/identity/auth";

// ─── Responses ───────────────────────────────────────────────────────────────

export type TokenResponse = z.infer<typeof TokenResponseSchema>;

// ─── Requests ────────────────────────────────────────────────────────────────

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type RefreshRequest = z.infer<typeof RefreshRequestSchema>;
export type LogoutRequest = z.infer<typeof LogoutRequestSchema>;
