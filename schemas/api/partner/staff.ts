import { z } from "zod";

/*
 * Forced exception: this frozen API schema avoids the root schemas barrel to
 * break a build-time initialization cycle during Next.js SSR collection.
 */
import {
	AccountComplexSearchResponseSchema,
	AccountResponseSchema,
} from "../identity/accounts";
import { EntitySimpleComplexSearchResponseSchema } from "./entities";

export const StaffResponseSchema = z.object({
	account: AccountResponseSchema,
	entityId: z.string(),
	cityId: z.string(),
});

export const StaffComplexSearchRequestSchema = z.object({
	name: z.string().optional(),
	cpf: z.string().optional(),
	email: z.string().optional(),
	dateFrom: z.string().optional(),
	dateTo: z.string().optional(),
	activeOnly: z.boolean().optional(),
	entityIds: z.array(z.string()).optional(),
});

export const StaffComplexSearchResponseSchema = z.object({
	account: AccountComplexSearchResponseSchema,
	entity: EntitySimpleComplexSearchResponseSchema,
});

export const StaffCreateRequestSchema = z.object({
	cpf: z.string(),
	name: z.string(),
	email: z.string(),
	entityId: z.string(),
});

export const StaffUpdateRequestSchema = z.object({
	name: z.string(),
	email: z.string(),
	entityId: z.string(),
});
