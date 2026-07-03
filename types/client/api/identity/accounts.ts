/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */

export type AccountSearchAccountType =
	| ""
	| "ADMIN"
	| "FORMER_STUDENT"
	| "PARTNER";

export interface AccountComplexSearchFilters {
	name: string;
	cpf: string;
	email: string;
	accountTypes: AccountSearchAccountType[];
	dateFrom: string;
	dateTo: string;
	activeOnly: boolean;
}
