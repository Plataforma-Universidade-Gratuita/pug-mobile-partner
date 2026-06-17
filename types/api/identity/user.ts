import { z } from "zod";

import { UserResponseSchema } from "@/schemas/api/identity/user";

// ─── Responses ───────────────────────────────────────────────────────────────

export type UserResponse = z.infer<typeof UserResponseSchema>;
