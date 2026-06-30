import { jwtDecode } from "jwt-decode";

import {
	AuthRoutes,
	accounts,
	areasOfExpertise,
	attendances,
	cities,
	courses,
	entities,
	enrollments,
	formerStudents,
	projectAreasOfExpertise,
	projects,
	staff,
	users,
} from "@/mock";
import type { PugJwtPayload } from "@/types/client";

import { API_BASE_URL } from "../constants";

type MockMethod = "DELETE" | "GET" | "PATCH" | "POST" | "PUT";

interface MockRouteContext {
	accountId: string | null;
	body: unknown;
	params: Record<string, string>;
	url: URL;
}

interface MockRouteDefinition {
	method: MockMethod;
	pattern: string;
	status?: number;
	void?: boolean;
	handle: (context: MockRouteContext) => Promise<unknown> | unknown;
}

function createSuccessEnvelope(data: unknown) {
	return {
		success: true,
		data,
		error: null,
		timestamp: new Date().toISOString(),
		correlationId: null,
	};
}

function createErrorEnvelope(code: string, message: string) {
	return {
		success: false,
		data: null,
		error: {
			code,
			message,
			details: null,
		},
		timestamp: new Date().toISOString(),
		correlationId: null,
	};
}

function createMockJsonResponse(body: unknown, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"Content-Type": "application/json",
		},
	});
}

function createMockNoContentResponse() {
	return new Response(null, { status: 204 });
}

function splitPath(pathname: string) {
	return pathname.split("/").filter(Boolean);
}

function matchPath(pattern: string, pathname: string) {
	const patternSegments = splitPath(pattern);
	const pathSegments = splitPath(pathname);

	if (patternSegments.length !== pathSegments.length) {
		return null;
	}

	const params: Record<string, string> = {};

	for (let index = 0; index < patternSegments.length; index += 1) {
		const patternSegment = patternSegments[index];
		const pathSegment = pathSegments[index];

		if (!patternSegment || !pathSegment) {
			return null;
		}

		if (patternSegment.startsWith(":")) {
			params[patternSegment.slice(1)] = decodeURIComponent(pathSegment);
			continue;
		}

		if (patternSegment !== pathSegment) {
			return null;
		}
	}

	return params;
}

function parseBody(body: BodyInit | null | undefined) {
	if (typeof body !== "string" || body.trim().length === 0) {
		return undefined;
	}

	try {
		return JSON.parse(body) as unknown;
	} catch {
		return body;
	}
}

function asRecord(body: unknown) {
	return typeof body === "object" && body !== null
		? (body as Record<string, unknown>)
		: {};
}

function parseIdsParam(url: URL) {
	const ids = url.searchParams.get("ids");

	return ids
		? ids
				.split(",")
				.map(id => id.trim())
				.filter(Boolean)
		: undefined;
}

function parsePagination(url: URL) {
	const page = Number(url.searchParams.get("page") ?? "0");
	const size = Number(url.searchParams.get("size") ?? "0");

	return {
		page: Number.isFinite(page) ? page : 0,
		size: Number.isFinite(size) ? size : 0,
	};
}

function resolveAccountId(headers?: HeadersInit) {
	const authorization = new Headers(headers).get("Authorization");

	if (!authorization?.startsWith("Bearer ")) {
		return null;
	}

	try {
		const payload = jwtDecode<PugJwtPayload>(
			authorization.slice("Bearer ".length),
		);
		return payload.accountId ?? null;
	} catch {
		return null;
	}
}

function requireAccountId(accountId: string | null) {
	if (!accountId) {
		throw new Error("Missing bearer token.");
	}

	return accountId;
}

function normalizeError(error: unknown) {
	if (error instanceof Error) {
		const message = error.message || "Unhandled internal mock error.";
		const normalizedMessage = message.toLowerCase();

		if (
			normalizedMessage.includes("invalid credentials") ||
			normalizedMessage.includes("refresh token is invalid") ||
			normalizedMessage.includes("missing bearer token")
		) {
			return {
				status: 401,
				code: "UNAUTHORIZED",
				message,
			};
		}

		if (
			normalizedMessage.includes("requires") ||
			normalizedMessage.includes("forbidden")
		) {
			return {
				status: 403,
				code: "FORBIDDEN",
				message,
			};
		}

		if (normalizedMessage.includes("not found")) {
			return {
				status: 404,
				code: "RESOURCE_NOT_FOUND",
				message,
			};
		}

		if (
			normalizedMessage.includes("already in use") ||
			normalizedMessage.includes("conflict")
		) {
			return {
				status: 409,
				code: "DUPLICATED_RESOURCE",
				message,
			};
		}

		return {
			status: 400,
			code: "BAD_REQUEST",
			message,
		};
	}

	return {
		status: 500,
		code: "MOCK_INTERNAL_ERROR",
		message: "Unhandled internal mock error.",
	};
}

const routes: MockRouteDefinition[] = [
	{
		method: "POST",
		pattern: "/v1/auth/login",
		handle: ({ body }) => AuthRoutes.login(body),
	},
	{
		method: "POST",
		pattern: "/v1/auth/refresh",
		handle: ({ body }) => AuthRoutes.refresh(body),
	},
	{
		method: "POST",
		pattern: "/v1/auth/logout",
		void: true,
		status: 204,
		handle: ({ body }) => AuthRoutes.logout(body),
	},
	{
		method: "POST",
		pattern: "/v1/auth/logout-all",
		void: true,
		status: 204,
		handle: ({ accountId }) =>
			AuthRoutes.logoutAll(requireAccountId(accountId)),
	},
	{
		method: "POST",
		pattern: "/v1/auth/wire-credentials",
		void: true,
		status: 204,
		handle: ({ accountId, body }) =>
			AuthRoutes.wireCredentials(requireAccountId(accountId), body),
	},
	{
		method: "GET",
		pattern: "/v1/identity/accounts/me",
		handle: ({ accountId }) => accounts.getMe(requireAccountId(accountId)),
	},
	{
		method: "GET",
		pattern: "/v1/identity/accounts",
		handle: ({ url }) => accounts.list(parseIdsParam(url)),
	},
	{
		method: "POST",
		pattern: "/v1/identity/accounts/search",
		handle: ({ url, body }) => accounts.search(parsePagination(url), body),
	},
	{
		method: "GET",
		pattern: "/v1/identity/accounts/:id",
		handle: ({ params }) => accounts.get(params.id),
	},
	{
		method: "GET",
		pattern: "/v1/identity/users/me",
		handle: ({ accountId }) => users.getMe(requireAccountId(accountId)),
	},
	{
		method: "GET",
		pattern: "/v1/identity/users",
		handle: ({ url }) => users.list(parseIdsParam(url)),
	},
	{
		method: "POST",
		pattern: "/v1/identity/users/search",
		handle: ({ url, body }) => users.search(parsePagination(url), body),
	},
	{
		method: "GET",
		pattern: "/v1/identity/users/:id",
		handle: ({ params }) => users.get(params.id),
	},
	{
		method: "GET",
		pattern: "/v1/academic/areas-of-expertise",
		handle: ({ url }) => areasOfExpertise.list(parseIdsParam(url)),
	},
	{
		method: "POST",
		pattern: "/v1/academic/areas-of-expertise/search",
		handle: ({ url, body }) =>
			areasOfExpertise.search(parsePagination(url), body),
	},
	{
		method: "POST",
		pattern: "/v1/academic/areas-of-expertise",
		status: 201,
		handle: ({ body }) => areasOfExpertise.create(body),
	},
	{
		method: "GET",
		pattern: "/v1/academic/areas-of-expertise/:id/projects",
		handle: ({ params }) =>
			projectAreasOfExpertise.listProjectsByAreaOfExpertise(params.id),
	},
	{
		method: "DELETE",
		pattern: "/v1/academic/areas-of-expertise/:id/projects",
		void: true,
		status: 204,
		handle: ({ params }) =>
			projectAreasOfExpertise.deleteAllByAreaOfExpertise(params.id),
	},
	{
		method: "GET",
		pattern: "/v1/academic/areas-of-expertise/:id",
		handle: ({ params }) => areasOfExpertise.get(params.id),
	},
	{
		method: "PUT",
		pattern: "/v1/academic/areas-of-expertise/:id",
		handle: ({ params, body }) => areasOfExpertise.update(params.id, body),
	},
	{
		method: "DELETE",
		pattern: "/v1/academic/areas-of-expertise/:id",
		void: true,
		status: 204,
		handle: ({ params }) => areasOfExpertise.remove(params.id),
	},
	{
		method: "GET",
		pattern: "/v1/academic/courses",
		handle: ({ url }) => courses.list(parseIdsParam(url)),
	},
	{
		method: "POST",
		pattern: "/v1/academic/courses/search",
		handle: ({ url, body }) => courses.search(parsePagination(url), body),
	},
	{
		method: "POST",
		pattern: "/v1/academic/courses",
		status: 201,
		handle: ({ body }) => courses.create(body),
	},
	{
		method: "GET",
		pattern: "/v1/academic/courses/:id",
		handle: ({ params }) => courses.get(params.id),
	},
	{
		method: "PUT",
		pattern: "/v1/academic/courses/:id",
		handle: ({ params, body }) => courses.update(params.id, body),
	},
	{
		method: "DELETE",
		pattern: "/v1/academic/courses/:id",
		void: true,
		status: 204,
		handle: ({ params }) => courses.remove(params.id),
	},
	{
		method: "GET",
		pattern: "/v1/academic/former-students/me",
		handle: ({ accountId }) =>
			formerStudents.getMe(requireAccountId(accountId)),
	},
	{
		method: "GET",
		pattern: "/v1/academic/former-students",
		handle: ({ url }) => formerStudents.list(parseIdsParam(url)),
	},
	{
		method: "POST",
		pattern: "/v1/academic/former-students/search",
		handle: ({ url, body }) =>
			formerStudents.search(parsePagination(url), body),
	},
	{
		method: "POST",
		pattern: "/v1/academic/former-students/bulk",
		status: 201,
		handle: ({ body }) => formerStudents.createBulk(body),
	},
	{
		method: "POST",
		pattern: "/v1/academic/former-students",
		status: 201,
		handle: ({ body }) => formerStudents.create(body),
	},
	{
		method: "GET",
		pattern: "/v1/academic/former-students/:id",
		handle: ({ params }) => formerStudents.get(params.id),
	},
	{
		method: "PUT",
		pattern: "/v1/academic/former-students/:id",
		handle: ({ params, body }) => formerStudents.update(params.id, body),
	},
	{
		method: "PATCH",
		pattern: "/v1/academic/former-students/:id/status",
		void: true,
		status: 204,
		handle: ({ params, body }) =>
			formerStudents.setActive(params.id, asRecord(body).active),
	},
	{
		method: "DELETE",
		pattern: "/v1/academic/former-students/:id",
		void: true,
		status: 204,
		handle: ({ params }) => formerStudents.remove(params.id),
	},
	{
		method: "GET",
		pattern: "/v1/geo/cities",
		handle: () => cities.list(),
	},
	{
		method: "POST",
		pattern: "/v1/geo/cities/search",
		handle: ({ url, body }) => cities.search(parsePagination(url), body),
	},
	{
		method: "GET",
		pattern: "/v1/geo/cities/:id",
		handle: ({ params }) => cities.get(params.id),
	},
	{
		method: "GET",
		pattern: "/v1/partners/entities",
		handle: ({ url }) => entities.list(parseIdsParam(url)),
	},
	{
		method: "POST",
		pattern: "/v1/partners/entities/search",
		handle: ({ url, body }) => entities.search(parsePagination(url), body),
	},
	{
		method: "POST",
		pattern: "/v1/partners/entities",
		status: 201,
		handle: ({ body }) => entities.create(body),
	},
	{
		method: "GET",
		pattern: "/v1/partners/entities/:id",
		handle: ({ params }) => entities.get(params.id),
	},
	{
		method: "PUT",
		pattern: "/v1/partners/entities/:id",
		handle: ({ params, body }) => entities.update(params.id, body),
	},
	{
		method: "DELETE",
		pattern: "/v1/partners/entities/:id",
		void: true,
		status: 204,
		handle: ({ params }) => entities.remove(params.id),
	},
	{
		method: "GET",
		pattern: "/v1/partners/staff/me",
		handle: ({ accountId }) => staff.getMe(requireAccountId(accountId)),
	},
	{
		method: "GET",
		pattern: "/v1/partners/staff",
		handle: ({ url }) => staff.list(parseIdsParam(url)),
	},
	{
		method: "POST",
		pattern: "/v1/partners/staff/search",
		handle: ({ url, body }) => staff.search(parsePagination(url), body),
	},
	{
		method: "POST",
		pattern: "/v1/partners/staff",
		status: 201,
		handle: ({ body }) => staff.create(body),
	},
	{
		method: "GET",
		pattern: "/v1/partners/staff/:id",
		handle: ({ params }) => staff.get(params.id),
	},
	{
		method: "PUT",
		pattern: "/v1/partners/staff/:id",
		handle: ({ params, body }) => staff.update(params.id, body),
	},
	{
		method: "PATCH",
		pattern: "/v1/partners/staff/:id/status",
		void: true,
		status: 204,
		handle: ({ params, body }) =>
			staff.setActive(params.id, asRecord(body).active),
	},
	{
		method: "DELETE",
		pattern: "/v1/partners/staff/:id",
		void: true,
		status: 204,
		handle: ({ params }) => staff.remove(params.id),
	},
	{
		method: "GET",
		pattern: "/v1/projects/attendances",
		handle: ({ url }) => attendances.list(parseIdsParam(url)),
	},
	{
		method: "POST",
		pattern: "/v1/projects/attendances/search",
		handle: ({ url, body }) => attendances.search(parsePagination(url), body),
	},
	{
		method: "POST",
		pattern: "/v1/projects/attendances",
		status: 201,
		handle: ({ body }) => attendances.create(body),
	},
	{
		method: "GET",
		pattern: "/v1/projects/attendances/:id",
		handle: ({ params }) => attendances.get(params.id),
	},
	{
		method: "PATCH",
		pattern: "/v1/projects/attendances/:id/validate",
		handle: ({ accountId, params, body }) =>
			attendances.validate(params.id, body, requireAccountId(accountId)),
	},
	{
		method: "DELETE",
		pattern: "/v1/projects/attendances/:id",
		void: true,
		status: 204,
		handle: ({ params }) => attendances.remove(params.id),
	},
	{
		method: "GET",
		pattern: "/v1/projects/enrollments/me",
		handle: ({ accountId }) =>
			enrollments.listMine(requireAccountId(accountId)),
	},
	{
		method: "GET",
		pattern: "/v1/projects/enrollments",
		handle: ({ url }) =>
			enrollments.list(
				url.searchParams.get("projectId") ?? undefined,
				url.searchParams.get("formerStudentId") ?? undefined,
			),
	},
	{
		method: "POST",
		pattern: "/v1/projects/enrollments/search",
		handle: ({ url, body }) => enrollments.search(parsePagination(url), body),
	},
	{
		method: "POST",
		pattern: "/v1/projects/:projectId/enrollments",
		status: 201,
		handle: ({ accountId, params, url }) =>
			enrollments.create(
				params.projectId,
				url.searchParams.get("formerStudentId") ?? requireAccountId(accountId),
			),
	},
	{
		method: "GET",
		pattern: "/v1/projects/:projectId/enrollments/me",
		handle: ({ accountId, params }) =>
			enrollments.getMine(params.projectId, requireAccountId(accountId)),
	},
	{
		method: "PATCH",
		pattern: "/v1/projects/:projectId/enrollments/me",
		handle: ({ accountId, params, body }) =>
			enrollments.updateMyStatus(
				params.projectId,
				requireAccountId(accountId),
				asRecord(body).status,
			),
	},
	{
		method: "GET",
		pattern: "/v1/projects/:projectId/enrollments/:formerStudentId",
		handle: ({ params }) =>
			enrollments.get(params.projectId, params.formerStudentId),
	},
	{
		method: "PATCH",
		pattern: "/v1/projects/:projectId/enrollments/:formerStudentId",
		handle: ({ params, body }) =>
			enrollments.updateStatus(
				params.projectId,
				params.formerStudentId,
				asRecord(body).status,
			),
	},
	{
		method: "DELETE",
		pattern: "/v1/projects/:projectId/enrollments/:formerStudentId",
		void: true,
		status: 204,
		handle: ({ params }) =>
			enrollments.deleteEnrollment(params.projectId, params.formerStudentId),
	},
	{
		method: "GET",
		pattern: "/v1/projects/:projectId/areas-of-expertise",
		handle: ({ params }) =>
			projectAreasOfExpertise.listAreasOfExpertiseByProject(params.projectId),
	},
	{
		method: "POST",
		pattern: "/v1/projects/:projectId/areas-of-expertise",
		void: true,
		status: 204,
		handle: ({ params, body }) =>
			projectAreasOfExpertise.createAssociations(params.projectId, body),
	},
	{
		method: "DELETE",
		pattern: "/v1/projects/:projectId/areas-of-expertise/:areaOfExpertiseId",
		void: true,
		status: 204,
		handle: ({ params }) =>
			projectAreasOfExpertise.deleteAssociation(
				params.projectId,
				params.areaOfExpertiseId,
			),
	},
	{
		method: "DELETE",
		pattern: "/v1/projects/:projectId/areas-of-expertise",
		void: true,
		status: 204,
		handle: ({ params }) =>
			projectAreasOfExpertise.deleteAllByProject(params.projectId),
	},
	{
		method: "GET",
		pattern: "/v1/projects/entities/:entityId",
		handle: ({ params }) => projects.listByEntity(params.entityId),
	},
	{
		method: "GET",
		pattern: "/v1/projects/creators/:accountId",
		handle: ({ params }) => projects.listByCreatedBy(params.accountId),
	},
	{
		method: "GET",
		pattern: "/v1/projects",
		handle: ({ url }) => projects.list(parseIdsParam(url)),
	},
	{
		method: "POST",
		pattern: "/v1/projects/search",
		handle: ({ url, body }) => projects.search(parsePagination(url), body),
	},
	{
		method: "POST",
		pattern: "/v1/projects",
		status: 201,
		handle: ({ accountId, body }) =>
			projects.create(body, requireAccountId(accountId)),
	},
	{
		method: "GET",
		pattern: "/v1/projects/:id",
		handle: ({ params }) => projects.get(params.id),
	},
	{
		method: "PUT",
		pattern: "/v1/projects/:id",
		handle: ({ params, body }) => projects.update(params.id, body),
	},
	{
		method: "PATCH",
		pattern: "/v1/projects/:id/status",
		handle: ({ params, body }) => projects.updateStatus(params.id, body),
	},
	{
		method: "DELETE",
		pattern: "/v1/projects/:id",
		void: true,
		status: 204,
		handle: ({ params }) => projects.remove(params.id),
	},
];

function findRoute(method: MockMethod, pathname: string) {
	for (const route of routes) {
		if (route.method !== method) {
			continue;
		}

		const params = matchPath(route.pattern, pathname);
		if (params) {
			return { params, route };
		}
	}

	return null;
}

export async function executeInternalMockRequest(
	path: string,
	options: RequestInit = {},
) {
	const url = new URL(
		/^https?:\/\//.test(path) ? path : `${API_BASE_URL}${path}`,
	);
	const method = (options.method?.toUpperCase() ?? "GET") as MockMethod;
	const match = findRoute(method, url.pathname);

	if (!match) {
		return createMockJsonResponse(
			createErrorEnvelope(
				"MOCK_ROUTE_NOT_FOUND",
				`No internal mock handler registered for ${method} ${url.pathname}.`,
			),
			404,
		);
	}

	try {
		const result = await match.route.handle({
			accountId: resolveAccountId(options.headers),
			body: parseBody(options.body),
			params: match.params,
			url,
		});

		if (match.route.void) {
			return createMockNoContentResponse();
		}

		return createMockJsonResponse(
			createSuccessEnvelope(result),
			match.route.status ?? 200,
		);
	} catch (error) {
		const normalizedError = normalizeError(error);

		return createMockJsonResponse(
			createErrorEnvelope(normalizedError.code, normalizedError.message),
			normalizedError.status,
		);
	}
}
