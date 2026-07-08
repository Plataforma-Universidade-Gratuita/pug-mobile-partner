import { useCallback, useState } from "react";

export function useServerErrorState() {
	const [serverError, setServerError] = useState<string | null>(null);

	const clearServerError = useCallback(() => {
		setServerError(null);
	}, []);

	return {
		clearServerError,
		serverError,
		setServerError,
	};
}
