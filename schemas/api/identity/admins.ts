import { z } from "zod";

import { CampusResponseSchema } from "../shared/shared";
/*
 * Forced exception: this frozen API schema avoids the root schemas barrel to
 * break a build-time initialization cycle during Next.js SSR collection.
 */
import {
	AccountComplexSearchResponseSchema,
	AccountResponseSchema,
} from "./accounts";

// ─── Responses ───────────────────────────────────────────────────────────────

export const AdminResponseSchema = z.object({
	accountResponse: AccountResponseSchema,
	campus: CampusResponseSchema,
	grantedAt: z.string(),
	grantedAtFormatted: z.string(),
});

export const AdminComplexSearchResponseSchema = z.object({
	account: AccountComplexSearchResponseSchema,
	campus: CampusResponseSchema,
	grantedAt: z.string(),
	grantedAtFormatted: z.string(),
});

export const AdminComplexSearchRequestSchema = z.object({
	name: z.string().optional(),
	cpf: z.string().optional(),
	email: z.string().optional(),
	dateFrom: z.iso.datetime({ offset: true }).optional(),
	dateTo: z.iso.datetime({ offset: true }).optional(),
	activeOnly: z.boolean().optional(),
});

// ─── Requests ────────────────────────────────────────────────────────────────

export const AdminCreateRequestSchema = z.object({
	cpf: z.string(),
	name: z.string(),
	email: z.string(),
	campus: CampusResponseSchema.shape.campus,
});

export const AdminUpdateRequestSchema = z.object({
	name: z.string(),
	email: z.string(),
	campus: CampusResponseSchema.shape.campus,
});

export const AdminSearchResponseSchema = AdminComplexSearchResponseSchema;
