import React from "react";

import { Tabs } from "expo-router";
import { Folder, House, ListChecks, UserRound } from "lucide-react-native";
import { useTranslation } from "react-i18next";

import {
	AuthenticatedTabBar,
	createAuthenticatedShellTabScreenOptions,
} from "@/components";
import { useThemeStore } from "@/stores";

export default function ProtectedTabsLayout() {
	const { t } = useTranslation();
	const theme = useThemeStore(state => state.theme);

	return (
		<Tabs
			screenOptions={createAuthenticatedShellTabScreenOptions(theme)}
			tabBar={props => <AuthenticatedTabBar {...props} />}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: t("navigation.tabs.home"),
					tabBarIcon: ({ color, size }) => (
						<House
							color={color}
							size={size ?? 20}
							strokeWidth={1.95}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="projects"
				options={{
					title: t("navigation.tabs.projects"),
					tabBarIcon: ({ color, size }) => (
						<Folder
							color={color}
							size={size ?? 20}
							strokeWidth={1.95}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="attendances"
				options={{
					title: t("navigation.tabs.attendances"),
					tabBarIcon: ({ color, size }) => (
						<ListChecks
							color={color}
							size={size ?? 20}
							strokeWidth={1.95}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: t("navigation.tabs.profile"),
					tabBarIcon: ({ color, size }) => (
						<UserRound
							color={color}
							size={size ?? 20}
							strokeWidth={1.95}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
