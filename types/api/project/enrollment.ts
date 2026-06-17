import { z } from "zod";

import {
	EnrollmentCreateRequestSchema,
	EnrollmentResponseSchema,
	EnrollmentStatusEnum,
	EnrollmentUpdateRequestSchema,
} from "@/schemas/api/project/enrollment";

// ─── Enums ───────────────────────────────────────────────────────────────────

export type EnrollmentStatus = z.infer<typeof EnrollmentStatusEnum>;

// ─── Responses ───────────────────────────────────────────────────────────────

export type EnrollmentResponse = z.infer<typeof EnrollmentResponseSchema>;

// ─── Requests ────────────────────────────────────────────────────────────────

export type EnrollmentCreateRequest = z.infer<
	typeof EnrollmentCreateRequestSchema
>;
export type EnrollmentUpdateRequest = z.infer<
	typeof EnrollmentUpdateRequestSchema
>;
