/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import React, { useMemo } from "react";

import { PaperProvider } from "react-native-paper";

import { useThemeStore } from "@/stores";

import { createPaperTheme } from "./paper-theme";

export function AppProviders({ children }: { children: React.ReactNode }) {
	const appTheme = useThemeStore(state => state.theme);
	const paperTheme = useMemo(() => createPaperTheme(appTheme), [appTheme]);

	return <PaperProvider theme={paperTheme}>{children}</PaperProvider>;
}
