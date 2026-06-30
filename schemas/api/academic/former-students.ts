import { z } from "zod";

import {
	AuditInfoResponseSchema,
	CampiEnum,
	CampusResponseSchema,
} from "@/schemas/api/shared/shared";

/*
 * Forced exception: this frozen API schema avoids the root schemas barrel to
 * break a build-time initialization cycle during Next.js SSR collection.
 */
import {
	AccountComplexSearchResponseSchema,
	AccountSimpleComplexSearchResponseSchema,
} from "../identity/accounts";
import { CourseComplexSearchResponseSchema } from "./courses";

export const CounterpartHoursResponseSchema = z.object({
	requiredHours: z.number(),
	completedHours: z.number(),
	missingHours: z.number(),
	progress: z.number(),
	concluded: z.boolean(),
});

export const PeriodResponseSchema = z.object({
	startDate: z.string(),
	startDateFormatted: z.string(),
	dueDate: z.string(),
	dueDateFormatted: z.string(),
	remainingDays: z.number(),
	remainingDaysFormatted: z.string(),
});

export const FormerStudentCreateRequestSchema = z.object({
	cpf: z.string(),
	name: z.string(),
	email: z.string(),
	academicRegistration: z.string(),
	campus: CampiEnum,
	courseId: z.string(),
	requiredHours: z.number(),
	startDate: z.string(),
	dueDate: z.string(),
});

export const FormerStudentUpdateRequestSchema = z.object({
	name: z.string(),
	cpf: z.string(),
	email: z.string(),
	academicRegistration: z.string(),
	campus: CampiEnum,
	courseId: z.string(),
	requiredHours: z.number(),
	startDate: z.string(),
	dueDate: z.string(),
});

export const FormerStudentResponseSchema = z.object({
	accountId: z.string(),
	academicRegistration: z.string(),
	campus: CampusResponseSchema,
	courseId: z.string(),
	counterpartHours: CounterpartHoursResponseSchema,
	period: PeriodResponseSchema,
	auditInfo: AuditInfoResponseSchema,
});

export const FormerStudentSimpleComplexSearchResponseSchema = z.object({
	account: AccountSimpleComplexSearchResponseSchema,
	academicRegistration: z.string(),
	campus: CampusResponseSchema,
});

export const FormerStudentComplexSearchRequestSchema = z.object({
	name: z.string().optional(),
	cpf: z.string().optional(),
	email: z.string().optional(),
	academicRegistration: z.string().optional(),
	campi: z.array(CampiEnum).optional(),
	periodFrom: z.string().optional(),
	periodTo: z.string().optional(),
	includeConcluded: z.boolean().optional(),
	dateFrom: z.string().optional(),
	dateTo: z.string().optional(),
	activeOnly: z.boolean().optional(),
	courseIds: z.array(z.string()).optional(),
	areaOfExpertiseIds: z.array(z.string()).optional(),
});

export const FormerStudentComplexSearchResponseSchema = z.object({
	account: AccountComplexSearchResponseSchema,
	academicRegistration: z.string(),
	campus: CampusResponseSchema,
	counterpartHours: CounterpartHoursResponseSchema,
	period: PeriodResponseSchema,
	auditInfo: AuditInfoResponseSchema,
	course: CourseComplexSearchResponseSchema,
});
