import { z } from "zod";

/*
 * Forced exception: this frozen API schema avoids the root schemas barrel to
 * break a build-time initialization cycle during Next.js SSR collection.
 */
import { FormerStudentSimpleComplexSearchResponseSchema } from "../academic/former-students";
import { AuditInfoResponseSchema } from "../shared/shared";
import { ProjectSimpleComplexSearchResponseSchema } from "./projects";

export const EnrollmentStatusEnum = z.enum([
	"APPROVED",
	"CANCELED",
	"COMPLETED",
	"EXITED",
	"ON_HOLD",
	"PENDING",
	"REJECTED",
	"REMOVED",
]);

export const EnrollmentStatusResponseSchema = z.object({
	status: EnrollmentStatusEnum,
	statusFormatted: z.string(),
});

export const EnrollmentInfoResponseSchema = z.object({
	acceptedAt: z.string().nullable(),
	acceptedAtFormatted: z.string(),
	closingStatusAt: z.string().nullable(),
	closingStatusAtFormatted: z.string(),
	auditInfo: AuditInfoResponseSchema,
});

export const EnrollmentResponseSchema = z.object({
	projectId: z.string(),
	formerStudentId: z.string(),
	status: EnrollmentStatusResponseSchema,
	enrollmentInfo: EnrollmentInfoResponseSchema,
});

export const EnrollmentUpdateStatusRequestSchema = z.object({
	status: EnrollmentStatusEnum,
});

export const EnrollmentComplexSearchRequestSchema = z.object({
	projectIds: z.array(z.string()).optional(),
	formerStudentIds: z.array(z.string()).optional(),
	statuses: z.array(EnrollmentStatusEnum).optional(),
	dateFrom: z.string().optional(),
	dateTo: z.string().optional(),
	periodFrom: z.string().optional(),
	periodTo: z.string().optional(),
});

export const EnrollmentComplexSearchResponseSchema = z.object({
	project: ProjectSimpleComplexSearchResponseSchema,
	student: FormerStudentSimpleComplexSearchResponseSchema,
	status: EnrollmentStatusResponseSchema,
	enrollmentInfo: EnrollmentInfoResponseSchema,
});

export const EnrollmentCreateRequestSchema = z.object({
	projectId: z.string(),
	formerStudentId: z.string().optional(),
});
