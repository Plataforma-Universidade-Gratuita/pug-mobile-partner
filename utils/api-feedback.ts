import { ApiError } from "@/api/errors";
import type {
	ApiFeedbackContent,
	ApiFeedbackContentOptions,
} from "@/types/client";

function isMeaningfulMessage(message: string | undefined): message is string {
	if (!message) return false;
	return !/^HTTP\s\d{3}$/.test(message);
}

export function getApiErrorMessage(error: unknown): string | undefined {
	if (error instanceof ApiError) {
		return isMeaningfulMessage(error.message) ? error.message : undefined;
	}

	if (error instanceof Error) {
		return isMeaningfulMessage(error.message) ? error.message : undefined;
	}

	return undefined;
}

export function getApiFeedbackContent(
	error: unknown,
	options: ApiFeedbackContentOptions,
): ApiFeedbackContent {
	return {
		title: options.fallbackTitle,
		description: getApiErrorMessage(error) ?? options.fallbackDescription,
	};
}

export function getApiFieldErrors(error: unknown) {
	if (error instanceof ApiError) {
		return error.fieldErrors;
	}

	return {};
}
