/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */

export interface ComboboxOption {
	label: string;
	value: string;
	description?: string | null;
	keywords?: string[];
	searchText?: string;
	disabled?: boolean;
}

export interface CpfFormFieldExistingUser {
	id: string;
	name: string;
	email: string;
	cpf: string;
}
