import { z } from "zod";

import { AuditInfoResponseSchema } from "@/schemas/api/shared/shared";

// ─── Enums ───────────────────────────────────────────────────────────────────

export const ProjectStatusEnum = z.enum([
	"CANCELED",
	"COMPLETED",
	"IN_PROGRESS",
	"ON_HOLD",
	"PLANNED",
]);

// ─── Responses ───────────────────────────────────────────────────────────────

export const ProjectResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	entityId: z.string(),
	description: z.string(),
	createdBy: z.string(),
	maxParticipants: z.number().nullable(),
	offeredHours: z.number(),
	completedHours: z.number(),
	status: ProjectStatusEnum,
	statusFormatted: z.string(),
	closedAt: z.string().nullable(),
	closedAtFormatted: z.string(),
	auditInfo: AuditInfoResponseSchema,
});

// ─── Requests ────────────────────────────────────────────────────────────────

export const ProjectCreateRequestSchema = z.object({
	name: z.string(),
	entityId: z.string(),
	description: z.string().nullable().optional(),
	maxParticipants: z.number().nullable().optional(),
	offeredHours: z.number(),
});

export const ProjectUpdateRequestSchema = z.object({
	name: z.string().nullable().optional(),
	description: z.string().nullable().optional(),
	maxParticipants: z.number().nullable().optional(),
	offeredHours: z.number().nullable().optional(),
	status: ProjectStatusEnum.nullable().optional(),
});

export const ProjectSchoolRequestSchema = z.object({
	projectId: z.string(),
	schoolIds: z.array(z.string()),
});

export const ProjectSchoolAssociationUpdateRequestSchema = z.object({
	schoolIds: z.array(z.string()),
});
