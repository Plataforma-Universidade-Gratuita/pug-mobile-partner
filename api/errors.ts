import { z } from "zod";

import { ApiEnvelopeErrorSchema, ApiErrorSchema } from "@/schemas/api";
import type { ApiErrorBody, FieldError } from "@/types/api";

const RawApiErrorSchema = z.object({
	code: ApiErrorSchema.shape.code,
	message: ApiErrorSchema.shape.message,
	details: ApiErrorSchema.shape.details,
	correlationId: z.string().nullable().optional(),
});

export class ApiError extends Error {
	public readonly status: number;
	public readonly code: string | undefined;
	public readonly details: FieldError[] | null;
	public readonly correlationId: string | null;

	constructor(
		status: number,
		body: Pick<ApiErrorBody, "code" | "message" | "details">,
		correlationId: string | null = null,
	) {
		super(body.message);
		this.name = "ApiError";
		this.status = status;
		this.code = body.code;
		this.details = body.details ?? null;
		this.correlationId = correlationId;
	}

	get fieldErrors(): Record<string, string[]> {
		if (!this.details) return {};
		return Object.fromEntries(
			this.details.map(field => [
				field.field,
				field.errors.map(error => error.message),
			]),
		);
	}
}

function buildHttpFallbackError(status: number) {
	return new ApiError(status, {
		code: `HTTP_${status}`,
		message: `HTTP ${status}`,
		details: null,
	});
}

export async function parseApiErrorResponse(
	response: Response,
): Promise<never> {
	const text = await response.text();
	if (!text.trim()) {
		throw buildHttpFallbackError(response.status);
	}

	try {
		const json = JSON.parse(text) as unknown;
		const envelopeResult = ApiEnvelopeErrorSchema.safeParse(json);
		if (envelopeResult.success) {
			throw new ApiError(
				response.status,
				envelopeResult.data.error,
				envelopeResult.data.correlationId,
			);
		}

		const rawErrorResult = RawApiErrorSchema.safeParse(json);
		if (rawErrorResult.success) {
			throw new ApiError(
				response.status,
				{
					code: rawErrorResult.data.code,
					message: rawErrorResult.data.message,
					details: rawErrorResult.data.details ?? null,
				},
				rawErrorResult.data.correlationId ?? null,
			);
		}
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
	}

	throw buildHttpFallbackError(response.status);
}
