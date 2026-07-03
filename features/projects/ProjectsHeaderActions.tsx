import React, { useMemo } from "react";

import { SlidersHorizontal } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

import { HeaderActionButton } from "@/components";
import type { ProjectsHeaderActionsProps } from "@/types/client";

export function ProjectsHeaderActions({
	disabled = false,
	onOpenFilters,
}: ProjectsHeaderActionsProps) {
	const styles = useMemo(
		() =>
			StyleSheet.create({
				row: {
					flexDirection: "row",
					alignItems: "center",
				},
			}),
		[],
	);

	return (
		<View style={styles.row}>
			<HeaderActionButton
				accessibilityLabel="Open project filters"
				disabled={disabled}
				icon={SlidersHorizontal}
				onPress={onOpenFilters}
			/>
		</View>
	);
}
