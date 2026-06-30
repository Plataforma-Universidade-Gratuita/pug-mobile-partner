import React from "react";

import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

import type { AppBackButtonProps } from "@/types/client";

import { HeaderActionButton } from "../header-action-button";

export function AppBackButton({
	accessibilityLabel = "Go back",
	onPress,
	style,
}: AppBackButtonProps) {
	const router = useRouter();
	const resolvedOnPress =
		onPress ??
		(() => {
			if (typeof window !== "undefined" && window.history.length <= 1) {
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
