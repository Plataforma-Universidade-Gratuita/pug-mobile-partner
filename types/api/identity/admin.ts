import { z } from "zod";

import {
	AdminCreateRequestSchema,
	AdminResponseSchema,
	AdminUpdateRequestSchema,
} from "@/schemas/api/identity/admin";

// ─── Responses ───────────────────────────────────────────────────────────────

export type AdminResponse = z.infer<typeof AdminResponseSchema>;

// ─── Requests ────────────────────────────────────────────────────────────────

export type AdminCreateRequest = z.infer<typeof AdminCreateRequestSchema>;
export type AdminUpdateRequest = z.infer<typeof AdminUpdateRequestSchema>;
