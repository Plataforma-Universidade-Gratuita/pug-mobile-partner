import React from "react";

import { Tabs } from "expo-router";
import { Folder, House, ListChecks, UserRound } from "lucide-react-native";

import {
	AuthenticatedTabBar,
	createAuthenticatedShellTabScreenOptions,
} from "@/components";
import { useThemeStore } from "@/stores";

export default function ProtectedTabsLayout() {
	const theme = useThemeStore(state => state.theme);

	return (
		<Tabs
			screenOptions={createAuthenticatedShellTabScreenOptions(theme)}
			tabBar={props => <AuthenticatedTabBar {...props} />}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
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
					title: "Projects",
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
					title: "Attendances",
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
					title: "Profile",
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
