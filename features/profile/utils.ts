export function resolveProfileFieldValue(
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
