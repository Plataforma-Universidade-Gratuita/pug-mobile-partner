export type PrimitiveHeaderValue = string | number | boolean;

export interface ApiRequestOptions extends Omit<RequestInit, "headers"> {
	headers?: HeadersInit;
	locale?: string;
	authToken?: string;
}
