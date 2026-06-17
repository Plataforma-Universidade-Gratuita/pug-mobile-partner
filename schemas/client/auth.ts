import type { TFunction } from "i18next";
import { z } from "zod";

import { TokenResponseSchema } from "@/schemas/api/identity/auth";
import { createApiSuccessEnvelopeSchema } from "@/schemas/api/shared/envelope";

export function createLoginFormSchema(t: TFunction) {
	return z.object({
		email: z.email(t("auth.login.validation.email")),
		password: z.string().min(1, t("auth.login.validation.password")),
	});
}

export const RefreshSessionEnvelopeSchema =
	createApiSuccessEnvelopeSchema(TokenResponseSchema);
