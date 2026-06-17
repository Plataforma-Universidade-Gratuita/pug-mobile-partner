import React from "react";

export function getAccessibleText(node: React.ReactNode): string | undefined {
	if (typeof node === "string" || typeof node === "number") {
		return String(node);
	}

	if (Array.isArray(node)) {
		return node.map(getAccessibleText).filter(Boolean).join(" ").trim();
	}

	if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
		return getAccessibleText(node.props.children);
	}

	return undefined;
}

export function buildAccentPalette(
	accent: string,
	contrast: string,
	accentPressed = accent,
) {
	return {
		accent,
		accentPressed,
		contrast,
		tint: withAlpha(accent, 0.12),
		soft: withAlpha(accent, 0.16),
		outline: withAlpha(accent, 0.22),
	};
}

export function withAlpha(color: string, alpha: number) {
	if (!color.startsWith("#")) {
		return color;
	}

	const normalized = color.length === 4 ? expandHex(color) : color;
	const red = Number.parseInt(normalized.slice(1, 3), 16);
	const green = Number.parseInt(normalized.slice(3, 5), 16);
	const blue = Number.parseInt(normalized.slice(5, 7), 16);

	return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function expandHex(color: string) {
	return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
}
