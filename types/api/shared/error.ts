import { z } from "zod";

import {
	ApiErrorSchema,
	FieldErrorDetailSchema,
	FieldErrorSchema,
} from "@/schemas/api";

export type FieldErrorDetail = z.infer<typeof FieldErrorDetailSchema>;
export type FieldError = z.infer<typeof FieldErrorSchema>;
export type ApiErrorBody = z.infer<typeof ApiErrorSchema>;
