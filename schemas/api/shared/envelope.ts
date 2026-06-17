import { z } from "zod";

export function createApiSuccessEnvelopeSchema<T extends z.ZodTypeAny>(
	dataSchema: T,
) {
	return z.object({
		success: z.literal(true),
		data: dataSchema,
		error: z.null(),
		timestamp: z.string(),
		correlationId: z.string().nullable(),
	});
}
