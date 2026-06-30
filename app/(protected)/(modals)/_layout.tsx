import React from "react";

import { Stack } from "expo-router";

export default function ProtectedModalsLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				presentation: "modal",
			}}
		/>
	);
}
