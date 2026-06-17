import { z } from "zod";

import {
	SchoolCreateRequestSchema,
	SchoolResponseSchema,
	SchoolUpdateRequestSchema,
} from "@/schemas/api/academic/school";

// ─── Responses ───────────────────────────────────────────────────────────────

export type SchoolResponse = z.infer<typeof SchoolResponseSchema>;

// ─── Requests ────────────────────────────────────────────────────────────────

export type SchoolCreateRequest = z.infer<typeof SchoolCreateRequestSchema>;
export type SchoolUpdateRequest = z.infer<typeof SchoolUpdateRequestSchema>;
