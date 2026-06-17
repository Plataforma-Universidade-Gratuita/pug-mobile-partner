import type { ReactNode } from "react";

import type { SelectOption } from "@/types/client";

export function getFilteredOptions(
	options: SelectOption[],
	searchable: boolean,
	searchTerm: string,
) {
	if (!searchable || !searchTerm.trim()) {
		return options;
	}

	const normalizedTerm = searchTerm.trim().toLowerCase();

	return options.filter(option => {
		const label = getNodeText(option.label);
		const description = getNodeText(option.description);

		return [label, description].some(value =>
			value.toLowerCase().includes(normalizedTerm),
		);
	});
}

function getNodeText(node?: ReactNode): string {
	if (typeof node === "string" || typeof node === "number") {
		return String(node);
	}

	if (Array.isArray(node)) {
		return node
			.map(child => getNodeText(child))
			.join(" ")
			.trim();
	}

	return "";
}
