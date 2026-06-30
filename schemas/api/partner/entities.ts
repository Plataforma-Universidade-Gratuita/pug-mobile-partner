import { z } from "zod";

/*
 * Forced exception: this frozen API schema avoids the root schemas barrel to
 * break a build-time initialization cycle during Next.js SSR collection.
 */
import { CityResponseSchema } from "../geo/city";
import { AuditInfoResponseSchema } from "../shared/shared";

export const EntitySimpleComplexSearchResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
});

export const EntityResponseSchema = z.object({
	id: z.string(),
	cnpj: z.string(),
	cnpjFormatted: z.string(),
	name: z.string(),
	address: z.string().nullable().optional(),
	cityId: z.string(),
	auditInfo: AuditInfoResponseSchema,
});

export const EntityComplexSearchRequestSchema = z.object({
	name: z.string().optional(),
	cnpj: z.string().optional(),
	address: z.string().nullable().optional(),
	cityIds: z.array(z.string()).optional(),
	dateFrom: z.iso.datetime({ offset: true }).optional(),
	dateTo: z.iso.datetime({ offset: true }).optional(),
});

export const EntityComplexSearchResponseSchema = z.object({
	id: z.string(),
	cnpj: z.string(),
	cnpjFormatted: z.string(),
	name: z.string(),
	address: z.string().nullable().optional(),
	city: CityResponseSchema,
	auditInfo: AuditInfoResponseSchema,
});

export const EntityCreateRequestSchema = z.object({
	cnpj: z.string(),
	name: z.string(),
	cityId: z.string(),
	address: z.string().nullable().optional(),
});

export const EntityUpdateRequestSchema = z.object({
	name: z.string(),
	cityId: z.string(),
	address: z.string().nullable().optional(),
});
