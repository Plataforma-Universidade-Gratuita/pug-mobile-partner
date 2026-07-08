
import React from "react";

import { View } from "react-native";

import { LoadingBlock } from "@/components/primitives";

export function ProjectsLoadingSkeleton() {
	return (
		<View style={{ gap: 16 }}>
			<LoadingBlock
				height={152}
				width="100%"
			/>
			<LoadingBlock
				height={48}
				width="100%"
			/>
			{Array.from({ length: 3 }).map((_, index) => (
				<LoadingBlock
					key={`projects-skeleton-${index}`}
					height={184}
					width="100%"
				/>
			))}
		</View>
	);
}
