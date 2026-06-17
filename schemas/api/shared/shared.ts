import { z } from "zod";

// ─── Enums ───────────────────────────────────────────────────────────────────

export const CampiEnum = z.enum(["JARAGUA_DO_SUL", "JOINVILLE"]);

export const AccountTypeEnum = z.enum(["ADMIN", "PARTNER", "STUDENT"]);

// ─── Responses ───────────────────────────────────────────────────────────────

export const AuditInfoResponseSchema = z.object({
	createdAt: z.string(),
	createdAtFormatted: z.string(),
	updatedAt: z.string(),
	updatedAtFormatted: z.string(),
});

export const CampusResponseSchema = z.object({
	campus: CampiEnum,
	campusFormatted: z.string(),
});
