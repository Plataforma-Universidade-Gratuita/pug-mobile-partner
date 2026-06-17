import { z } from "zod";

import {
	AccountTypeEnum,
	AuditInfoResponseSchema,
	CampiEnum,
	CampusResponseSchema,
} from "@/schemas/api/shared/shared";

// ─── Enums ───────────────────────────────────────────────────────────────────

export type Campi = z.infer<typeof CampiEnum>;
export type AccountType = z.infer<typeof AccountTypeEnum>;

// ─── Responses ───────────────────────────────────────────────────────────────

export type AuditInfoResponse = z.infer<typeof AuditInfoResponseSchema>;
export type CampusResponse = z.infer<typeof CampusResponseSchema>;
