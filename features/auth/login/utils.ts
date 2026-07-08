
import { ApiError } from "@/api";

export function resolveLoginErrorMessage(error: unknown) {
	return resolveLoginErrorMessageWithMessages(error, {
		invalidCredentials: "Email or password is incorrect.",
		fallback: "Unable to sign in right now. Try again in a moment.",
	});
}

export function resolveLoginErrorMessageWithMessages(
	error: unknown,
	messages: { invalidCredentials: string; fallback: string },
) {
	if (error instanceof ApiError) {
		if (error.status === 401) {
			return messages.invalidCredentials;
		}

		return error.message;
	}

	if (error instanceof Error && error.message) {
		return error.message;
	}

	return messages.fallback;
}
