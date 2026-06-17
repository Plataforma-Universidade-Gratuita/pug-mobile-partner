import { z } from "zod";

export const FieldErrorDetailSchema = z.object({
	code: z.string(),
	message: z.string(),
});

export const FieldErrorSchema = z.object({
	field: z.string(),
	errors: z.array(FieldErrorDetailSchema),
});

export const ApiErrorSchema = z.object({
	code: z.string(),
	message: z.string(),
	details: z.array(FieldErrorSchema).nullable().optional(),
});

export const ApiEnvelopeErrorSchema = z.object({
	success: z.literal(false),
	data: z.null(),
	error: ApiErrorSchema,
	timestamp: z.string(),
	correlationId: z.string().nullable(),
});
