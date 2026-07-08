import { z } from "zod";

/*
 * Forced exception: this frozen API schema avoids the root schemas barrel to
 * break a build-time initialization cycle during Next.js SSR collection.
 */
import { FormerStudentSimpleComplexSearchResponseSchema } from "../academic/former-students";
import { AccountSimpleComplexSearchResponseSchema } from "../identity/accounts";
import { AuditInfoResponseSchema } from "../shared/shared";
import { ProjectSimpleComplexSearchResponseSchema } from "./projects";

export const AttendanceStatusEnum = z.enum(["ABSENT", "PRESENT", "WAITING"]);

export const AttendanceStatusResponseSchema = z.object({
	status: AttendanceStatusEnum,
	statusFormatted: z.string(),
});

export const QrValidationInfoResponseSchema = z.object({
	duration: z.number(),
	qrValidationHash: z.string(),
});

export const AttendanceInfoResponseSchema = z.object({
	validatedBy: z.string().nullable(),
	validatedAt: z.string().nullable(),
	validatedAtFormatted: z.string(),
	auditInfo: AuditInfoResponseSchema,
});

export const AttendanceCreateRequestSchema = z.object({
	projectId: z.string(),
	formerStudentId: z.string(),
	duration: z.number(),
});

export const AttendanceValidateRequestSchema = z.object({
	status: AttendanceStatusEnum,
	qrValidationHash: z.string(),
});

export const AttendanceResponseSchema = z.object({
	id: z.string(),
	projectId: z.string(),
	formerStudentId: z.string(),
	status: AttendanceStatusResponseSchema,
	attendanceInfo: AttendanceInfoResponseSchema,
	qrValidationInfo: QrValidationInfoResponseSchema,
});

export const AttendanceComplexSearchRequestSchema = z.object({
	projectIds: z.array(z.string()).optional(),
	formerStudentIds: z.array(z.string()).optional(),
	statuses: z.array(AttendanceStatusEnum).optional(),
	validatedByIds: z.array(z.string()).optional(),
	durationFrom: z.number().optional(),
	durationTo: z.number().optional(),
	dateFrom: z.string().optional(),
	dateTo: z.string().optional(),
});

export const AttendanceComplexSearchResponseSchema = z.object({
	id: z.string(),
	project: ProjectSimpleComplexSearchResponseSchema,
	student: FormerStudentSimpleComplexSearchResponseSchema,
	status: AttendanceStatusResponseSchema,
	attendanceInfo: AttendanceInfoResponseSchema,
	validator: AccountSimpleComplexSearchResponseSchema.nullable(),
	qrValidationInfo: QrValidationInfoResponseSchema,
});
