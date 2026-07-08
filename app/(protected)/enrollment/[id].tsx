
import React from "react";

import { useLocalSearchParams } from "expo-router";

import { EnrollmentDetailScreen } from "@/features/enrollment-detail";

export default function ProtectedEnrollmentDetailRoute() {
	const params = useLocalSearchParams<{ id?: string | string[] }>();
	const projectId =
		typeof params.id === "string" && params.id.trim() ? params.id : null;

	return <EnrollmentDetailScreen projectId={projectId} />;
}
