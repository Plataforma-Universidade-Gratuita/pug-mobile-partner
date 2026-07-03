/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */
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
