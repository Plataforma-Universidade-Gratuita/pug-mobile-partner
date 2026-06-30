import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

import { Label } from "@/components/primitives";
import { useThemeStore } from "@/stores";
import { createPrimitiveSurfaceStyleSpec } from "@/styles";
import type { NewAttendanceProjectOptionCardProps } from "@/types/client";

import { createStyles } from "./styles";
import { createProjectOptionStyle } from "./utils";

export function NewAttendanceProjectOptionCard({
	disabled,
	entityName,
	isLocked,
	isSelected,
	onPress,
	projectName,
}: NewAttendanceProjectOptionCardProps) {
	const { t } = useTranslation();
	const theme = useThemeStore(state => state.theme);
	const spec = useMemo(() => createPrimitiveSurfaceStyleSpec(theme), [theme]);
	const styles = useMemo(() => createStyles(theme, spec), [spec, theme]);

	return (
		<Pressable
			disabled={disabled}
			onPress={onPress}
			style={({ pressed }) => [
				styles.projectOptionCard,
				createProjectOptionStyle(theme, spec, {
					disabled,
					isLocked,
					isSelected,
					pressed,
				}),
			]}
		>
			<View style={styles.projectOptionHeader}>
				<Label
					role="field"
					style={styles.projectOptionTitle}
				>
					{projectName}
				</Label>
				<Label
					role="helper"
					style={styles.projectOptionMeta}
				>
					{entityName}
				</Label>
			</View>
			{isLocked ? (
				<Label
					role="helper"
					style={styles.projectOptionSelectedMeta}
				>
					{t("attendanceCreate.project.selectedFromProject")}
				</Label>
			) : isSelected ? (
				<Label
					role="helper"
					style={styles.projectOptionSelectedMeta}
				>
					{t("attendanceCreate.project.selected")}
				</Label>
			) : null}
		</Pressable>
	);
}
