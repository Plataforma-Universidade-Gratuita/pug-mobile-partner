/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import React from "react";

import { useLocalSearchParams } from "expo-router";

import { EnrollmentDetailScreen } from "@/features/enrollment-detail";

export default function ProtectedEnrollmentDetailRoute() {
	const params = useLocalSearchParams<{ id?: string | string[] }>();
	const projectId =
		typeof params.id === "string" && params.id.trim() ? params.id : null;

	return <EnrollmentDetailScreen projectId={projectId} />;
}
