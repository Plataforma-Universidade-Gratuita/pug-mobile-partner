
import React from "react";

import { Redirect, Stack, usePathname } from "expo-router";

import { useAuthStore } from "@/stores";

export default function ProtectedLayout() {
	const pathname = usePathname();
	const isAuthenticated = useAuthStore(state => state.isAuthenticated);
	const isBootstrapping = useAuthStore(state => state.isBootstrapping);
	const requiresCredentialSetup = useAuthStore(
		state => state.requiresCredentialSetup,
	);

	if (isBootstrapping) {
		return null;
	}

	if (!isAuthenticated) {
		return <Redirect href="/login" />;
	}

	if (requiresCredentialSetup && pathname !== "/wire-credentials") {
		return <Redirect href="/wire-credentials" />;
	}

	if (!requiresCredentialSetup && pathname === "/wire-credentials") {
		return <Redirect href="/" />;
	}

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(tabs)" />
			<Stack.Screen name="wire-credentials" />
			<Stack.Screen
				name="(modals)"
				options={{ presentation: "modal" }}
			/>
		</Stack>
	);
}
