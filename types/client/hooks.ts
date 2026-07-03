/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import type { TFunction } from "i18next";
import type {
	FieldValues,
	Resolver,
	UseFormProps,
	UseFormReturn,
} from "react-hook-form";
import type { ZodType } from "zod";

export interface LocalizedZodFormOptions<
	TValues extends FieldValues,
> extends Omit<UseFormProps<TValues>, "resolver"> {
	schemaFactory: (t: TFunction) => ZodType<TValues>;
	revalidateOnLanguageChange?: boolean;
}

export type LocalizedZodFormResult<TValues extends FieldValues> =
	UseFormReturn<TValues>;

export type LocalizedZodFormResolver<TValues extends FieldValues> =
	Resolver<TValues>;
