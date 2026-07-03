/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { z } from "zod";

import {
	ApiErrorSchema,
	FieldErrorDetailSchema,
	FieldErrorSchema,
} from "@/schemas/api";

export type FieldErrorDetail = z.infer<typeof FieldErrorDetailSchema>;
export type FieldError = z.infer<typeof FieldErrorSchema>;
export type ApiErrorBody = z.infer<typeof ApiErrorSchema>;
