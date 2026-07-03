/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import React from "react";

import { Stack } from "expo-router";

export default function PublicLayout() {
	return <Stack screenOptions={{ headerShown: false }} />;
}
