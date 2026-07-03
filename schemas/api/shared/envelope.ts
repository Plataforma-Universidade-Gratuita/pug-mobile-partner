/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
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
