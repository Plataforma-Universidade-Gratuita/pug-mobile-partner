import { z } from "zod";

import {
	createRequiredNumericStringSchema,
	createRequiredTrimmedStringSchema,
} from "../shared";

export function createNewAttendanceFormSchema(t: (key: string) => string) {
	return z.object({
		projectId: createRequiredTrimmedStringSchema(
			t("attendanceCreate.errors.projectRequired"),
			255,
			t("attendanceCreate.errors.projectRequired"),
		),
		duration: createRequiredNumericStringSchema(
			t("attendanceCreate.errors.durationRequired"),
			t("attendanceCreate.errors.durationInvalid"),
			false,
		),
	});
}
