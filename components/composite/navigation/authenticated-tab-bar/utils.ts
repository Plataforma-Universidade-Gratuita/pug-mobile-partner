import type { AppResolvedTheme } from "@/types/client";

export function clampTabIndex(index: number, routeCount: number) {
	return Math.min(Math.max(index, 0), routeCount - 1);
}

export function createAuthenticatedShellTabScreenOptions(
	theme: AppResolvedTheme,
) {
	return {
		headerShown: false,
		tabBarActiveTintColor: theme.colors.brand,
		tabBarInactiveTintColor: theme.colors.chromeMuted,
		tabBarBackground: () => null,
		tabBarShowLabel: false,
		tabBarStyle: {
			backgroundColor: "transparent",
			borderTopWidth: 0,
			elevation: 0,
			height: 0,
			position: "absolute",
		},
		sceneStyle: {
			backgroundColor: theme.colors.surface1,
		},
	} as const;
}
