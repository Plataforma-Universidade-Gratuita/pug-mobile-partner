import { z } from "zod";

const EMAIL_VALUE_SCHEMA = z.string().email();

export function normalizeDigits(value: string) {
	return value.replace(/\D+/g, "");
}

export function createRequiredTrimmedStringSchema(
	requiredMessage: string,
	maxLength: number,
	tooLongMessage: string,
) {
	return z.string().superRefine((value, ctx) => {
		const trimmed = value.trim();

		if (trimmed.length === 0) {
			ctx.addIssue({
				code: "custom",
				message: requiredMessage,
			});
			return;
		}

		if (trimmed.length > maxLength) {
			ctx.addIssue({
				code: "custom",
				message: tooLongMessage,
			});
		}
	});
}

export function createOptionalTrimmedStringSchema(
	maxLength: number,
	tooLongMessage: string,
) {
	return z.string().superRefine((value, ctx) => {
		const trimmed = value.trim();

		if (trimmed.length === 0) {
			return;
		}

		if (trimmed.length > maxLength) {
			ctx.addIssue({
				code: "custom",
				message: tooLongMessage,
			});
		}
	});
}

export function createEmailFieldSchema(
	required: boolean,
	requiredMessage: string,
	invalidMessage: string,
	tooLongMessage: string,
) {
	return z.string().superRefine((value, ctx) => {
		const normalized = value.trim().toLowerCase();

		if (normalized.length === 0) {
			if (required) {
				ctx.addIssue({
					code: "custom",
					message: requiredMessage,
				});
			}
			return;
		}

		if (normalized.length > 254) {
			ctx.addIssue({
				code: "custom",
				message: tooLongMessage,
			});
			return;
		}

		if (!EMAIL_VALUE_SCHEMA.safeParse(normalized).success) {
			ctx.addIssue({
				code: "custom",
				message: invalidMessage,
			});
		}
	});
}

export function createPasswordFieldSchema(
	required: boolean,
	requiredMessage: string,
	invalidMessage: string,
) {
	return z.preprocess(
		value => {
			if (typeof value !== "string") return value;

			const trimmed = value.trim();

			return trimmed.length === 0 ? null : trimmed;
		},
		z
			.string()
			.nullable()
			.superRefine((value, ctx) => {
				if (value === null) {
					if (required) {
						ctx.addIssue({
							code: "custom",
							message: requiredMessage,
						});
					}

					return;
				}

				if (value.length < 8 || value.length > 255) {
					ctx.addIssue({
						code: "custom",
						message: invalidMessage,
					});
				}
			}),
	);
}

export function createCpfFieldSchema(
	required: boolean,
	requiredMessage: string,
	invalidMessage: string,
) {
	return z.string().superRefine((value, ctx) => {
		const digits = normalizeDigits(value);

		if (digits.length === 0) {
			if (required) {
				ctx.addIssue({
					code: "custom",
					message: requiredMessage,
				});
			}
			return;
		}

		if (!isValidCpf(digits)) {
			ctx.addIssue({
				code: "custom",
				message: invalidMessage,
			});
		}
	});
}

export function createCnpjFieldSchema(
	required: boolean,
	requiredMessage: string,
	invalidMessage: string,
) {
	return z.string().superRefine((value, ctx) => {
		const digits = normalizeDigits(value);

		if (digits.length === 0) {
			if (required) {
				ctx.addIssue({
					code: "custom",
					message: requiredMessage,
				});
			}
			return;
		}

		if (!isValidCnpj(digits)) {
			ctx.addIssue({
				code: "custom",
				message: invalidMessage,
			});
		}
	});
}

export function createRequiredNumericStringSchema(
	requiredMessage: string,
	invalidMessage: string,
	allowZero: boolean,
) {
	return z.string().superRefine((value, ctx) => {
		const trimmed = value.trim();

		if (trimmed.length === 0) {
			ctx.addIssue({
				code: "custom",
				message: requiredMessage,
			});
			return;
		}

		const parsed = Number(trimmed);
		const isValid =
			Number.isFinite(parsed) && (allowZero ? parsed >= 0 : parsed > 0);

		if (!isValid) {
			ctx.addIssue({
				code: "custom",
				message: invalidMessage,
			});
		}
	});
}

export function createOptionalNumericStringSchema(
	invalidMessage: string,
	allowZero: boolean,
) {
	return z.string().superRefine((value, ctx) => {
		const trimmed = value.trim();

		if (trimmed.length === 0) {
			return;
		}

		const parsed = Number(trimmed);
		const isValid =
			Number.isFinite(parsed) && (allowZero ? parsed >= 0 : parsed > 0);

		if (!isValid) {
			ctx.addIssue({
				code: "custom",
				message: invalidMessage,
			});
		}
	});
}

export function createRequiredDateStringSchema(requiredMessage: string) {
	return z.string().superRefine((value, ctx) => {
		if (value.trim().length === 0) {
			ctx.addIssue({
				code: "custom",
				message: requiredMessage,
			});
		}
	});
}

export function isDateRangeInvalid(startDate: string, dueDate: string) {
	const startTimestamp = Date.parse(startDate);
	const dueTimestamp = Date.parse(dueDate);

	if (Number.isNaN(startTimestamp) || Number.isNaN(dueTimestamp)) {
		return false;
	}

	return dueTimestamp < startTimestamp;
}

export function isValidCpf(digits: string) {
	if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) {
		return false;
	}

	let sum = 0;
	for (let index = 0; index < 9; index += 1) {
		sum += Number(digits[index]) * (10 - index);
	}

	let checkDigit = (sum * 10) % 11;
	if (checkDigit === 10) {
		checkDigit = 0;
	}

	if (checkDigit !== Number(digits[9])) {
		return false;
	}

	sum = 0;
	for (let index = 0; index < 10; index += 1) {
		sum += Number(digits[index]) * (11 - index);
	}

	checkDigit = (sum * 10) % 11;
	if (checkDigit === 10) {
		checkDigit = 0;
	}

	return checkDigit === Number(digits[10]);
}

function isValidCnpj(digits: string) {
	if (digits.length !== 14 || /^(\d)\1{13}$/.test(digits)) {
		return false;
	}

	const firstCheckDigit = calculateCnpjCheckDigit(
		digits.slice(0, 12),
		[5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
	);

	if (firstCheckDigit !== Number(digits[12])) {
		return false;
	}

	const secondCheckDigit = calculateCnpjCheckDigit(
		digits.slice(0, 13),
		[6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
	);

	return secondCheckDigit === Number(digits[13]);
}

function calculateCnpjCheckDigit(digits: string, multipliers: number[]) {
	let sum = 0;

	for (let index = 0; index < multipliers.length; index += 1) {
		sum += Number(digits[index]) * multipliers[index]!;
	}

	const remainder = sum % 11;
	return remainder < 2 ? 0 : 11 - remainder;
}
