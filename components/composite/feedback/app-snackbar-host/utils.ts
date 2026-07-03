import type { FeedbackTone } from "@/types/client";

export function resolveFeedbackIcon(tone: FeedbackTone) {
	switch (tone) {
		case "success":
			return "✓";
		case "danger":
			return "!";
		case "warning":
			return "!";
		case "info":
			return "i";
	}
}

export function resolveFeedbackAccentColor(
	tone: FeedbackTone,
	colors: {
		success: string;
		danger: string;
		warning: string;
		info: string;
	},
) {
	switch (tone) {
		case "success":
			return colors.success;
		case "danger":
			return colors.danger;
		case "warning":
			return colors.warning;
		case "info":
			return colors.info;
	}
}
