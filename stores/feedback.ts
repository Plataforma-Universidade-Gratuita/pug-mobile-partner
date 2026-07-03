import { create } from "zustand";

import type {
	FeedbackOptions,
	FeedbackStoreState,
	FeedbackTone,
} from "@/types/client";

let nextFeedbackId = 0;

function createFeedbackMessage(
	tone: FeedbackTone,
	title: string,
	options: FeedbackOptions = {},
) {
	nextFeedbackId += 1;

	return {
		id: `${Date.now()}-${nextFeedbackId}`,
		tone,
		title,
		...options,
	};
}

export const useFeedbackStore = create<FeedbackStoreState>(set => ({
	current: null,
	showFeedback: message => {
		set({
			current: createFeedbackMessage(message.tone, message.title, message),
		});
	},
	showSuccess: (title, options) => {
		set({ current: createFeedbackMessage("success", title, options) });
	},
	showDanger: (title, options) => {
		set({ current: createFeedbackMessage("danger", title, options) });
	},
	showWarning: (title, options) => {
		set({ current: createFeedbackMessage("warning", title, options) });
	},
	showInfo: (title, options) => {
		set({ current: createFeedbackMessage("info", title, options) });
	},
	dismissFeedback: () => {
		set({ current: null });
	},
}));
