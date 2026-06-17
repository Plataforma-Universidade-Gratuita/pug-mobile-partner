import { z } from "zod";

import {
	EntityCreateRequestSchema,
	EntityResponseSchema,
	EntityUpdateRequestSchema,
} from "@/schemas/api/partner/entity";

// ─── Responses ───────────────────────────────────────────────────────────────

export type EntityResponse = z.infer<typeof EntityResponseSchema>;

// ─── Requests ────────────────────────────────────────────────────────────────

export type EntityCreateRequest = z.infer<typeof EntityCreateRequestSchema>;
export type EntityUpdateRequest = z.infer<typeof EntityUpdateRequestSchema>;
