/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */

export function resolveProfileFieldValue(
	value: string | null | undefined,
	isPending: boolean,
	loadingLabel: string,
	unavailableLabel: string,
) {
	if (value && value.trim().length > 0) {
		return value.trim();
	}

	return isPending ? loadingLabel : unavailableLabel;
}
