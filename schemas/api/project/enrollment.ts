import { z } from "zod";

import { AuditInfoResponseSchema } from "@/schemas/api/shared/shared";

// ─── Enums ───────────────────────────────────────────────────────────────────

export const EnrollmentStatusEnum = z.enum([
	"APPROVED",
	"CANCELED",
	"COMPLETED",
	"EXITED",
	"PENDING",
	"REJECTED",
	"REMOVED",
]);

// ─── Responses ───────────────────────────────────────────────────────────────

export const EnrollmentResponseSchema = z.object({
	projectId: z.string(),
	studentId: z.string(),
	status: EnrollmentStatusEnum,
	statusFormatted: z.string(),
	acceptedAt: z.string().nullable(),
	acceptedAtFormatted: z.string(),
	closingStatusAt: z.string().nullable(),
	closingStatusAtFormatted: z.string(),
	auditInfo: AuditInfoResponseSchema,
});

// ─── Requests ────────────────────────────────────────────────────────────────

export const EnrollmentCreateRequestSchema = z.object({
	projectId: z.string(),
});

export const EnrollmentUpdateRequestSchema = z.object({
	status: EnrollmentStatusEnum,
});
