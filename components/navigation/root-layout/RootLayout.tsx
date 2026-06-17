import React from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";

import { APP_I18N, APP_QUERY_CLIENT } from "@/constants/providers";

import { RootNavigator } from "./RootNavigator";

export function RootLayout() {
	return (
		<I18nextProvider i18n={APP_I18N}>
			<QueryClientProvider client={APP_QUERY_CLIENT}>
				<RootNavigator />
			</QueryClientProvider>
		</I18nextProvider>
	);
}
