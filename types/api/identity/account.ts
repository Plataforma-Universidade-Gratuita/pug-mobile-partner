import { z } from "zod";

import { AccountResponseSchema } from "@/schemas/api/identity/account";

// ─── Responses ───────────────────────────────────────────────────────────────

export type AccountResponse = z.infer<typeof AccountResponseSchema>;
