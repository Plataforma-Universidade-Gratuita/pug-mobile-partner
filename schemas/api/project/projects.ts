
import { z } from "zod";

/*
 * Forced exception: this frozen API schema avoids the root schemas barrel to
 * break a build-time initialization cycle during Next.js SSR collection.
 */
import { AccountSimpleComplexSearchResponseSchema } from "../identity/accounts";
import { EntitySimpleComplexSearchResponseSchema } from "../partner/entities";
import { AuditInfoResponseSchema } from "../shared/shared";

export const ProjectStatusEnum = z.enum([
	"CANCELED",
	"COMPLETED",
	"IN_PROGRESS",
	"ON_HOLD",
	"PLANNED",
]);

export const ProjectStatusResponseSchema = z.object({
	status: ProjectStatusEnum,
	statusFormatted: z.string(),
});

export const ProjectSimpleComplexSearchResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
});

export const ProjectAreaOfExpertiseRequestSchema = z.object({
	areaOfExpertiseIds: z.array(z.string()),
});

export const ProjectCreateRequestSchema = z.object({
	name: z.string(),
	entityId: z.string(),
	description: z.string(),
	maxParticipants: z.number().nullable(),
	offeredHours: z.number(),
});

export const ProjectUpdateRequestSchema = z.object({
	name: z.string(),
	description: z.string(),
	maxParticipants: z.number().nullable(),
	offeredHours: z.number(),
});

export const ProjectInfoResponseSchema = z.object({
	createdBy: AccountSimpleComplexSearchResponseSchema,
	maxParticipants: z.number().nullable(),
	currentParticipants: z.number().nullable(),
	offeredHours: z.number().nullable(),
	completedHours: z.number().nullable(),
	closedAt: z.string().nullable(),
	closedAtFormatted: z.string(),
	auditInfo: AuditInfoResponseSchema,
});

export const ProjectResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	entity: EntitySimpleComplexSearchResponseSchema,
	description: z.string(),
	projectInfo: ProjectInfoResponseSchema,
	status: ProjectStatusResponseSchema,
});

export const ProjectComplexSearchRequestSchema = z.object({
	name: z.string().optional(),
	entityIds: z.array(z.string()).optional(),
	description: z.string().optional(),
	createdByIds: z.array(z.string()).optional(),
	dateFrom: z.string().optional(),
	dateTo: z.string().optional(),
	statuses: z.array(ProjectStatusEnum).optional(),
	maxOfferedHours: z.number().optional(),
	minOfferedHours: z.number().optional(),
	areaOfExpertiseIds: z.array(z.string()).optional(),
	availability: z.boolean().optional(),
});

export const ProjectComplexSearchResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	entity: EntitySimpleComplexSearchResponseSchema,
	description: z.string(),
	projectInfo: ProjectInfoResponseSchema,
	status: ProjectStatusResponseSchema,
});
