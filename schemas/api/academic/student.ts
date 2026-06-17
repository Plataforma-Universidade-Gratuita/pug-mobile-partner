import { z } from "zod";

import {
	AuditInfoResponseSchema,
	CampiEnum,
	CampusResponseSchema,
} from "@/schemas/api/shared/shared";

// ─── Responses ───────────────────────────────────────────────────────────────

export const StudentResponseSchema = z.object({
	accountId: z.string(),
	academicRegistration: z.string(),
	campus: CampusResponseSchema,
	courseId: z.string(),
	requiredHours: z.number(),
	completedHours: z.number(),
	missingHours: z.number(),
	startDate: z.string(),
	startDateFormatted: z.string(),
	dueDate: z.string(),
	dueDateFormatted: z.string(),
	remainingDays: z.number(),
	remainingDaysFormatted: z.string(),
	auditInfo: AuditInfoResponseSchema,
});

// ─── Requests ────────────────────────────────────────────────────────────────

export const StudentCreateRequestSchema = z.object({
	cpf: z.string(),
	name: z.string(),
	email: z.string(),
	password: z.string(),
	academicRegistration: z.string(),
	campus: CampiEnum,
	courseId: z.string(),
	requiredHours: z.number(),
	startDate: z.string(),
	dueDate: z.string(),
});

export const StudentUpdateRequestSchema = z.object({
	name: z.string().nullable().optional(),
	cpf: z.string().nullable().optional(),
	email: z.string().nullable().optional(),
	password: z.string().nullable().optional(),
	academicRegistration: z.string().nullable().optional(),
	campus: CampiEnum.nullable().optional(),
	courseId: z.string().nullable().optional(),
	requiredHours: z.number().nullable().optional(),
	startDate: z.string().nullable().optional(),
	dueDate: z.string().nullable().optional(),
});
