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
