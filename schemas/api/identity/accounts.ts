import { z } from "zod";

/*
 * Forced exception: this frozen API schema avoids the root schemas barrel to
 * break a build-time initialization cycle during Next.js SSR collection.
 */
import {
	AccountTypeEnum,
	AccountTypeResponseSchema,
	AuditInfoResponseSchema,
} from "../shared/shared";
import { UserSimpleComplexSearchResponseSchema } from "./users";

export const AccountResponseSchema = z.object({
	id: z.string(),
	userId: z.string(),
	email: z.string(),
	accountType: AccountTypeResponseSchema,
	auditInfo: AuditInfoResponseSchema,
	active: z.boolean(),
});

export const AccountSimpleComplexSearchResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
});

export const AccountComplexSearchResponseSchema = z.object({
	id: z.string(),
	user: UserSimpleComplexSearchResponseSchema,
	email: z.string(),
	accountType: AccountTypeResponseSchema,
	auditInfo: AuditInfoResponseSchema,
	active: z.boolean(),
});

export const AccountComplexSearchRequestSchema = z.object({
	name: z.string().optional(),
	cpf: z.string().optional(),
	email: z.string().optional(),
	accountTypes: z.array(AccountTypeEnum).optional(),
	dateFrom: z.iso.datetime({ offset: true }).optional(),
	dateTo: z.iso.datetime({ offset: true }).optional(),
	activeOnly: z.boolean().optional(),
});

export const AccountSearchResponseSchema = AccountComplexSearchResponseSchema;
