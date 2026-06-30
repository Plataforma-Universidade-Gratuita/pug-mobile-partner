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
