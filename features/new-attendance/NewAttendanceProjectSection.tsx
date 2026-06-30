import React from "react";

import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { Label } from "@/components/primitives";
import type { NewAttendanceProjectSectionProps } from "@/types/client";

import { NewAttendanceProjectOptionCard } from "./NewAttendanceProjectOptionCard";

export function NewAttendanceProjectSection({
	clearServerError,
	errorMessage,
	isProjectLocked,
	isSubmitting,
	onSelectProject,
	options,
	selectedProjectId,
	styles,
}: NewAttendanceProjectSectionProps) {
	const { t } = useTranslation();

	return (
		<View style={styles.section}>
			<View style={styles.sectionHeader}>
				<Label role="field">{t("attendanceCreate.project.label")}</Label>
				<Label role="helper">
					{isProjectLocked
						? t("attendanceCreate.project.lockedHelper")
						: t("attendanceCreate.project.helper")}
				</Label>
			</View>
			<View style={styles.projectOptionList}>
				{options.map(option => (
					<NewAttendanceProjectOptionCard
						key={option.projectId}
						disabled={isProjectLocked || isSubmitting}
						entityName={option.entityName}
						isLocked={isProjectLocked && option.projectId === selectedProjectId}
						isSelected={option.projectId === selectedProjectId}
						onPress={() => {
							onSelectProject(option.projectId);
							clearServerError();
						}}
						projectName={option.projectName}
					/>
				))}
			</View>
			{errorMessage ? (
				<Label
					role="helper"
					style={styles.errorText}
				>
					{errorMessage}
				</Label>
			) : null}
		</View>
	);
}
