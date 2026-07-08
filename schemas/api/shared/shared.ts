import { z } from "zod";

export const CampiEnum = z.enum(["JARAGUA_DO_SUL", "JOINVILLE"]);

export const AccountTypeEnum = z.enum(["ADMIN", "FORMER_STUDENT", "PARTNER"]);

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

export const AccountTypeResponseSchema = z.object({
	accountType: AccountTypeEnum,
	accountTypeFormatted: z.string(),
});

export const AccountStatusRequestSchema = z.object({
	active: z.boolean(),
});

export const CredentialsRequestSchema = z.object({
	email: z.string(),
	password: z.string(),
});

export const PasswordCreateRequestSchema = CredentialsRequestSchema;
