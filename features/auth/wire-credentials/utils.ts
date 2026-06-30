import * as api from "@/api";

const { ApiError } = api;

export function resolveWireCredentialsErrorMessage(error: unknown) {
	return resolveWireCredentialsErrorMessageWithFallback(
		error,
		"Unable to finish setup right now. Try again in a moment.",
	);
}

export function resolveWireCredentialsErrorMessageWithFallback(
	error: unknown,
	fallback: string,
) {
	if (error instanceof ApiError) {
		return error.message;
	}

	if (error instanceof Error && error.message) {
		return error.message;
	}

	return fallback;
}
