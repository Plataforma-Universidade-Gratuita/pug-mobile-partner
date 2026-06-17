import { z } from "zod";

import {
	StaffCreateRequestSchema,
	StaffResponseSchema,
	StaffUpdateRequestSchema,
} from "@/schemas/api/partner/staff";

// ─── Responses ───────────────────────────────────────────────────────────────

export type StaffResponse = z.infer<typeof StaffResponseSchema>;

// ─── Requests ────────────────────────────────────────────────────────────────

export type StaffCreateRequest = z.infer<typeof StaffCreateRequestSchema>;
export type StaffUpdateRequest = z.infer<typeof StaffUpdateRequestSchema>;
