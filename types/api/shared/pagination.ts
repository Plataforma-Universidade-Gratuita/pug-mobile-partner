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
