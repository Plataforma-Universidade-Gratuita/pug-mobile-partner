import { z } from "zod";

import { AuditInfoResponseSchema } from "@/schemas/api/shared/shared";

// ─── Enums ───────────────────────────────────────────────────────────────────

export const AttendanceStatusEnum = z.enum(["ABSENT", "PRESENT", "WAITING"]);

// ─── Responses ───────────────────────────────────────────────────────────────

export const AttendanceResponseSchema = z.object({
	id: z.string(),
	projectId: z.string(),
	studentId: z.string(),
	duration: z.number(),
	qrValidationHash: z.string(),
	status: AttendanceStatusEnum,
	statusFormatted: z.string(),
	validatedById: z.string().nullable(),
	validatedAt: z.string().nullable(),
	validatedAtFormatted: z.string(),
	auditInfo: AuditInfoResponseSchema,
});

// ─── Requests ────────────────────────────────────────────────────────────────

export const AttendanceCreateRequestSchema = z.object({
	projectId: z.string(),
	studentId: z.string(),
	duration: z.number(),
});

export const AttendanceValidateRequestSchema = z.object({
	status: AttendanceStatusEnum,
	qrValidationHash: z.string(),
});
