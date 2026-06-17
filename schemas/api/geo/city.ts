import { z } from "zod";

// ─── Responses ───────────────────────────────────────────────────────────────

export const CityResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	ibgeCode: z.string(),
});
