
import React from "react";

import { Redirect } from "expo-router";

import { LoginScreen } from "@/features/auth/login";
import { useAuthStore } from "@/stores";

export default function LoginRoute() {
	const isAuthenticated = useAuthStore(state => state.isAuthenticated);
	const isBootstrapping = useAuthStore(state => state.isBootstrapping);
	const requiresCredentialSetup = useAuthStore(
		state => state.requiresCredentialSetup,
	);

	if (isBootstrapping) {
		return null;
	}

	if (isAuthenticated) {
		if (requiresCredentialSetup) {
			return <Redirect href="/wire-credentials" />;
		}

		return <Redirect href="/" />;
	}

	return <LoginScreen />;
}
