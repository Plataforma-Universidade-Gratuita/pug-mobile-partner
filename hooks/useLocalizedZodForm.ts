/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { useEffect, useMemo, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";

import type {
	LocalizedZodFormOptions,
	LocalizedZodFormResolver,
	LocalizedZodFormResult,
} from "@/types/client";

export function useLocalizedZodForm<TValues extends FieldValues>({
	schemaFactory,
	revalidateOnLanguageChange = true,
	...formOptions
}: LocalizedZodFormOptions<TValues>): LocalizedZodFormResult<TValues> {
	const { i18n, t } = useTranslation();
	const previousLanguageRef = useRef(i18n.language);
	const schema = useMemo(() => schemaFactory(t), [schemaFactory, t]);
	const resolver = useMemo(
		() =>
			zodResolver(
				schema as Parameters<typeof zodResolver>[0],
			) as LocalizedZodFormResolver<TValues>,
		[schema],
	);
	const form = useForm<TValues, undefined, TValues>({
		...formOptions,
		resolver,
	});

	useEffect(() => {
		const previousLanguage = previousLanguageRef.current;
		previousLanguageRef.current = i18n.language;

		if (
			!revalidateOnLanguageChange ||
			previousLanguage === i18n.language ||
			Object.keys(form.formState.errors).length === 0
		) {
			return;
		}

		void form.trigger();
	}, [form, i18n.language, revalidateOnLanguageChange]);

	return form as LocalizedZodFormResult<TValues>;
}
