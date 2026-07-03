/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
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
