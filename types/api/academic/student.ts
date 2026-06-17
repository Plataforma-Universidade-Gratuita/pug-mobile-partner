import { z } from "zod";

import {
	StudentCreateRequestSchema,
	StudentResponseSchema,
	StudentUpdateRequestSchema,
} from "@/schemas/api/academic/student";

// ─── Responses ───────────────────────────────────────────────────────────────

export type StudentResponse = z.infer<typeof StudentResponseSchema>;

// ─── Requests ────────────────────────────────────────────────────────────────

export type StudentCreateRequest = z.infer<typeof StudentCreateRequestSchema>;
export type StudentUpdateRequest = z.infer<typeof StudentUpdateRequestSchema>;
