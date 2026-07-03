import { useEffect, useRef } from "react";

import { useFeedbackStore } from "@/stores";
import type { QueryErrorFeedbackDescriptor } from "@/types/client";

export function useQueryErrorFeedback(
	descriptors: QueryErrorFeedbackDescriptor[],
) {
	const shownAtRef = useRef(new Map<string, number>());
	const showDanger = useFeedbackStore(state => state.showDanger);

	useEffect(() => {
		for (const descriptor of descriptors) {
			if (!descriptor.isError || descriptor.errorUpdatedAt === 0) {
				continue;
			}

			const shownAt = shownAtRef.current.get(descriptor.key);
			if (shownAt === descriptor.errorUpdatedAt) {
				continue;
			}

			shownAtRef.current.set(descriptor.key, descriptor.errorUpdatedAt);
			const { title, description } = descriptor.getContent(descriptor.error);
			showDanger(title, { description });
		}
	}, [descriptors, showDanger]);
}
