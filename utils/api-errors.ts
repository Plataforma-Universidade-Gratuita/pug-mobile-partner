import type {
	ApiErrorToastContent,
	ApiErrorToastOptions,
} from "@/types/client";
import { ApiError } from "@/utils/api";

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

export function getApiErrorToastContent(
	error: unknown,
	options: ApiErrorToastOptions,
): ApiErrorToastContent {
	const description = getApiErrorMessage(error) ?? options.fallbackDescription;

	return {
		title: options.fallbackTitle,
		description,
	};
}

export function getApiErrorFieldErrors(error: unknown) {
	if (error instanceof ApiError) {
		return error.fieldErrors;
	}

	return {};
}

export function getApiErrorCode(error: unknown): string | undefined {
	if (error instanceof ApiError) {
		return error.code;
	}

	return undefined;
}

export function hasApiErrorDetails(error: unknown): boolean {
	return error instanceof ApiError && error.details != null;
}
