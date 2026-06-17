import { z } from "zod";

import { CityResponseSchema } from "@/schemas/api/geo/city";

// ─── Responses ───────────────────────────────────────────────────────────────

export type CityResponse = z.infer<typeof CityResponseSchema>;
