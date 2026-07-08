import React from "react";

import {
	CircleAlert,
	CircleCheckBig,
	Info,
	TriangleAlert,
} from "lucide-react-native";

import type { AppResolvedTheme, FeedbackTone } from "@/types/client";
import { withAlpha } from "@/utils";

export const FEEDBACK_DISMISS_DISTANCE = 88;
export const FEEDBACK_SWIPE_CAPTURE_DISTANCE = 12;

export function resolveFeedbackIcon(tone: FeedbackTone, color: string) {
	const iconProps = { color, size: 18, strokeWidth: 2.25 } as const;

	switch (tone) {
		case "success":
			return <CircleCheckBig {...iconProps} />;
		case "danger":
			return <CircleAlert {...iconProps} />;
		case "warning":
			return <TriangleAlert {...iconProps} />;
		case "info":
			return <Info {...iconProps} />;
	}
}

export function resolveFeedbackColors(
	tone: FeedbackTone,
	theme: AppResolvedTheme,
) {
	const toneColor =
		tone === "success"
			? theme.colors.success
			: tone === "danger"
				? theme.colors.danger
				: tone === "warning"
					? theme.colors.warning
					: theme.colors.info;
	const textColor =
		tone === "warning" ? theme.colors.warningSoftText : toneColor;
	const backgroundColor = withAlpha(
		toneColor,
		theme.mode === "dark"
			? tone === "warning"
				? 0.2
				: 0.18
			: tone === "warning"
				? 0.16
				: 0.12,
	);

	return {
		backgroundColor,
		borderColor:
			theme.mode === "dark" ? withAlpha(toneColor, 0.26) : "transparent",
		descriptionColor: textColor,
		iconBackgroundColor: withAlpha(
			toneColor,
			theme.mode === "dark" ? 0.18 : 0.14,
		),
		textColor,
	};
}
