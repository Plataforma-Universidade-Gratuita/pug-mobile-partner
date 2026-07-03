/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */

export type PrimitiveHeaderValue = string | number | boolean;

export interface ApiRequestOptions extends Omit<RequestInit, "headers"> {
	headers?: HeadersInit;
	locale?: string;
	authToken?: string;
}
