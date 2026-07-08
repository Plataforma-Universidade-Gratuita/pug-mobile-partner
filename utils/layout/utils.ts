
import type { AppResolvedTheme } from "@/types/client";

export function getTabScreenContentBottomPadding(
	theme: AppResolvedTheme,
	bottomInset: number,
) {
	return (
		theme.space[8] + theme.space[4] + Math.max(bottomInset, theme.space[4])
	);
}
