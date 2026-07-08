
import type { TFunction } from "i18next";
import { z } from "zod";

import {
	createEmailFieldSchema,
	createPasswordFieldSchema,
} from "@/schemas/client/shared";

export function createLoginFormSchema(t: TFunction) {
	return z.object({
		email: createEmailFieldSchema(
			true,
			t("auth.login.errors.emailRequired"),
			t("auth.login.errors.emailInvalid"),
			t("auth.login.errors.emailTooLong"),
		),
		password: createPasswordFieldSchema(
			false,
			t("auth.login.errors.passwordRequired"),
			t("auth.login.errors.passwordInvalid"),
		),
	});
}
