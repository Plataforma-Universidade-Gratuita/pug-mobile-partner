import type { TFunction } from "i18next";
import { z } from "zod";

import { createPasswordFieldSchema } from "@/schemas/client/shared";

export function createWireCredentialsFormSchema(t: TFunction) {
	return z
		.object({
			password: createPasswordFieldSchema(
				true,
				t("auth.wireCredentials.errors.passwordRequired"),
				t("auth.wireCredentials.errors.passwordMinLength"),
			),
			confirmPassword: z.string().trim(),
		})
		.superRefine((value, ctx) => {
			if (value.confirmPassword.trim().length === 0) {
				ctx.addIssue({
					code: "custom",
					path: ["confirmPassword"],
					message: t("auth.wireCredentials.errors.confirmationRequired"),
				});
				return;
			}

			if (value.password !== value.confirmPassword) {
				ctx.addIssue({
					code: "custom",
					path: ["confirmPassword"],
					message: t("auth.wireCredentials.errors.confirmationMismatch"),
				});
			}
		});
}
