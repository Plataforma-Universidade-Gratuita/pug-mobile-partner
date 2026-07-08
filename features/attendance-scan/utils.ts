
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
