export function resolveAcademicFieldValue(
	value: string | null | undefined,
	isPending: boolean,
	loadingLabel: string,
	unavailableLabel: string,
) {
	if (value && value.trim().length > 0) {
		return value.trim();
	}

	return isPending ? loadingLabel : unavailableLabel;
}

export function resolveAcademicNumberValue(
	value: number | null | undefined,
	isPending: boolean,
	loadingLabel: string,
	unavailableLabel: string,
) {
	if (typeof value === "number" && Number.isFinite(value)) {
		return String(value);
	}

	return isPending ? loadingLabel : unavailableLabel;
}
