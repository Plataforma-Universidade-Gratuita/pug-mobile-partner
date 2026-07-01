import React from "react";

import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";

import { Label, LoadingBlock } from "@/components/primitives";
import type { NewAttendanceProjectSectionProps } from "@/types/client";

import { NewAttendanceProjectOptionCard } from "./NewAttendanceProjectOptionCard";

export function NewAttendanceProjectSection({
	clearServerError,
	errorMessage,
	isProjectLocked,
	isRefreshingOptions,
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
			<View style={styles.projectOptionListContainer}>
				{isRefreshingOptions ? (
					<View style={styles.projectOptionList}>
						{Array.from({ length: 3 }).map((_, index) => (
							<View
								key={`attendance-project-loading-${index}`}
								style={styles.projectOptionCard}
							>
								<LoadingBlock
									height={20}
									width="72%"
								/>
								<LoadingBlock
									height={16}
									width="44%"
								/>
							</View>
						))}
					</View>
				) : (
					<ScrollView
						contentContainerStyle={styles.projectOptionList}
						nestedScrollEnabled
						showsVerticalScrollIndicator={false}
					>
						{options.map(option => (
							<NewAttendanceProjectOptionCard
								key={option.projectId}
								disabled={isProjectLocked || isSubmitting}
								entityName={option.entityName}
								isLocked={
									isProjectLocked && option.projectId === selectedProjectId
								}
								isSelected={option.projectId === selectedProjectId}
								onPress={() => {
									onSelectProject(option.projectId);
									clearServerError();
								}}
								projectName={option.projectName}
							/>
						))}
					</ScrollView>
				)}
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
