/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { z } from "zod";

export const CityResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	ibgeCode: z.string(),
});

export const CityComplexSearchRequestSchema = z.object({
	name: z.string(),
});
