/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import React from "react";

import { useNavigation, useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

import type { AppBackButtonProps } from "@/types/client";

import { HeaderActionButton } from "../header-action-button";

export function AppBackButton({
	accessibilityLabel = "Go back",
	onPress,
	style,
}: AppBackButtonProps) {
	const navigation = useNavigation();
	const router = useRouter();
	const resolvedOnPress =
		onPress ??
		(() => {
			const canGoBack = navigation.canGoBack();
			const hasBrowserHistory =
				typeof window !== "undefined" &&
				typeof window.history !== "undefined" &&
				typeof window.history.length === "number";

			if (!canGoBack || (hasBrowserHistory && window.history.length <= 1)) {
				router.replace("/");
				return;
			}

			router.back();
		});

	return (
		<HeaderActionButton
			accessibilityLabel={accessibilityLabel}
			icon={ChevronLeft}
			onPress={resolvedOnPress}
			style={style}
		/>
	);
}
