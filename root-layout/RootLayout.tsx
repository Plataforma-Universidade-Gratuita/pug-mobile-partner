import React from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";

import { AppProviders } from "@/contexts";

import { RootNavigator } from "./RootNavigator";
import { APP_I18N, APP_QUERY_CLIENT } from "./providers";

export function RootLayout() {
	return (
		<I18nextProvider i18n={APP_I18N}>
			<QueryClientProvider client={APP_QUERY_CLIENT}>
				<AppProviders>
					<RootNavigator />
				</AppProviders>
			</QueryClientProvider>
		</I18nextProvider>
	);
}
