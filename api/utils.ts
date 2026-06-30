import i18n from "i18next";
import { z } from "zod";

import { executeInternalMockRequest } from "@/api/internal-mock";
import {
	ACCESS_TOKEN_STORAGE_KEY,
	DEFAULT_LANG,
	REFRESH_TOKEN_STORAGE_KEY,
	REQUIRES_CREDENTIAL_SETUP_STORAGE_KEY,
} from "@/constants";
import {
	createApiSuccessEnvelopeSchema,
	RefreshRequestSchema,
	TokenResponseSchema,
} from "@/schemas/api";
import type {
	AttendanceComplexSearchRequest,
	AttendanceStatus,
	EnrollmentComplexSearchRequest,
	EnrollmentStatus,
	EntityComplexSearchRequest,
	ProjectComplexSearchRequest,
	StaffComplexSearchRequest,
	TokenResponse,
	UserComplexSearchRequest,
} from "@/types/api";
import type {
	AccountComplexSearchFilters,
	EntityComplexSearchFilters,
	ProjectComplexSearchFilters,
	ApiRequestOptions,
	PrimitiveHeaderValue,
	SearchDateBoundary,
	StaffComplexSearchFilters,
	UserComplexSearchFilters,
	AuthenticatedApiRequestOptions,
	ApiSessionProvider,
} from "@/types/client";
import { getStoredValue, removeStoredValue, setStoredValue } from "@/utils";

import {
	API_BASE_URL,
	API_ROUTE_BASES,
	JSON_HEADERS,
	USE_INTERNAL_MOCK,
} from "./constants";
import { parseApiErrorResponse } from "./errors";

function normalizeHeaders(headers?: HeadersInit): Record<string, string> {
	if (!headers) {
		return {};
	}

	if (headers instanceof Headers) {
		return Object.fromEntries(headers.entries());
	}

	if (Array.isArray(headers)) {
		return Object.fromEntries(headers);
	}

	return Object.fromEntries(
		Object.entries(headers)
			.filter(([, value]) => value != null)
			.map(([key, value]) => [key, String(value as PrimitiveHeaderValue)]),
	);
}

export function qs(params: Record<string, string | undefined | null>): string {
	const entries = Object.entries(params).filter(
		(entry): entry is [string, string] => entry[1] != null && entry[1] !== "",
	);
	if (entries.length === 0) return "";
	return "?" + new URLSearchParams(entries).toString();
}

export function resolveApiLocale(explicitLocale?: string): string {
	return (
		explicitLocale ?? i18n.resolvedLanguage ?? i18n.language ?? DEFAULT_LANG
	);
}

export function buildApiUrl(path: string): string {
	if (/^https?:\/\//.test(path)) {
		return path;
	}

	return `${API_BASE_URL}${path}`;
}

export function buildApiHeaders(
	options: {
		headers?: HeadersInit;
		locale?: string;
		authToken?: string | null;
	} = {},
): Record<string, string> {
	const headers = {
		...JSON_HEADERS,
		...normalizeHeaders(options.headers),
	};
	const locale = resolveApiLocale(options.locale);
	if (locale) {
		headers["Accept-Language"] = locale;
	}
	if (options.authToken) {
		headers.Authorization = `Bearer ${options.authToken}`;
	}
	return headers;
}

async function performApiRequest(path: string, options: RequestInit = {}) {
	if (USE_INTERNAL_MOCK) {
		return executeInternalMockRequest(path, options);
	}

	return fetch(buildApiUrl(path), options);
}

export async function executeApiRequest(
	path: string,
	options: ApiRequestOptions = {},
): Promise<Response> {
	const response = await performApiRequest(path, {
		...options,
		headers: buildApiHeaders(options),
	});

	if (!response.ok) {
		return parseApiErrorResponse(response);
	}

	return response;
}

export async function parseApiData<T extends z.ZodTypeAny>(
	response: Response,
	schema: T,
): Promise<z.infer<T>> {
	const json = await response.json();
	const envelope = createApiSuccessEnvelopeSchema(schema).parse(json) as {
		data: z.infer<T>;
	};
	return envelope.data;
}

export async function parseApiVoid(response: Response): Promise<void> {
	if (response.status === 204) {
		return;
	}

	const text = await response.text();
	if (!text.trim()) {
		return;
	}

	try {
		const json = JSON.parse(text) as unknown;
		const envelopeResult = createApiSuccessEnvelopeSchema(
			z.unknown(),
		).safeParse(json);
		if (envelopeResult.success) {
			return;
		}
	} catch {
		// Ignore unexpected success bodies for void requests.
	}
}

export async function apiFetch<T extends z.ZodTypeAny>(
	path: string,
	schema: T,
	options: ApiRequestOptions = {},
): Promise<z.infer<T>> {
	const response = await executeApiRequest(path, options);
	return parseApiData(response, schema);
}

export async function apiVoid(
	path: string,
	options: ApiRequestOptions = {},
): Promise<void> {
	const response = await executeApiRequest(path, options);
	await parseApiVoid(response);
}

export function buildAccountComplexSearchRequest(
	filters: AccountComplexSearchFilters,
) {
	const normalizedName = filters.name.trim();
	const normalizedCpf = normalizeCpfSearch(filters.cpf.trim());
	const normalizedEmail = filters.email.trim();
	const normalizedDateFrom = toSearchDateOffsetDateTime(
		filters.dateFrom.trim(),
		"start",
	);
	const normalizedDateTo = toSearchDateOffsetDateTime(
		filters.dateTo.trim(),
		"end",
	);
	const normalizedAccountTypes = filters.accountTypes.filter(
		(accountType): accountType is Exclude<typeof accountType, ""> =>
			accountType.length > 0,
	);

	return {
		name: normalizedName || undefined,
		cpf: normalizedCpf || undefined,
		email: normalizedEmail || undefined,
		accountTypes:
			normalizedAccountTypes.length > 0 ? normalizedAccountTypes : undefined,
		dateFrom: normalizedDateFrom,
		dateTo: normalizedDateTo,
		activeOnly: filters.activeOnly,
	};
}

function normalizeCpfSearch(value: string) {
	return value.replace(/\D+/g, "");
}

export function toSearchDateOffsetDateTime(
	value: string,
	boundary: SearchDateBoundary,
) {
	const timestamp = getSearchDateBoundaryTimestamp(value, boundary);

	if (timestamp === null) {
		return undefined;
	}

	return new Date(timestamp).toISOString();
}

export function getSearchDateBoundaryTimestamp(
	value: string,
	boundary: SearchDateBoundary,
) {
	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return null;
	}

	setBoundaryHours(date, boundary);
	return date.getTime();
}

function setBoundaryHours(date: Date, boundary: SearchDateBoundary) {
	if (boundary === "start") {
		date.setHours(0, 0, 0, 0);
		return;
	}

	date.setHours(23, 59, 59, 999);
}

export function buildUserComplexSearchRequest(
	filters: UserComplexSearchFilters,
): UserComplexSearchRequest {
	const normalizedName = filters.name.trim();
	const normalizedCpf = normalizeCpfSearch(filters.cpf.trim());
	const normalizedDateFrom = toSearchDateOffsetDateTime(
		filters.dateFrom.trim(),
		"start",
	);
	const normalizedDateTo = toSearchDateOffsetDateTime(
		filters.dateTo.trim(),
		"end",
	);

	return {
		name: normalizedName || undefined,
		cpf: normalizedCpf || undefined,
		dateFrom: normalizedDateFrom,
		dateTo: normalizedDateTo,
	};
}

export function buildEntityComplexSearchRequest(
	filters: EntityComplexSearchFilters,
): EntityComplexSearchRequest {
	return {
		...(filters.cityIdsFilter.length > 0
			? { cityIds: filters.cityIdsFilter }
			: {}),
		...(filters.dateFrom
			? { dateFrom: toSearchDateOffsetDateTime(filters.dateFrom, "start") }
			: {}),
		...(filters.dateTo
			? { dateTo: toSearchDateOffsetDateTime(filters.dateTo, "end") }
			: {}),
	};
}

export function buildStaffComplexSearchRequest(
	filters: StaffComplexSearchFilters,
): StaffComplexSearchRequest {
	const normalizedName = filters.name.trim();
	const normalizedCpf = normalizeCpfSearch(filters.cpf.trim());
	const normalizedEmail = filters.email.trim();
	const normalizedDateFrom = toSearchDateOffsetDateTime(
		filters.dateFrom.trim(),
		"start",
	);
	const normalizedDateTo = toSearchDateOffsetDateTime(
		filters.dateTo.trim(),
		"end",
	);

	return {
		name: normalizedName || undefined,
		cpf: normalizedCpf || undefined,
		email: normalizedEmail || undefined,
		entityIds: filters.entityIds.length > 0 ? filters.entityIds : undefined,
		dateFrom: normalizedDateFrom,
		dateTo: normalizedDateTo,
		activeOnly: filters.activeOnly,
	};
}

export function buildAttendanceComplexSearchRequest(filters: {
	projectIds: string[];
	formerStudentIds: string[];
	statuses: AttendanceStatus[];
	validatedByIds: string[];
	durationFrom: string;
	durationTo: string;
	dateFrom: string;
	dateTo: string;
}): AttendanceComplexSearchRequest {
	return {
		projectIds: filters.projectIds.length > 0 ? filters.projectIds : undefined,
		formerStudentIds:
			filters.formerStudentIds.length > 0
				? filters.formerStudentIds
				: undefined,
		statuses: filters.statuses.length > 0 ? filters.statuses : undefined,
		validatedByIds:
			filters.validatedByIds.length > 0 ? filters.validatedByIds : undefined,
		durationFrom: filters.durationFrom.trim()
			? Number(filters.durationFrom)
			: undefined,
		durationTo: filters.durationTo.trim()
			? Number(filters.durationTo)
			: undefined,
		dateFrom: toSearchDateOffsetDateTime(filters.dateFrom, "start"),
		dateTo: toSearchDateOffsetDateTime(filters.dateTo, "end"),
	};
}

export function buildEnrollmentComplexSearchRequest(filters: {
	projectIds: string[];
	formerStudentIds: string[];
	statuses: EnrollmentStatus[];
	dateFrom: string;
	dateTo: string;
	periodFrom: string;
	periodTo: string;
}): EnrollmentComplexSearchRequest {
	return {
		projectIds: filters.projectIds.length > 0 ? filters.projectIds : undefined,
		formerStudentIds:
			filters.formerStudentIds.length > 0
				? filters.formerStudentIds
				: undefined,
		statuses: filters.statuses.length > 0 ? filters.statuses : undefined,
		dateFrom: toSearchDateOffsetDateTime(filters.dateFrom, "start"),
		dateTo: toSearchDateOffsetDateTime(filters.dateTo, "end"),
		periodFrom: filters.periodFrom || undefined,
		periodTo: filters.periodTo || undefined,
	};
}

export function buildProjectComplexSearchRequest(
	filters: ProjectComplexSearchFilters,
): ProjectComplexSearchRequest {
	return {
		name: filters.name.trim() || undefined,
		entityIds: filters.entityIds.length > 0 ? filters.entityIds : undefined,
		description: filters.description.trim() || undefined,
		createdByIds:
			filters.createdByIds.length > 0 ? filters.createdByIds : undefined,
		statuses: filters.statuses.length > 0 ? filters.statuses : undefined,
		maxOfferedHours: parseOptionalPositiveNumber(filters.maxOfferedHours),
		minOfferedHours: parseOptionalPositiveNumber(filters.minOfferedHours),
		dateFrom: toSearchDateOffsetDateTime(filters.dateFrom, "start"),
		dateTo: toSearchDateOffsetDateTime(filters.dateTo, "end"),
		areaOfExpertiseIds:
			filters.areaOfExpertiseIds.length > 0
				? filters.areaOfExpertiseIds
				: undefined,
		availability: filters.availability,
	};
}

function parseOptionalPositiveNumber(value: string) {
	const trimmed = value.trim();
	if (!trimmed) {
		return undefined;
	}

	const parsed = Number(trimmed);
	if (!Number.isFinite(parsed) || parsed < 0) {
		return undefined;
	}

	return parsed;
}

function createDefaultSessionProvider(): ApiSessionProvider {
	return {
		getAccessToken: () => getStoredValue(ACCESS_TOKEN_STORAGE_KEY),
		getRefreshToken: () => getStoredValue(REFRESH_TOKEN_STORAGE_KEY),
		getRequiresCredentialSetup: async () => {
			const storedValue = await getStoredValue(
				REQUIRES_CREDENTIAL_SETUP_STORAGE_KEY,
			);

			if (storedValue === null) {
				return null;
			}

			return storedValue === "1";
		},
		persistSession: async tokens => {
			await Promise.all([
				setStoredValue(ACCESS_TOKEN_STORAGE_KEY, tokens.token),
				setStoredValue(REFRESH_TOKEN_STORAGE_KEY, tokens.refreshToken),
				setStoredValue(
					REQUIRES_CREDENTIAL_SETUP_STORAGE_KEY,
					tokens.passwordWired ? "0" : "1",
				),
			]);
		},
		clearSession: async () => {
			await Promise.all([
				removeStoredValue(ACCESS_TOKEN_STORAGE_KEY),
				removeStoredValue(REFRESH_TOKEN_STORAGE_KEY),
				removeStoredValue(REQUIRES_CREDENTIAL_SETUP_STORAGE_KEY),
			]);
		},
		onSessionInvalidated: () => undefined,
	};
}

let sessionProvider: ApiSessionProvider = createDefaultSessionProvider();

let refreshPromise: Promise<TokenResponse | null> | null = null;

export function configureApiSessionProvider(
	provider: ApiSessionProvider | null,
) {
	sessionProvider = provider ?? createDefaultSessionProvider();
}

export function getApiSessionProvider() {
	return sessionProvider;
}

async function invalidateSession() {
	await sessionProvider.clearSession();
	await sessionProvider.onSessionInvalidated();
}

async function refreshSession(): Promise<TokenResponse | null> {
	if (refreshPromise) {
		return refreshPromise;
	}

	refreshPromise = (async () => {
		const refreshToken = await sessionProvider.getRefreshToken();
		if (!refreshToken) {
			await invalidateSession();
			return null;
		}

		try {
			const tokens = await apiFetch(
				`${API_ROUTE_BASES.identity.auth}/refresh`,
				TokenResponseSchema,
				{
					method: "POST",
					body: JSON.stringify(RefreshRequestSchema.parse({ refreshToken })),
				},
			);
			await sessionProvider.persistSession(tokens);
			return tokens;
		} catch {
			await invalidateSession();
			return null;
		} finally {
			refreshPromise = null;
		}
	})();

	return refreshPromise;
}

async function requestWithAuthRetry(
	path: string,
	options: AuthenticatedApiRequestOptions = {},
): Promise<Response> {
	const accessToken = await sessionProvider.getAccessToken();
	const firstRequestHeaders = buildApiHeaders({
		...(options.headers ? { headers: options.headers } : {}),
		...(options.locale ? { locale: resolveApiLocale(options.locale) } : {}),
		...(accessToken ? { authToken: accessToken } : {}),
	});
	const firstResponse = await performApiRequest(path, {
		...options,
		headers: firstRequestHeaders,
	});

	if (firstResponse.ok) {
		return firstResponse;
	}

	if (
		options.skipAuthRetry ||
		(firstResponse.status !== 401 && firstResponse.status !== 403)
	) {
		return parseApiErrorResponse(firstResponse);
	}

	const refreshedTokens = await refreshSession();
	if (!refreshedTokens?.token) {
		return parseApiErrorResponse(firstResponse);
	}

	const retryRequestHeaders = buildApiHeaders({
		...(options.headers ? { headers: options.headers } : {}),
		...(options.locale ? { locale: resolveApiLocale(options.locale) } : {}),
		authToken: refreshedTokens.token,
	});
	const retryResponse = await performApiRequest(path, {
		...options,
		headers: retryRequestHeaders,
	});

	if (!retryResponse.ok) {
		return parseApiErrorResponse(retryResponse);
	}

	return retryResponse;
}

export async function authFetch<TSchema extends z.ZodTypeAny>(
	path: string,
	schema: TSchema,
	options: AuthenticatedApiRequestOptions = {},
): Promise<z.infer<TSchema>> {
	const response = await requestWithAuthRetry(path, options);
	return parseApiData(response, schema);
}

export async function authVoid(
	path: string,
	options: AuthenticatedApiRequestOptions = {},
): Promise<void> {
	const response = await requestWithAuthRetry(path, options);
	await parseApiVoid(response);
}

export async function clearApiSession() {
	await sessionProvider.clearSession();
}
