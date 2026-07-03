/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
import { buildAttendanceComplexSearchRequest } from "@/api/utils";

export function buildAttendanceScanLookupRequest() {
	return buildAttendanceComplexSearchRequest({
		projectIds: [],
		formerStudentIds: [],
		statuses: ["WAITING"],
		validatedByIds: [],
		durationFrom: "",
		durationTo: "",
		dateFrom: "",
		dateTo: "",
	});
}
