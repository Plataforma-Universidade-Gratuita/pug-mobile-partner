import { z } from "zod";

import {
	AccountTypeEnum,
	AccountTypeResponseSchema,
	AuditInfoResponseSchema,
	AccountStatusRequestSchema,
	CampiEnum,
	CampusResponseSchema,
} from "@/schemas/api";

export type Campi = z.infer<typeof CampiEnum>;
export type AccountType = z.infer<typeof AccountTypeEnum>;

export type AccountTypeResponse = z.infer<typeof AccountTypeResponseSchema>;
export type AuditInfoResponse = z.infer<typeof AuditInfoResponseSchema>;
export type AccountStatusRequest = z.infer<typeof AccountStatusRequestSchema>;
export type CampusResponse = z.infer<typeof CampusResponseSchema>;
