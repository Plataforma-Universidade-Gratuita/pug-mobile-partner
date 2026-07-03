/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { z } from "zod";

import { PaginationRequestSchema } from "@/schemas/api";

export type PaginationRequest = z.infer<typeof PaginationRequestSchema>;

export interface PageResponse<TData> {
	content: TData[];
	page: number;
	size: number;
	totalElements: number;
	totalPages: number;
}
