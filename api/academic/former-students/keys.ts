export const formerStudentKeys = {
	all: ["academic", "former-student"] as const,
	list: () => [...formerStudentKeys.all, "list"] as const,
	detail: (id: string) => [...formerStudentKeys.all, "detail", id] as const,
	idleDetail: () => [...formerStudentKeys.all, "detail", "idle"] as const,
	me: () => [...formerStudentKeys.all, "me"] as const,
};
