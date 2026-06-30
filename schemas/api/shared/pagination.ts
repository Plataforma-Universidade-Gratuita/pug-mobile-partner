import { z } from "zod";

export const PaginationRequestSchema = z.object({
	page: z.coerce.number().int().min(0),
	size: z.coerce.number().int().min(1),
});

export function createPageResponseSchema<TItem extends z.ZodTypeAny>(
	itemSchema: TItem,
) {
	return z.object({
		content: z.array(itemSchema),
		page: z.number().int().min(0),
		size: z.number().int().min(1),
		totalElements: z.number().int().nonnegative(),
		totalPages: z.number().int().min(0),
	});
}
